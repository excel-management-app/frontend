import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Button, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import axiosClient from "../../apis/axiosClient";
import { API_URL } from "../../utils/consts";
import { AxiosError } from "axios";
import { useSheetContext } from "./contexts/SheetContext";

const useStyles = makeStyles()(() => ({
  button: {
    height: 40,
  },
}));
interface Props {
  disabled: boolean;
  listTamY: string;
}

export function ExportToWordButton({ disabled, listTamY }: Props) {
  const { classes } = useStyles();
  const { fileId, sheetName } = useSheetContext();

  const isSingleRow = listTamY.split(",").length === 1;

  const exportToWord = async (): Promise<void> => {
    try {
      await axiosClient.get(`/words/${fileId}/sheets/${sheetName}/${listTamY}`);

      window.location.href = `${API_URL}/files/downloadWord/${listTamY}`;
      toast.success("Xuất file thành công");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        toast.error("Không có file template word. Hãy tải lên file word");
      }
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
