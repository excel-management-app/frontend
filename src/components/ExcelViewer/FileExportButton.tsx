import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Button, colors, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { API_URL } from "../../utils/consts";

const useStyles = makeStyles()(() => ({
  button: {
    height: 40,
    backgroundColor: colors.grey["100"],
    color: colors.grey["900"],
  },
}));
interface Props {
  fileId: string;
}
export function FileExportButton({ fileId }: Props) {
  const { classes } = useStyles();
  const downloadExcelFile = async (fileId: string): Promise<void> => {
    try {
      const url = `${API_URL}/files/${fileId}/export`;
      window.location.href = url;

      toast.success("Xuất file thành công");
    } catch (error) {
      console.error("Error during file download:", error);
    }
  };

  return (
    <Tooltip title="Xuất file excel">
      <Button
        className={classes.button}
        role={undefined}
        variant="contained"
        startIcon={<FileDownloadOutlinedIcon />}
        onClick={() => downloadExcelFile(fileId)}
      >
        Xuất Excel
      </Button>
    </Tooltip>
  );
}
