import { Grid2 } from "@mui/material";
import { Control } from "react-hook-form";
import { ControlledTextField } from "../ControlledTextField";
import { IFormData } from "../types";

export const CertificateForm = ({
  control,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<IFormData, any>;
}) => {
  return (
    <Grid2 container spacing={1}>
      <Grid2 size={3}>
        <ControlledTextField
          control={control}
          name="giayChungNhanSo"
          label="Giấy chứng nhận số"
          size="small"
        />
      </Grid2>
      <Grid2 size={3}>
        <ControlledTextField
          control={control}
          name="dotCapGCN"
          label="Đợt cấp giấy"
          size="small"
        />
      </Grid2>
      <Grid2 size={3}>
        <ControlledTextField
          control={control}
          name="loaiGCN"
          label="Loại giấy chứng nhận"
          size="small"
        />
      </Grid2>
      <Grid2 size={3}>
        <ControlledTextField
          control={control}
          name="maVachGCN"
          label="Mã vạch"
          size="small"
        />
      </Grid2>
      <Grid2 size={3}>
        <ControlledTextField
          control={control}
          name="soPhatHanhGCN"
          label="Số hiệu giấy/ Số phát hành"
          size="small"
        />
      </Grid2>
      <Grid2 size={3}>
        <ControlledTextField
          control={control}
          name="donViCapGCN"
          label="Đơn vị cấp"
          size="small"
        />
      </Grid2>
      <Grid2 size={3}>
        <ControlledTextField
          control={control}
          name="soVaoSoCapGCN"
          label="Số vào sổ"
          size="small"
        />
      </Grid2>
    </Grid2>
  );
};
