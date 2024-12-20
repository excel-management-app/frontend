import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  Button,
  CircularProgress,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { AxiosError } from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import axiosClient from "../../apis/axiosClient";
import { updateOrAddRow } from "../../apis/excel";
import { SheetRowData } from "../../utils/types";
import { useSheetContext } from "../ExcelViewer/contexts/SheetContext";
import { ExportToWordButton } from "../ExcelViewer/ExportToWordButton";
import { CertificateForm } from "./CertificateFrom";
import { DATE_FIELD_NAMES } from "./consts";
import CurrentDataForm from "./CurrentDataForm/CurrentDataForm";
import { convertToFormData, emptyFormData, formatDate } from "./functions";
import OldDataForm from "./OldDataForm/OldDataForm";
import { IFormData } from "./types";

const useStyles = makeStyles()(() => ({
  exitButton: {
    height: 40,
    backgroundColor: colors.grey["100"],
    color: colors.grey["900"],
  },
  addButton: {
    height: 40,
    backgroundColor: colors.grey["900"],
    color: colors.grey["100"],
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

interface Props {
  onClose: () => void;
  refetch: () => void;
  listTamY: string;
}

export default function MyForm({ onClose, refetch, listTamY }: Props) {
  const { classes } = useStyles();
  const { rows, fileId, sheetName } = useSheetContext();

  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [currentListTamY, setCurrentListTamY] = React.useState(listTamY);
  const [searchKey, setSearchKey] = React.useState("");
  const [gettingData, setGettingData] = React.useState(false);
  const [selectedRowData, setSelectedRowData] =
    React.useState<SheetRowData | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    resetField,
    setValue: setFormValue,
  } = useForm<IFormData>();

  const [soHieuToBanDo, soThuTuThua] = watch(["soHieuToBanDo", "soThuTuThua"]);

  const tamY = React.useMemo(
    () => (searchKey ? searchKey : currentListTamY),
    [searchKey, currentListTamY],
  );

  const listTamYInForm = React.useMemo(() => {
    if (!soHieuToBanDo || !soThuTuThua) {
      return "";
    }
    if (soHieuToBanDo && soThuTuThua) {
      return `${soHieuToBanDo}_${soThuTuThua}`;
    }
    const currentRow = rows.filter(
      (row) =>
        row.soHieuToBanDo === soHieuToBanDo && row.soThuTuThua === soThuTuThua,
    );
    return currentRow
      .map((row) => `${row.soHieuToBanDo}_${row.soThuTuThua}`)
      .join(",");
  }, [soHieuToBanDo, soThuTuThua, rows]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useLayoutEffect(() => {
    if (!tamY) {
      return;
    }

    const fetchData = async () => {
      setGettingData(true);
      const res = await axiosClient.get(
        `files/${fileId}/sheets/${sheetName}/rows/${tamY}`,
      );
      setSelectedRowData(res.data);
      reset(convertToFormData({ data: res.data }));
    };

    fetchData()
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast.error(searchKey ? "Chưa có dữ liệu" : error.response?.data);
        } else {
          console.error(error);
        }
        reset(emptyFormData());
      })
      .finally(() => {
        setGettingData(false);
      });
  }, [searchKey, tamY]);

  React.useLayoutEffect(() => {
    if (selectedRowData) {
      reset(convertToFormData({ data: selectedRowData }));
      const currentRow = rows.filter(
        (row) =>
          row.soHieuToBanDo === selectedRowData.soHieuToBanDo &&
          row.soThuTuThua === selectedRowData.soThuTuThua,
      );
      setCurrentListTamY(
        currentRow
          .map((row) => `${row.soHieuToBanDo}_${row.soThuTuThua}`)
          .join(","),
      );
    } else {
      reset(emptyFormData());
    }
  }, [reset, selectedRowData]);

  const onSubmit = async (data: IFormData) => {
    setLoading(true);

    const newRow = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (DATE_FIELD_NAMES.includes(key)) {
          return [key, formatDate(value)];
        }
        switch (key) {
          case "inHoOngBa":
          case "inHoOngBaCu":
            return [key, value ? "1" : ""];
          case "hoGiaDinh":
          case "hoGiaDinhCu":
            return [key, value ? "ho" : ""];
          case "loaiDon":
            return [key, value ? "Cấp mới" : "Cấp đổi"];
          default:
            return [key, value ?? ""];
        }
      }),
    );

    try {
      await updateOrAddRow({
        fileId,
        sheetName,
        newRow,
      });
      toast.success("Thành công");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        console.error(error);
      }
    } finally {
      refetch();
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    reset(emptyFormData());
    refetch();
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  return (
    <Dialog open maxWidth="xl" fullScreen>
      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
        <DialogTitle className={classes.title}>
          <Typography
            variant="body1"
            fontWeight="bold"
            fontSize={18}
            textTransform="uppercase"
          >
            Nhập dữ liệu
          </Typography>
          <IconButton
            disabled={loading}
            sx={{ cursor: "pointer" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Dữ liệu hiện trạng" {...a11yProps(0)} />
            <Tab label="Dữ liệu cũ" {...a11yProps(1)} />
            <Tab label="Giấy chứng nhận" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {gettingData ? (
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <DialogContent
              sx={{
                p: 2,
                height: "calc(100vh - 235px)",
              }}
            >
              <CustomTabPanel value={value} index={0}>
                <CurrentDataForm
                  control={control}
                  register={register}
                  watch={watch}
                  resetField={resetField}
                  setSearchKey={setSearchKey}
                  setFormValue={setFormValue}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <OldDataForm
                  control={control}
                  register={register}
                  watch={watch}
                  resetField={resetField}
                  setFormValue={setFormValue}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <CertificateForm control={control} />
              </CustomTabPanel>
            </DialogContent>
            <DialogActions>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                mt={3}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginRight: "10px" }}
                    startIcon={<SaveOutlinedIcon />}
                    disabled={loading}
                  >
                    Lưu dữ liệu
                  </Button>

                  {listTamYInForm && (
                    <ExportToWordButton
                      disabled={loading}
                      listTamY={listTamYInForm}
                    />
                  )}
                </Box>
                <Button
                  disabled={loading}
                  variant="contained"
                  onClick={handleClose}
                >
                  Thoát
                </Button>
              </Box>
            </DialogActions>
          </>
        )}
      </form>
    </Dialog>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
