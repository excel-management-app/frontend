import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FileListOption } from "../../utils/types";

interface Props {
  options: FileListOption[];
  onChange: (fileId: string) => void;
  value: FileListOption | null;
}
export const FileListSelect = ({ options, onChange, value }: Props) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="select-file-label">Chọn File</InputLabel>
      <Select
        labelId="select-file-label"
        id="select-file"
        value={value?.id}
        label="Chọn File"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.fileName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
