import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid2,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addRowToSheet } from "../../apis/excel";
import { GIAY_TO, LOAI_DAT } from "../../utils/formFields";
import { ControlledDatePicker } from "./ControlledDatePicker";
import { ControlledSelect } from "./ControlledSelect";
import { ControlledTextField } from "./ControlledTextField";
import dayjs from "dayjs";
import { SheetRowData } from "../../utils/types";
import { convertToFormData } from "./functions";
import { useEffect } from "react";

interface FormData {
  [k: string]: string | number;
}

interface Props {
  onClose: () => void;
  fileId: string;
  sheetName: string;
  refetch: () => void;
  selectedRowData?: SheetRowData;
}

export default function CurrentDataForm({
  onClose,
  fileId,
  sheetName,
  refetch,
  selectedRowData,
}: Props) {
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (selectedRowData) {
      reset(convertToFormData(selectedRowData));
    } else {
      reset();
    }
  }, [reset, selectedRowData]);

  const onSubmit = async (data: FormData) => {
    const newRow = {
      ...data,
      ngayCap: dayjs(data.ngayCap).format("DD/MM/YYYY"),
      ngayCap2: dayjs(data.ngayCap2).format("DD/MM/YYYY"),
      inHoOngBa: data.inHoOngBa ? "l" : "",
      hoGiaDinh: data.hoGiaDinh ? "ho" : "",
      suDungChung: data.suDungChung ? "chung" : "",
    };
    try {
      if (selectedRowData) {
        //
      } else {
        await addRowToSheet({
          fileId,
          sheetName,
          newRow,
        });
        toast.success("Thêm hàng thành công");
        refetch();
        reset();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid2 container spacing={1.5}>
            <Grid2 size={12}>
              <Typography variant="h6">Thông tin chủ hộ</Typography>
            </Grid2>
            <Grid2 container size={12} spacing={2}>
              <Grid2 size={4}>
                <ControlledTextField
                  control={control}
                  name="hoTen"
                  label="Họ tên"
                  size="small"
                />
              </Grid2>
              <Grid2 size={4}>
                <ControlledTextField
                  control={control}
                  name="namSinh"
                  label="Năm sinh"
                  size="small"
                />
              </Grid2>
              <Grid2 container size={4} spacing={2}>
                <Grid2 size={6}>
                  <ControlledSelect
                    control={control}
                    name="gioiTinh"
                    label="Giới tính"
                    options={[
                      { label: "Nam", value: "Nam" },
                      { label: "Nữ", value: "Nữ" },
                    ]}
                  />
                </Grid2>
                <Grid2 size={6}>
                  <Controller
                    name="hoGiaDinh"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} />}
                        label="Là hộ gia đình"
                        labelPlacement="start"
                      />
                    )}
                  />
                </Grid2>
              </Grid2>
            </Grid2>

            <Grid2 container size={12} spacing={2}>
              <Grid2 size={4} container spacing={2}>
                <Grid2 size={6}>
                  <ControlledSelect
                    control={control}
                    name="loaiGiayTo"
                    label="Giấy tờ"
                    options={Object.entries(GIAY_TO).map(([key, value]) => ({
                      label: `${value} (${key})`,
                      value: key,
                    }))}
                  />
                </Grid2>
                <Grid2 size={6}>
                  <ControlledTextField
                    control={control}
                    name="soGiayTo"
                    label="Số giấy tờ"
                    size="small"
                    type="number"
                  />
                </Grid2>
              </Grid2>
              <Grid2 size={4}>
                <ControlledDatePicker
                  control={control}
                  name="ngayCap"
                  label="Ngày cấp"
                />
              </Grid2>
              <Grid2 size={4}>
                <ControlledTextField
                  control={control}
                  name="noiCap"
                  label="Nơi cấp"
                  size="small"
                />
              </Grid2>
            </Grid2>

            <Grid2 size={12}>
              <ControlledTextField
                control={control}
                name="diaChiChu"
                label="Địa chỉ"
              />
            </Grid2>

            {/* Thông tin vợ/chồng */}
            <Grid2 size={12}>
              <Typography variant="h6">Thông tin vợ/chồng</Typography>
            </Grid2>

            <Grid2 container size={12} spacing={2}>
              <Grid2 size={4}>
                <ControlledTextField
                  control={control}
                  name="hoTen2"
                  label="Họ tên"
                  size="small"
                />
              </Grid2>
              <Grid2 size={4}>
                <ControlledTextField
                  control={control}
                  name="namSinh2"
                  label="Năm sinh"
                  size="small"
                />
              </Grid2>
              <Grid2 container size={4} spacing={2}>
                <Grid2 size={6}>
                  <ControlledSelect
                    control={control}
                    name="gioiTinh2"
                    label="Giới tính"
                    options={[
                      { label: "Nam", value: "Nam" },
                      { label: "Nữ", value: "Nữ" },
                    ]}
                  />
                </Grid2>
                <Grid2 size={6}>
                  <Controller
                    name="inHoOngBa"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} />}
                        label="In hộ ông/bà"
                        labelPlacement="start"
                      />
                    )}
                  />
                </Grid2>
              </Grid2>
            </Grid2>

            <Grid2 container size={12} spacing={2}>
              <Grid2 size={4} container spacing={2}>
                <Grid2 size={6}>
                  <ControlledSelect
                    control={control}
                    name="loaiGiayTo2"
                    label="Giấy tờ"
                    options={Object.entries(GIAY_TO).map(([key, value]) => ({
                      label: `${value} (${key})`,
                      value: key,
                    }))}
                  />
                </Grid2>
                <Grid2 size={6}>
                  <ControlledTextField
                    control={control}
                    name="soGiayTo2"
                    label="Số giấy tờ"
                    size="small"
                    type="number"
                  />
                </Grid2>
              </Grid2>

              <Grid2 size={4}>
                <ControlledDatePicker
                  control={control}
                  name="ngayCap2"
                  label="Ngày cấp"
                />
              </Grid2>
              <Grid2 size={4}>
                <ControlledTextField
                  control={control}
                  name="noiCap2"
                  label="Nơi cấp"
                  size="small"
                />
              </Grid2>
            </Grid2>

            <Grid2 size={12}>
              <ControlledTextField
                control={control}
                name="diaChiChu2"
                label="Địa chỉ"
                fullWidth
              />
            </Grid2>
            {/* Thông tin thửa đất */}
            <Grid2 size={12}>
              <Typography variant="h6">Thông tin thửa đất</Typography>
            </Grid2>

            <Grid2 container size={12} spacing={2}>
              <Grid2 size={4}>
                <ControlledTextField
                  control={control}
                  name="soHieuToBanDo"
                  label="Số tờ"
                  size="small"
                  type="number"
                />
              </Grid2>
              <Grid2 size={4}>
                <ControlledTextField
                  control={control}
                  name="soThuTuThua"
                  label="Số thửa"
                  size="small"
                  type="number"
                />
              </Grid2>
              <Grid2 size={4}>
                <ControlledTextField
                  control={control}
                  name="dienTich"
                  label="Diện tích"
                  size="small"
                  type="number"
                />
              </Grid2>
            </Grid2>

            <Grid2 size={12}>
              <ControlledTextField
                control={control}
                name="xuDong"
                label="Địa chỉ"
                fullWidth
              />
            </Grid2>

            {/* Mục đích sử dụng */}
            <Grid2 size={12}>
              <Typography variant="h6">Mục đích sử dụng</Typography>
            </Grid2>

            <Grid2 container size={12} spacing={2}>
              <Grid2 size={3}>
                <ControlledSelect
                  control={control}
                  name="loaiDat1"
                  label="Loại đất"
                  options={Object.entries(LOAI_DAT).map(([key, value]) => ({
                    label: `${value} (${key})`,
                    value: key,
                  }))}
                />
              </Grid2>

              <Grid2 size={3}>
                <ControlledTextField
                  control={control}
                  name="dienTichMDSD1"
                  label="Diện tích"
                  size="small"
                  type="number"
                />
              </Grid2>

              <Grid2 size={3}>
                <ControlledTextField
                  control={control}
                  name="thoiHanSuDung1"
                  label="Thời hạn"
                />
              </Grid2>
            </Grid2>

            <Grid2 container size={12} spacing={2}>
              <Grid2 size={3}>
                <ControlledTextField
                  control={control}
                  name="nguonGocSuDung1"
                  label="Nguồn gốc"
                  size="small"
                  type="number"
                />
              </Grid2>

              <Grid2 size={3}>
                <Controller
                  name="suDungChung"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label="Sử dụng chung"
                      labelPlacement="start"
                    />
                  )}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </LocalizationProvider>
      </Box>
      <Box display="flex" justifyContent="space-between" width="100%" mt={3}>
        <Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginRight: "10px" }}
          >
            Lưu thông tin
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: "10px" }}
          >
            Xuất đơn
          </Button>
        </Box>
        <Button variant="contained" onClick={onClose}>
          Thoát
        </Button>
      </Box>
    </form>
  );
}
