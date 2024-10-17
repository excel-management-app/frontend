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
  rowIndex?: number ;
}

export function ExportToWordButton({ fileId, sheetName, listRowIndex,rowIndex }: Props) {
  const { classes } = useStyles();

  var arrRowIndex = listRowIndex.split(",");
  const exportToWord = async (): Promise<void> => {
    console.log("export 1 file======", fileId);
    try {
      await axiosClient.get(`/words/${fileId}/sheets/${sheetName}/rows/${rowIndex ? rowIndex : arrRowIndex[0]}`);

      window.location.href = `${API_URL}/files/${rowIndex}/downloadWord`;
      toast.success("Xuất file thành công");
    } catch (error) {
      console.error("Error during file download:", error);
      toast.error(" Không có file template word. Hãy tải lên file word");
    }
  };

  const exportManyToWord = async (): Promise<void> => {
    console.log("export nhiều file======", fileId);
    try {
      const response = await axiosClient.post(
        `/words/${fileId}/sheets/${sheetName}/rows/`,
        {
          data: listRowIndex,
        },
      );
      
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
        onClick={arrRowIndex.length > 1 ? exportManyToWord : exportToWord}
      >
        Xuất đơn
      </Button>
    </Tooltip>
  );
}
