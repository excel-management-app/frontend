import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  Box,
  Drawer,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTitle } from "react-use";
import axiosClient from "../../apis/axiosClient";
import DeleteConfirmDialog from "../../components/ui/DeleteConfirmationDialog";
import { useGetDeletedFiles } from "../../hooks/useGetDeletedFiles";

interface Props {
  onClose: () => void;
  onRestored: () => void;
}

export const FilesRecycleBin = ({ onClose, onRestored }: Props) => {
  useTitle("Thùng rác");

  const { files, isLoading, refetch } = useGetDeletedFiles();
  const [fileIdToDelete, setFileIdToDelete] = useState<string | null>(null);

  const restoreFile = async (fileId: string) => {
    try {
      await axiosClient.put(`/files/${fileId}/restore`);
      toast.success("Khôi phục file thành công");
      refetch();
      onRestored();
    } catch (error) {
      toast.error("Khôi phục file thất bại");
    }
  };
  const permanentlyDeleteFile = async (fileId: string) => {
    try {
      await axiosClient.delete(`/files/${fileId}/delete`);
      toast.success("Xóa file thành công");
      refetch();
      setFileIdToDelete(null);
    } catch (error) {
      toast.error("Xóa file thất bại");
    }
  };

  return (
    <>
      <Drawer anchor="right" open onClose={onClose}>
        {isLoading ? (
          <Box p={2}>
            <Typography>Đang tải dữ liệu...</Typography>
          </Box>
        ) : (
          <Box p={2} width={700}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên file</TableCell>
                    <TableCell>Ngày xóa</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>{file.fileName}</TableCell>
                      <TableCell>
                        {dayjs(file.deletedAt).format("DD/MM/YYYY, h:mm:ss A")}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Khôi phục">
                          <IconButton onClick={() => restoreFile(file.id)}>
                            <RestoreIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa vĩnh viễn">
                          <IconButton
                            onClick={() => setFileIdToDelete(file.id)}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Drawer>
      {fileIdToDelete && (
        <DeleteConfirmDialog
          onClose={() => setFileIdToDelete(null)}
          title="Xác nhận xóa vĩnh viễn"
          content="Bạn có chắc chắn muốn xóa vĩnh viễn file này không?"
          validConfirmation="Xác nhận"
          onConfirmed={() => permanentlyDeleteFile(fileIdToDelete)}
        />
      )}
    </>
  );
};
