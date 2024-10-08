import { DatePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ControlledDatePicker = ({ control, name, label }: any) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <DatePicker
        {...field}
        label={label}
        slotProps={{
          textField: { fullWidth: true, variant: "outlined", size: "small" },
        }}
      />
    )}
  />
);
