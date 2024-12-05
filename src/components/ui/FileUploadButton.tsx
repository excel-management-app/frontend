import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useState } from "react";
import { makeStyles } from "tss-react/mui";

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
    backgroundColor: colors.grey["100"],
    color: colors.grey["900"],
  },
}));

interface Props {
  title: string;
  isPending?: boolean;
  onUpload: (file: File) => void;
}

export const FileUploadButton = ({
  title,
  isPending = false,
  onUpload,
}: Props) => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const file = event.target.files?.[0];
      if (file) {
        onUpload(file);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton
      className={classes.button}
      loadingPosition="start"
      loading={loading || isPending}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<FileUploadOutlinedIcon />}
    >
      {title}
      <VisuallyHiddenInput
        id="fileInput"
        type="file"
        onChange={handleUpload}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </LoadingButton>
  );
};
