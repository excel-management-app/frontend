import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ListIcon from "@mui/icons-material/List";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { FileListOption } from "../../utils/types";
import { toast } from "react-toastify";
import axiosClient from "../../apis/axiosClient";

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
  files: FileListOption[];
  refetchFilesData: () => void;
}
export const ManageFilesButton = ({ files, refetchFilesData }: Props) => {
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fileIdToDelete, setFileIdToDelete] = useState<string | null>(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancelDelete = () => {
    setFileIdToDelete(null);
    setDeleting(false);
  };
  const handleDeleteFile = async () => {
    setDeleting(true);
    try {
      await axiosClient.delete(`/files/${fileIdToDelete}/delete`);
      toast.success("Xóa file thành công");
      refetchFilesData();
    } catch (error) {
      toast.error("Xóa file thất bại, vui lòng thử lại");
    } finally {
      handleCancelDelete();
    }
  };

  return (
    <>
      <Tooltip title="Quản lý danh sách file">
        <Button
          className={classes.button}
          role={undefined}
          variant="contained"
          color="primary"
          startIcon={<ListIcon />}
          onClick={() => setOpen(true)}
        >
          Quản lý file
        </Button>
      </Tooltip>

      {open && (
        <Dialog open onClose={handleClose} maxWidth="lg" fullWidth>
          <DialogTitle className={classes.title}>
            <Typography
              variant="body1"
              fontWeight="bold"
              fontSize={18}
              textTransform="uppercase"
            >
              Quản lý file
            </Typography>
            <IconButton sx={{ cursor: "pointer" }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <Box
            width={1}
            sx={{
              maxHeight: 600,
              overflowY: "auto",
            }}
          >
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên file</TableCell>
                    <TableCell>Ngày tải lên</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>{file.fileName}</TableCell>
                      <TableCell>
                        {dayjs(file.uploadedAt).format("DD/MM/YYYY, h:mm:ss A")}
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <DeleteIcon
                            color="error"
                            onClick={() => setFileIdToDelete(file.id)}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Dialog>
      )}
      {fileIdToDelete && (
        <Dialog open onClose={handleCancelDelete} maxWidth="md">
          <DialogTitle className={classes.title}>
            <Typography
              variant="body1"
              fontWeight="bold"
              fontSize={18}
              textTransform="uppercase"
            >
              Xác nhận xóa file
            </Typography>
            <IconButton sx={{ cursor: "pointer" }} onClick={handleCancelDelete}>
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
                onClick={handleCancelDelete}
                disabled={deleting}
              >
                Hủy
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
    </>
  );
};
