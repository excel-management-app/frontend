import { Checkbox, FormControlLabel, Grid2, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Control, Controller } from "react-hook-form";
import { GIAY_TO, LOAI_DAT } from "../../utils/formFields";
import { ControlledDatePicker } from "./ControlledDatePicker";
import { ControlledSelect } from "./ControlledSelect";
import { ControlledTextField } from "./ControlledTextField";
import { IFormData } from "./types";

export default function CurrentDataForm({
  control,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<IFormData, any>;
}) {
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
          <Typography height={25} variant="body1" fontWeight={600}>
            Thông tin thửa đất
          </Typography>
        </Grid2>

        <Grid2 container size={12} spacing={2}>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="soHieuToBanDo"
              label="Số tờ"
              size="small"
              type="number"
              required
              helperText="Yêu cầu nhập trường này"
            />
          </Grid2>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="soThuTuThua"
              label="Số thửa"
              size="small"
              type="number"
              required
              helperText="Yêu cầu nhập trường này"
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
          <Typography height={25} variant="body1" fontWeight={600}>
            Mục đích sử dụng
          </Typography>
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
            />
          </Grid2>

          <Grid2 size={3}>
            <Controller
              name="suDungChung1"
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
  );
}
