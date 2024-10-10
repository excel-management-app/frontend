import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Button, colors, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { API_URL } from "../../utils/consts";
import axiosClient from "../../apis/axiosClient";

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
  listRowIndex: string;
}
export function ExportToWordButton({ fileId, sheetName, listRowIndex }: Props) {
  const { classes } = useStyles();

  const exportToWord = async (): Promise<void> => {
    try {
      await axiosClient.post(`/words/${fileId}/sheets/${sheetName}/rows/`, {
        data: listRowIndex,
      });

      window.location.href = `${API_URL}/files/${fileId}/downloadWord`;
      toast.success("Xuất file thành công");
    } catch (error) {
      console.error("Error during file download:", error);
      toast.error(" Không có file template word. Hãy tải lên file word")
    }
  };

  return (
    <Tooltip title="Xuất file word">
      <Button
        className={classes.button}
        role={undefined}
        variant="contained"
        startIcon={<FileDownloadOutlinedIcon />}
        onClick={exportToWord}
      >
        Xuất Word
      </Button>
    </Tooltip>
  );
}
