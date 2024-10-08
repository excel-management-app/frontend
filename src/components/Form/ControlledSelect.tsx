import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ControlledSelect = ({ control, name, label, options }: any) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControl fullWidth size="small">
        <InputLabel>{label}</InputLabel>
        <Select {...field} fullWidth label={label}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {options.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
  />
);
