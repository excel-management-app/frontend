import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Button, colors, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
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
  rowIndex: number;
  listRowIndex: string;
}
export function ExportToWordButton({ fileId, sheetName, rowIndex, listRowIndex }: Props) {
  const { classes } = useStyles();
  
  
  const exportToWord = async (): Promise<void> => {
    try {
      const response = await axiosClient.post(
        `/words/${fileId}/sheets/${sheetName}/rows/`,
        {
          data: listRowIndex,
        },
      );
      const url = `${import.meta.env.VITE_API_URL}/files/${fileId}/downloadWord`;
      window.location.href = url;
      toast.success("Xuất file thành công");
    } catch (error) {
      console.error("Error during file download:", error);
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
