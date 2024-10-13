import {
  Checkbox,
  FormControlLabel,
  Grid2,
  Tooltip,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
import { IFormData } from "../types";
import { OldPurposeOfUseTable } from "./OldPurposeOfUseTable";
import { LoadingButton } from "@mui/lab";
import { useSearchRowInSheet } from "../hooks/useSearchRowInSheet";
import { useEffect } from "react";
import { convertToFormData } from "../functions";
import SearchIcon from "@mui/icons-material/Search";

export default function OldDataForm({
  control,
  register,
  watch,
  resetField,
  fileId,
  sheetName,
  reset,
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
  const [soToCu, soThuaCu] = watch(["soToCu", "soThuaCu"]);

  const { data, loading, handleSearch } = useSearchRowInSheet({
    fileId,
    sheetName,
    soHieuToBanDo: soToCu,
    soThuTuThua: soThuaCu,
    isOld: true,
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
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="tenChuCu"
              label="Tên chủ cũ"
              size="small"
            />
          </Grid2>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="namSinhCu"
              label="Năm sinh chủ cũ"
              size="small"
            />
          </Grid2>
          <Grid2 container size={4} spacing={2}>
            <Grid2 size={6}>
              <ControlledSelect
                control={control}
                name="gioiTinhCu"
                label="Giới tính chủ cũ"
                options={[
                  { label: "Nam", value: "Nam" },
                  { label: "Nữ", value: "Nữ" },
                ]}
              />
            </Grid2>
            <Grid2 size={6}>
              <Controller
                name="hoGiaDinhCu"
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
                name="loaiGiayToCu"
                label="Loại giấy tờ chủ cũ"
                options={Object.entries(GIAY_TO).map(([key, value]) => ({
                  label: `${value} (${key})`,
                  value: key,
                }))}
              />
            </Grid2>
            <Grid2 size={6}>
              <ControlledNumberField
                control={control}
                name="soGiayToCu"
                label="Số giấy tờ chủ cũ"
                size="small"
              />
            </Grid2>
          </Grid2>
          <Grid2 size={4}>
            <ControlledDatePicker
              control={control}
              name="ngayCapCu"
              label="Ngày cấp chủ cũ"
            />
          </Grid2>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="noiCapCu"
              label="Nơi cấp chủ cũ"
              size="small"
            />
          </Grid2>
        </Grid2>

        <Grid2 size={12}>
          <ControlledTextField
            control={control}
            name="diaChiChuCu"
            label="Địa chỉ thường trú chủ cũ"
          />
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
              name="hoTenCu2"
              label="Họ tên vợ chồng chủ cũ"
              size="small"
            />
          </Grid2>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="namSinhCu2"
              label="Năm sinh vợ chồng chủ cũ"
              size="small"
            />
          </Grid2>
          <Grid2 container size={4} spacing={2}>
            <Grid2 size={6}>
              <ControlledSelect
                control={control}
                name="gioiTinhCu2"
                label="Giới tính"
                options={[
                  { label: "Nam", value: "Nam" },
                  { label: "Nữ", value: "Nữ" },
                ]}
              />
            </Grid2>
            <Grid2 size={6}>
              <Controller
                name="inHoOngBaCu"
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
                name="loaiGiayToCu2"
                label="Loại giấy tờ chủ cũ"
                options={Object.entries(GIAY_TO).map(([key, value]) => ({
                  label: `${value} (${key})`,
                  value: key,
                }))}
              />
            </Grid2>
            <Grid2 size={6}>
              <ControlledNumberField
                control={control}
                name="soGiayToCu2"
                label="Số giấy tờ vợ chồng chủ cũ"
                size="small"
              />
            </Grid2>
          </Grid2>

          <Grid2 size={4}>
            <ControlledDatePicker
              control={control}
              name="ngayCapCu2"
              label="Ngày cấp chủ cũ"
            />
          </Grid2>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="noiCapCu2"
              label="Nơi cấp chủ cũ"
              size="small"
            />
          </Grid2>
        </Grid2>

        <Grid2 size={12}>
          <ControlledTextField
            control={control}
            name="diaChiChuCu2"
            label="Địa chỉ thường trú chủ cũ"
            fullWidth
          />
        </Grid2>
        {/*   Thông tin thửa đất cũ */}
        <Grid2 size={12}>
          <Typography height={25} variant="body1" fontWeight={600}>
            Thông tin thửa đất cũ
          </Typography>
        </Grid2>
        <Grid2 container size={12} spacing={2}>
          <Grid2 size={1}>
            <ControlledNumberField
              control={control}
              name="soToCu"
              label="Số tờ cũ"
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
              name="soThuaCu"
              label="Số thửa cũ"
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
                disabled={loading || !soToCu || !soThuaCu}
              >
                Tìm thửa đất
              </LoadingButton>
            </Grid2>
          </Tooltip>
        </Grid2>

        <Grid2 container size={12} spacing={2}>
          <Grid2 size={1}>
            <ControlledNumberField
              control={control}
              name="dienTichCu"
              label="Diện tích cũ"
            />
          </Grid2>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="diaChiCu"
              label="Địa chỉ cũ"
              fullWidth
              multiline
              maxRows={3}
            />
          </Grid2>
          {/* <Grid2 size={5}>
            <ControlledTextField
              control={control}
              name="ghiChuThuaDat"
              label="Ghi chú thửa đất"
              fullWidth
              multiline
              maxRows={3}
            />
          </Grid2> */}
        </Grid2>

        {/*Thông tin giấy chứng nhận cũ */}
        <Grid2 size={12}>
          <Typography height={25} variant="body1" fontWeight={600}>
            Thông tin giấy chứng nhận cũ
          </Typography>
        </Grid2>
        <Grid2 container size={12} spacing={2}>
          <Grid2 size={3}>
            <ControlledTextField
              control={control}
              name="soPhatHanhCu"
              label="Số phát hành cũ"
              size="small"
            />
          </Grid2>
          <Grid2 size={3}>
            <ControlledTextField
              control={control}
              name="soVaoSoCu"
              label="Số vào sổ cấp giấy cũ"
              size="small"
            />
          </Grid2>
          <Grid2 size={3}>
            <ControlledDatePicker
              control={control}
              name="ngayCapGiayCu"
              label="Ngày cấp giấy cũ"
            />
          </Grid2>
        </Grid2>

        {/* Mục đích sử dụng cũ*/}
        <Grid2 size={12}>
          <Typography height={25} variant="body1" fontWeight={600}>
            Mục đích sử dụng cũ
          </Typography>
        </Grid2>

        <OldPurposeOfUseTable
          control={control}
          register={register}
          watch={watch}
          resetField={resetField}
        />
      </Grid2>
    </LocalizationProvider>
  );
}
