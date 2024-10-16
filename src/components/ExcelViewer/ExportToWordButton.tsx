import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Button, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import axiosClient from "../../apis/axiosClient";
import { API_URL } from "../../utils/consts";

const useStyles = makeStyles()(() => ({
  button: {
    height: 40,
  },
}));
interface Props {
  fileId: string;
  sheetName: string;
  listRowIndex: string;
  disabled: boolean;
}
export function ExportToWordButton({
  fileId,
  sheetName,
  listRowIndex,
  disabled,
}: Props) {
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
      toast.error(" Không có file template word. Hãy tải lên file word");
    }
  };

  return (
    <Tooltip title="Xuất đơn ra file word">
      <Button
        className={classes.button}
        role={undefined}
        variant="contained"
        color="primary"
        startIcon={<FileDownloadOutlinedIcon />}
        onClick={exportToWord}
        disabled={disabled}
      >
        Xuất đơn
      </Button>
    </Tooltip>
  );
}
