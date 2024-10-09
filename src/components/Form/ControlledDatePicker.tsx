import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ControlledDatePicker = ({ control, name, label }: any) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => {
      return (
        <DatePicker
          {...field}
          label={label}
          value={field.value ? dayjs(field.value, "DD/MM/YYYY") : null}
          format="DD/MM/YYYY"
          slotProps={{
            textField: { fullWidth: true, variant: "outlined", size: "small" },
          }}
        />
      );
    }}
  />
);
