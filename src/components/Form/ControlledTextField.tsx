import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const ControlledTextField = ({
  control,
  name,
  label,
  ...props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        {...props}
        fullWidth
        label={label}
        variant="outlined"
        size="small"
        value={field.value || ""}
      />
    )}
  />
);
