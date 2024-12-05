import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import axiosClient from "../../../apis/axiosClient";

const useStyles = makeStyles()(() => ({
  button: {
    height: 40,
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

interface Props {
  onClose: () => void;
  onDeleted: () => void;
  fileIdToDelete: string;
}

export const ConfirmDeleteFileDialog = ({
  onClose,
  onDeleted,
  fileIdToDelete,
}: Props) => {
  const { classes } = useStyles();
  const [deleting, setDeleting] = useState(false);
  const handleDeleteFile = async () => {
    setDeleting(true);
    try {
      await axiosClient.put(`/files/${fileIdToDelete}/delete`);
      toast.success("Xóa file thành công");
      onDeleted();
      onClose();
    } catch (error) {
      toast.error("Xóa file thất bại, vui lòng thử lại");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Dialog open onClose={onClose} maxWidth="md">
      <DialogTitle className={classes.title}>
        <Typography
          variant="body1"
          fontWeight="bold"
          fontSize={18}
          textTransform="uppercase"
        >
          Xác nhận xóa file
        </Typography>
        <IconButton sx={{ cursor: "pointer" }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <Box width={400} p={2}>
        <Typography variant="body1" fontWeight="bold">
          Bạn có chắc chắn muốn xóa file này không?
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteFile}
            disabled={deleting}
          >
            Xác nhận
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onClose}
            disabled={deleting}
          >
            Hủy
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
