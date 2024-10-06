import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { useUploadFile } from "./hooks/useUploadFile";

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
  button: {
    height: 40,
    backgroundColor: colors.grey["900"],
  },
}));

export default function FileUploadButton() {
  const { classes } = useStyles();

  const { mutate, isPending } = useUploadFile();

  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
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
    <LoadingButton
      className={classes.button}
      loadingPosition="start"
      loading={isPending}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<FileUploadOutlinedIcon />}
    >
      Tải file mới
      <VisuallyHiddenInput
        id="fileInput"
        type="file"
        onChange={uploadFile}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </LoadingButton>
  );
}
