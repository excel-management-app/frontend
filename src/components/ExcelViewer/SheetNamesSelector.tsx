import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SheetData } from "../../apis/types";

interface Props {
  sheets: Pick<SheetData, "sheetName" | "id">[];
  onChange: (sheetName: string) => void;
  value: string;
}

export const SheetNameSelect = ({ sheets, onChange, value }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="sheet-name-select">Chọn Sheet</InputLabel>
      <Select
        labelId="sheet-name-select"
        id="demo-simple-select"
        value={value}
        label="Chọn Sheet"
        onChange={handleChange}
      >
        {sheets.map((sheet, index) => (
          <MenuItem
            key={`${sheet.sheetName}-${sheet.id}-${index}`}
            value={sheet.sheetName}
          >
            {sheet.sheetName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
