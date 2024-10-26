import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { API_URL } from "../../utils/consts";
import { AxiosError } from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { useUploadFileMap, useUploadFileWord } from "./hooks/useUploadFile";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const useStyles = makeStyles()(() => ({
  button1: {
    height: 40,
    backgroundColor: colors.grey["900"],
  },
  button2: {
    height: 40,
    backgroundColor: colors.grey["100"],
    color: colors.grey["900"],
  },
}));

export const UploadMapButton = () => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const { mutate, isPending } = useUploadFileMap();

  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      mutate(formData, {
        onSuccess: () => {
          setLoading(false);
          toast.success("Tải file thành công");
          (document.getElementById("fileInput") as HTMLInputElement).value = "";
        },
        onError: () => {
          setLoading(false);
          toast.error("Tải file lỗi, vui lòng thử lại");
          (document.getElementById("fileInput") as HTMLInputElement).value = "";
        },
      });
    }
  };

  const downloadFile = async (): Promise<void> => {
    try {
      setLoading(true);
      window.location.href = `${API_URL}/files/downloadMap`;
      toast.success("Xuất file thành công");
      
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        toast.error("Không có file Bản đồ. Hãy tải lên file bản đồ");
      }
    }
     finally {
        setLoading(false);
    }
  };

  return (
    <>
      <LoadingButton
        className={classes.button1}
        loadingPosition="start"
        loading={isPending}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<FileUploadOutlinedIcon />}
      >
        Tải lên bản đồ
        <VisuallyHiddenInput
          id="fileInput"
          type="file"
          onChange={uploadFile}
          accept=".DGN"
        />
      </LoadingButton>
      <LoadingButton
        className={classes.button2}
        role={undefined}
        variant="contained"
        startIcon={<FileDownloadOutlinedIcon />}
        onClick={downloadFile}
        loading={loading}
      >
        Tải xuống bản đồ
      </LoadingButton>
    </>
  );
};
