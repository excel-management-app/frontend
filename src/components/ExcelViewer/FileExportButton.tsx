import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

interface Props {
  fileId: string;
}
export function FileExportButton({ fileId }: Props) {
  const downloadExcelFile = async (fileId: string): Promise<void> => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/files/${fileId}/export`;
      window.location.href = url;

      toast.success("Xuất file thành công");
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
