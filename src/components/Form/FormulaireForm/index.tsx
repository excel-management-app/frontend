import {
  Control,
  UseFormRegister,
  UseFormResetField,
  UseFormWatch,
} from "react-hook-form";
import { IFormData } from "../types";
import { Grid2 } from "@mui/material";
import { ControlledTextField } from "../ControlledTextField";

export const FormulaireForm = ({
  control,
  register,
  watch,
  resetField,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<IFormData, any>;
  register: UseFormRegister<IFormData>;
  watch: UseFormWatch<IFormData>;
  resetField: UseFormResetField<IFormData>;
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
