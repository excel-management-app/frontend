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
  disabled: boolean;
  listTamY: string;
}

export function ExportToWordButton({
  fileId,
  sheetName,
  disabled,
  listTamY,
}: Props) {
  const { classes } = useStyles();

  const isSingleRow = listTamY.split(",").length === 1;

  const exportToWord = async (): Promise<void> => {
    try {
      await axiosClient.get(`/words/${fileId}/sheets/${sheetName}/${listTamY}`);

      window.location.href = `${API_URL}/files/downloadWord/${listTamY}`;
      toast.success("Xuất file thành công");
    } catch (error) {
      console.error("Error during file download:", error);
      if (error instanceof Error && "status" in error && error.status === 400) {
        toast.error(" Không có file template word. Hãy tải lên file word");
        return;
      }
      if (error instanceof Error && "status" in error && error.status === 400) {
        toast.error("Không có dữ liệu để xuất");
        return;
      }
      if (error instanceof Error && "status" in error && error.status === 500) {
        toast.error("Lỗi form word mẫu");
        return;
      }
      toast.error(" Không có file template word. Hãy tải lên file word");
    }
  };

  const exportManyToWord = async (): Promise<void> => {
    try {
      await axiosClient.post(`/words/${fileId}/sheets/${sheetName}`, {
        data: listTamY,
      });

      const url = `${import.meta.env.VITE_API_URL}/files/${fileId}/downloadManyWord`;
      window.location.href = url;
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
        onClick={isSingleRow ? exportToWord : exportManyToWord}
        disabled={disabled}
      >
        Xuất đơn
      </Button>
    </Tooltip>
  );
}
