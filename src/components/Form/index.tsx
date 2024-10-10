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
import * as React from "react";
import { makeStyles } from "tss-react/mui";
import CurrentDataForm from "./CurrentDataForm/CurrentDataForm";
import OldDataForm from "./OldDataForm/OldDataForm";
import { SheetRowData } from "../../utils/types";
import { useForm } from "react-hook-form";
import { convertToFormData } from "./functions";
import dayjs from "dayjs";
import { IFormData } from "./types";
import { addRowToSheet, editRow } from "../../apis/excel";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { CertificateForm } from "./CertificateFrom";
import { FormulaireForm } from "./FormulaireForm";

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
  selectedRowData?: SheetRowData;
  rowIndex?: number;
}

export default function MyForm({
  onClose,
  fileId,
  sheetName,
  selectedRowData,
  refetch,
  rowIndex,
}: Props) {
  const { classes } = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { control, handleSubmit, reset, register, watch, resetField } =
    useForm<IFormData>();

  React.useLayoutEffect(() => {
    if (selectedRowData) {
      reset(convertToFormData({ data: selectedRowData }));
    }
  }, [reset, selectedRowData]);
  const onSubmit = async (data: IFormData) => {
    const newRow = {
      ...data,
      ngayCap: dayjs(data.ngayCap).format("DD/MM/YYYY"),
      ngayCap2: dayjs(data.ngayCap2).format("DD/MM/YYYY"),
      inHoOngBa: data.inHoOngBa ? "l" : "",
      hoGiaDinh: data.hoGiaDinh ? "ho" : "",
      suDungChung: data.suDungChung ? "chung" : "",
    };
    try {
      if (selectedRowData && rowIndex) {
        await editRow({
          fileId,
          sheetName,
          rowIndex,
          newRow: data,
        });
        toast.success("Cập nhật hàng thành công");
        refetch();
        onClose();
      } else {
        await addRowToSheet({
          fileId,
          sheetName,
          newRow,
        });
        toast.success("Thêm hàng thành công");
        refetch();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };
  const isEdit = !!selectedRowData && !!rowIndex;

  const handleClearForm = () => {
    reset();
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
          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
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
            <Tab label="Đơn đăng ký" {...a11yProps(3)} />
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
          <CustomTabPanel value={value} index={3}>
            <FormulaireForm control={control} />
          </CustomTabPanel>
        </DialogContent>
        <DialogActions>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            mt={3}
          >
            <Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                {isEdit ? "Lưu thông tin" : "Thêm hàng"}
              </Button>
              {!isEdit && (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "10px" }}
                  onClick={handleClearForm}
                >
                  Xóa dữ liệu đã nhập
                </Button>
              )}
            </Box>
            <Button variant="contained" onClick={onClose}>
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
