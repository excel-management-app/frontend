import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  options: string[];
  onChange: (sheetName: string) => void;
  value: string;
}

export const SheetNameSelect = ({ options, onChange, value }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="sheet-name-select">Chọn Sheet</InputLabel>
      <Select
        labelId="sheet-name-select"
        id="demo-simple-select"
        value={value || ""}
        label="Chọn Sheet"
        onChange={handleChange}
      >
        {options.map((opt, index) => (
          <MenuItem key={`${opt}-${index}`} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
