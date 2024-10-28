import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { API_URL } from "../../utils/consts";
import { AxiosError } from "axios";
import axiosClient from "../../apis/axiosClient";
import LoadingButton from "@mui/lab/LoadingButton";
import { colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { useUploadFileMap } from "./hooks/useUploadFile";



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
interface UploadMapButtonProps {
  isAdmin: boolean;
}

export const UploadMapButton = ({ isAdmin }: UploadMapButtonProps) => {
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
      await axiosClient.get(`/files/downloadMap`); 
      window.location.href = `${API_URL}/files/downloadMap`;
      toast.success("Xuất file thành công");
      
    } catch (error) {
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
        {isAdmin && (
        <LoadingButton
          className={classes.button1}
          loadingPosition="start"
          loading={isPending}
          component="label"
          variant="contained"
          startIcon={<FileUploadOutlinedIcon />}
        >
          Tải lên bản đồ
          <input
            id="fileInput"
            type="file"
            onChange={uploadFile}
            accept=".DGN"
            style={{ display: "none" }}
          />
        </LoadingButton>
      )}
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
