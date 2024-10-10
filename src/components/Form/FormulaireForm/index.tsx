import { Grid2 } from "@mui/material";
import { Control } from "react-hook-form";
import { ControlledTextField } from "../ControlledTextField";
import { IFormData } from "../types";

export const FormulaireForm = ({
  control,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<IFormData, any>;
}) => {
  return (
    <Grid2 container spacing={1}>
      <Grid2 size={6}>
        <ControlledTextField
          control={control}
          name="loaiDon"
          label="Loại đơn"
          size="small"
        />
      </Grid2>
      <Grid2 size={6}>
        <ControlledTextField
          control={control}
          name="ghiChuDonDangKy"
          label="Ghi chú  "
          size="small"
        />
      </Grid2>
    </Grid2>
  );
};
