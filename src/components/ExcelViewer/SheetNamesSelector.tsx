import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  sheetNames: string[];
  onChange: (sheetName: string) => void;
  value: string;
}

export const SheetNameSelect = ({ sheetNames, onChange, value }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 220 }}>
      <FormControl fullWidth>
        <InputLabel id="sheet-name-select">Sheet Name</InputLabel>
        <Select
          labelId="sheet-name-select"
          id="demo-simple-select"
          value={value}
          label="Sheet Name"
          onChange={handleChange}
        >
          {sheetNames.map((sheetName) => (
            <MenuItem key={sheetName} value={sheetName}>
              {sheetName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
