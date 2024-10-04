import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import { exportFile } from "../../apis/excel";

interface Props {
  fileId: string;
}
export function FileExportButton({ fileId }: Props) {
  const downloadExcelFile = async (fileId: string): Promise<void> => {
    try {
      const response = (await exportFile(fileId)) as any;

      if (response) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "exported_file.xlsx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Download failed");
      }
    } catch (error) {
      console.error("Error during file download:", error);
    }
  };

  return (
    <Button
      role={undefined}
      variant="contained"
      startIcon={<FileDownloadIcon />}
      onClick={() => downloadExcelFile(fileId)}
    >
      Xuất file
    </Button>
  );
}
