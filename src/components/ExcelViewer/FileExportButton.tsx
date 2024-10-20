import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { LoadingButton } from "@mui/lab";
import { colors, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { API_URL } from "../../utils/consts";
import { useState } from "react";

const useStyles = makeStyles()(() => ({
  button: {
    height: 40,
    backgroundColor: colors.grey["100"],
    color: colors.grey["900"],
  },
}));
interface Props {
  fileId: string;
  sheetName: string;
}
export function FileExportButton({ fileId, sheetName }: Props) {
  const { classes } = useStyles();

  const [loading, setLoading] = useState(false);
  const downloadExcelFile = async (
    fileId: string,
    sheetName: string,
  ): Promise<void> => {
    try {
      setLoading(true);
      const url = `${API_URL}/files/${fileId}/sheets/${sheetName}/export`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `${sheetName}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast.success("Xuất file thành công");
      } catch (error) {
        console.error("Error during file download:", error);
        toast.error("Không có file template excel. Hãy tải lên file excel");
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during file download:", error);
      toast.error("Không có file template excel. Hãy tải lên file excel");
    }
  };

  return (
    <Tooltip title="Xuất file excel">
      <LoadingButton
        className={classes.button}
        role={undefined}
        variant="contained"
        startIcon={<FileDownloadOutlinedIcon />}
        onClick={() => downloadExcelFile(fileId, sheetName)}
        loading={loading}
      >
        Xuất Excel
      </LoadingButton>
    </Tooltip>
  );
}
