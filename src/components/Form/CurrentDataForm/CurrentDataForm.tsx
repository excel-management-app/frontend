import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  Grid2,
  Tooltip,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormWatch,
} from "react-hook-form";
import { GIAY_TO } from "../../../utils/formFields";
import { ControlledDatePicker } from "../ControlledDatePicker";
import ControlledNumberField from "../ControlledNumberField";
import { ControlledSelect } from "../ControlledSelect";
import { ControlledTextField } from "../ControlledTextField";
import { convertToFormData } from "../functions";
import { useSearchRowInSheet } from "../hooks/useSearchRowInSheet";
import { IFormData } from "../types";
import { PurposeOfUseTable } from "./PurposeOfUseTable";

export default function CurrentDataForm({
  control,
  register,
  watch,
  resetField,
  reset,
  fileId,
  sheetName,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<IFormData, any>;
  register: UseFormRegister<IFormData>;
  watch: UseFormWatch<IFormData>;
  resetField: UseFormResetField<IFormData>;
  reset: UseFormReset<IFormData>;
  fileId: string;
  sheetName: string;
}) {
  const [soHieuToBanDo, soThuTuThua] = watch(["soHieuToBanDo", "soThuTuThua"]);

  const { data, loading, handleSearch } = useSearchRowInSheet({
    fileId,
    sheetName,
    soHieuToBanDo,
    soThuTuThua,
  });

  useEffect(() => {
    if (data) {
      reset(convertToFormData({ data }));
    }
  }, [data]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid2 container spacing={1.5}>
        <Grid2 size={12}>
          <Typography height={25} variant="body1" fontWeight={600}>
            Thông tin chủ hộ
          </Typography>
        </Grid2>
        <Grid2 container size={12} spacing={2}>
          <Grid2 size={2}>
            <ControlledTextField
              control={control}
              name="hoTen"
              label="Họ tên"
            />
          </Grid2>
          <Grid2 size={1}>
            <ControlledTextField
              control={control}
              name="namSinh"
              label="Năm sinh"
            />
          </Grid2>
          <Grid2 size={2}>
            <ControlledNumberField
              control={control}
              name="diaChiNha"
              label="Số điện thoại"
            />
          </Grid2>

          <Grid2 size={3}>
            <ControlledTextField
              control={control}
              name="diaChiChu"
              label="Địa chỉ"
              multiline
              maxRows={2}
            />
          </Grid2>
          <Grid2 size={1}>
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
          <Grid2 size={2}>
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

        <Grid2 container size={12} spacing={2}>
          <Grid2 size={2}>
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
          <Grid2 size={1}>
            <ControlledNumberField
              control={control}
              name="soGiayTo"
              label="Số giấy tờ"
            />
          </Grid2>

          <Grid2 size={2}>
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
            />
          </Grid2>
        </Grid2>

        {/* Thông tin vợ/chồng */}
        <Grid2 size={12}>
          <Typography height={25} variant="body1" fontWeight={600}>
            Thông tin vợ/chồng
          </Typography>
        </Grid2>

        <Grid2 container size={12} spacing={2}>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="hoTen2"
              label="Họ tên"
            />
          </Grid2>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="namSinh2"
              label="Năm sinh"
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
              <ControlledNumberField
                control={control}
                name="soGiayTo2"
                label="Số giấy tờ"
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
          <Typography height={25} variant="body1" fontWeight={600}>
            Thông tin thửa đất
          </Typography>
        </Grid2>
        <Grid2 container size={12} spacing={2}>
          <Grid2 size={1}>
            <ControlledNumberField
              control={control}
              name="soHieuToBanDo"
              label="Số tờ"
              rules={{
                required: "Yêu cầu nhập trường này",
                validate: (value: number) =>
                  value > 0 || "Không được nhập số âm",
              }}
            />
          </Grid2>
          <Grid2 size={1}>
            <ControlledNumberField
              control={control}
              name="soThuTuThua"
              label="Số thửa"
              rules={{
                required: "Yêu cầu nhập trường này",
                validate: (value: number) =>
                  value > 0 || "Không được nhập số âm",
              }}
            />
          </Grid2>

          <Tooltip title="Nhập số tờ và số thửa để tìm kiếm" placement="right">
            <Grid2 size={1}>
              <LoadingButton
                size="small"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                loading={loading}
                variant="contained"
                disabled={loading || !soHieuToBanDo || !soThuTuThua}
              >
                Tìm thửa đất
              </LoadingButton>
            </Grid2>
          </Tooltip>
          <Grid2 size={1}>
            <ControlledNumberField
              control={control}
              name="dienTich"
              label="Diện tích"
            />
          </Grid2>
          <Grid2 size={1.5}>
            <ControlledNumberField
              control={control}
              name="Dientichtangthem"
              label="Diện tích tăng thêm"
              fullWidth
            />
          </Grid2>
          <Grid2 size={1.5}>
            <ControlledTextField
              control={control}
              name="Donvicapcu"
              label="Đơn vị cấp cũ"
              fullWidth
            />
          </Grid2>
        </Grid2>

        <Grid2 container size={12} spacing={2}>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="xuDong"
              label="Địa chỉ"
              fullWidth
              multiline
              maxRows={3}
            />
          </Grid2>
          <Grid2 size={5}>
            <ControlledTextField
              control={control}
              name="ghiChuThuaDat"
              label="Ghi chú thửa đất"
              fullWidth
              multiline
              maxRows={3}
            />
          </Grid2>
        </Grid2>

        {/* Mục đích sử dụng */}
        <Grid2 size={12}>
          <Typography height={25} variant="body1" fontWeight={600}>
            Mục đích sử dụng
          </Typography>
        </Grid2>

        <PurposeOfUseTable
          watch={watch}
          control={control}
          register={register}
          resetField={resetField}
        />
      </Grid2>
    </LocalizationProvider>
  );
}