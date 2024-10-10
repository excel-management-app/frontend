import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const ControlledNumberField = ({
  name,
  control,
  register,
  label,
  rules,
  defaultValue = "",
  ...props
}: any) => {
  return control ? (
    // Controlled component using Controller
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type="number"
          error={!!error}
          helperText={error ? error.message : ""}
          variant="outlined"
          fullWidth
          {...props}
        />
      )}
    />
  ) : (
    // Uncontrolled component using register
    <TextField
      {...register(name, rules)}
      label={label}
      type="number"
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};

export default ControlledNumberField;
