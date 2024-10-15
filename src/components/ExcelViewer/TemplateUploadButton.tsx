import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { useUploadFileWord } from "./hooks/useUploadFile";

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
  }
}));

export const TemplateUploadButton = () => {
  const { classes } = useStyles();

  const { mutate, isPending } = useUploadFileWord();

  const uploadFile = (event: ChangeEvent<HTMLInputElement>, type: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type.toString());  // 1 là file cấp mới , 2 là file cấp đổi
      mutate(formData, {
        onSuccess: () => {
          toast.success("Tải file thành công");
          (document.getElementById("fileInput") as HTMLInputElement).value = "";
        },
        onError: () => {
          toast.error("Tải file lỗi, vui lòng thử lại");
          (document.getElementById("fileInput") as HTMLInputElement).value = "";
        },
      });
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
        Tải mẫu cấp đổi
        <VisuallyHiddenInput
          id="fileInput"
          type="file"
          onChange={(event) => uploadFile(event, 2)}
          accept=".docx"
        />
      </LoadingButton>
      <LoadingButton
        className={classes.button2}
        loadingPosition="start"
        loading={isPending}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<FileUploadOutlinedIcon />}
      >
        Tải mẫu cấp mới
        <VisuallyHiddenInput
          id="fileInput"
          type="file"
          onChange={(event) => uploadFile(event, 1)}
          accept=".docx"
        />
      </LoadingButton>
    </>
    
    
  );
};
