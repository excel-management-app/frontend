import { Checkbox, FormControlLabel, Grid2, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Control, Controller } from "react-hook-form";
import { GIAY_TO, LOAI_DAT } from "../../utils/formFields";
import { ControlledDatePicker } from "./ControlledDatePicker";
import { ControlledSelect } from "./ControlledSelect";
import { ControlledTextField } from "./ControlledTextField";
import { IFormData } from "./types";

export default function OldDataForm({
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
              name="tenChuCu"
              label="Họ tên"
              size="small"
            />
          </Grid2>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="namSinhCu"
              label="Năm sinh"
              size="small"
            />
          </Grid2>
          <Grid2 container size={4} spacing={2}>
            <Grid2 size={6}>
              <ControlledSelect
                control={control}
                name="gioiTinhCu"
                label="Giới tính"
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
                name="soGiayToCu"
                label="Số giấy tờ"
                size="small"
                type="number"
              />
            </Grid2>
          </Grid2>
          <Grid2 size={4}>
            <ControlledDatePicker
              control={control}
              name="ngayCapCu"
              label="Ngày cấp"
            />
          </Grid2>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="noiCapCu"
              label="Nơi cấp"
              size="small"
            />
          </Grid2>
        </Grid2>

        <Grid2 size={12}>
          <ControlledTextField
            control={control}
            name="diaChiChuCu"
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
              name="hoTenCu2"
              label="Họ tên"
              size="small"
            />
          </Grid2>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="namSinhCu2"
              label="Năm sinh"
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
                name="soGiayToCu2"
                label="Số giấy tờ"
                size="small"
                type="number"
              />
            </Grid2>
          </Grid2>

          <Grid2 size={4}>
            <ControlledDatePicker
              control={control}
              name="ngayCapCu2"
              label="Ngày cấp"
            />
          </Grid2>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="noiCapCu2"
              label="Nơi cấp"
              size="small"
            />
          </Grid2>
        </Grid2>

        <Grid2 size={12}>
          <ControlledTextField
            control={control}
            name="diaChiChuCu2"
            label="Địa chỉ"
            fullWidth
          />
        </Grid2>
        {/* Thông tin thửa đất */}
        <Grid2 size={12}>
          <Typography height={25} variant="body1" fontWeight={600}>
            Thông tin thửa đất cũ
          </Typography>
        </Grid2>

        <Grid2 container size={12} spacing={2}>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="soToCu"
              label="Số tờ"
              size="small"
              type="number"
            />
          </Grid2>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="soThuaCu"
              label="Số thửa"
              size="small"
              type="number"
            />
          </Grid2>
          <Grid2 size={4}>
            <ControlledTextField
              control={control}
              name="dienTichCu"
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
              label="Số phát hành"
              size="small"
            />
          </Grid2>
          <Grid2 size={3}>
            <ControlledTextField
              control={control}
              name="soVaoSoCu"
              label="Số vào sổ "
              size="small"
            />
          </Grid2>
          <Grid2 size={3}>
            <ControlledDatePicker
              control={control}
              name="ngayCapGiayCu"
              label="Ngày cấp"
            />
          </Grid2>
        </Grid2>

        {/* Mục đích sử dụng cũ*/}
        <Grid2 size={12}>
          <Typography height={25} variant="body1" fontWeight={600}>
            Mục đích sử dụng cũ
          </Typography>
        </Grid2>

        <Grid2 container size={12} spacing={2}>
          <Grid2 size={3}>
            <ControlledSelect
              control={control}
              name="loaiDatCu1"
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
              name="dtmdsdcu1"
              label="Diện tích"
              size="small"
              type="number"
            />
          </Grid2>

          <Grid2 size={3}>
            <ControlledTextField
              control={control}
              name="thmdsdcu1"
              label="Thời hạn"
            />
          </Grid2>
        </Grid2>

        <Grid2 container size={12} spacing={2}>
          <Grid2 size={3}>
            <ControlledTextField
              control={control}
              name="ngmdsdcu1"
              label="Nguồn gốc GĐ"
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
