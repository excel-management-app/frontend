import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { AxiosError } from "axios";
import * as React from "react";
import { useForm, useFormState } from "react-hook-form";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { addRowToSheet, editRow } from "../../apis/excel";
import { SheetRowData } from "../../utils/types";
import { ExportToWordButton } from "../ExcelViewer/ExportToWordButton";
import { CertificateForm } from "./CertificateFrom";
import CurrentDataForm from "./CurrentDataForm/CurrentDataForm";
import { convertToFormData, emptyFormData, formatDate } from "./functions";
import OldDataForm from "./OldDataForm/OldDataForm";
import { IFormData } from "./types";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

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
  fileId: string;
  sheetName: string;
  refetch: () => void;
  selectedRowData: SheetRowData | null;
  rowIndex?: number;
  setSearchKey: (key: string) => void;
  listRowIndex: string;
}

export default function MyForm({
  onClose,
  fileId,
  sheetName,
  selectedRowData,
  refetch,
  rowIndex,
  setSearchKey,
  listRowIndex,
}: Props) {
  const { classes } = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { control, handleSubmit, reset, register, watch, resetField } =
    useForm<IFormData>();
  const { dirtyFields } = useFormState({ control });

  React.useLayoutEffect(() => {
    if (selectedRowData) {
      reset(convertToFormData({ data: selectedRowData }));
    } else {
      reset(emptyFormData());
    }
  }, [reset, selectedRowData]);

  const onSubmit = async (data: IFormData) => {
    if (Object.keys(dirtyFields).length === 0) {
      toast.info("Bạn chưa thay đổi gì cả");
      return;
    }
    const oldKey = `${selectedRowData?.soHieuToBanDo}-${selectedRowData?.soThuTuThua}`;

    const newKey = `${data.soHieuToBanDo}-${data.soThuTuThua}`;

    const newRow = {
      ...data,
      soHieuToBanDo: data.soHieuToBanDo,
      soThuTuThua: data.soThuTuThua,
      soToCu: data.soToCu,
      soThuaCu: data.soThuaCu,
      ngayCap: formatDate(data.ngayCap),
      ngayCap2: formatDate(data.ngayCap2),
      ngayCapCu: formatDate(data.ngayCapCu),
      ngayCapCu2: formatDate(data.ngayCapCu2),
      ngayCapGiayCu: formatDate(data.ngayCapGiayCu),
      inHoOngBa: data.inHoOngBa ? 1 : 0,
      inHoOngBaCu: data.inHoOngBaCu ? 1 : 0,
      hoGiaDinh: data.hoGiaDinh ? "ho" : "",
      hoGiaDinhCu: data.hoGiaDinhCu ? "ho" : "",
    };

    try {
      if (selectedRowData && rowIndex) {
        if (oldKey !== newKey) {
          toast.error("Bạn không thể thay đổi số tờ và số thửa");
          return;
        }
        await editRow({
          fileId,
          sheetName,
          rowIndex,
          newRow,
        });

        toast.success("Cập nhật hàng thành công");
      } else {
        await addRowToSheet({
          fileId,
          sheetName,
          newRow,
        });
        toast.success("Thêm hàng thành công");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        console.error(error);
      }
    } finally {
      refetch();
    }
  };

  const handleClose = () => {
    onClose();
    reset(emptyFormData());
    refetch();
  };

  return (
    <Dialog open maxWidth="xl" fullScreen>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle className={classes.title}>
          <Typography
            variant="body1"
            fontWeight="bold"
            fontSize={18}
            textTransform="uppercase"
          >
            Nhập dữ liệu
          </Typography>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
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

        <DialogContent
          sx={{
            p: 2,
            height: "calc(100vh - 225px)",
          }}
        >
          <CustomTabPanel value={value} index={0}>
            <CurrentDataForm
              control={control}
              register={register}
              watch={watch}
              resetField={resetField}
              setSearchKey={setSearchKey}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <OldDataForm
              control={control}
              register={register}
              watch={watch}
              resetField={resetField}
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
              >
                Lưu dữ liệu
              </Button>

              {listRowIndex && (
                <ExportToWordButton
                  fileId={fileId}
                  sheetName={sheetName}
                  listRowIndex={listRowIndex}
                />
              )}
            </Box>
            <Button variant="contained" onClick={handleClose}>
              Thoát
            </Button>
          </Box>
        </DialogActions>
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
