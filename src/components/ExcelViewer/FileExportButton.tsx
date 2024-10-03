import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";

export function FileExportButton() {
  return (
    <Button
      role={undefined}
      variant="contained"
      startIcon={<FileDownloadIcon />}
    >
      Xuất file
    </Button>
  );
}
