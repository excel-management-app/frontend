import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { useFilesContext } from "../../contexts/FilesContext";
import { ConfirmDeleteFileDialog } from "./components/ConfirmDeleteFileDialog";
import FileUploadButton from "./components/FileUploadButton";
import { TemplateUploadButtons } from "./components/TemplateUploadButtons";
import { useTitle } from "react-use";
import { FilesRecycleBin } from "./FilesRecycleBin";

export const FileManagement = () => {
  useTitle("Quản lý file");

  const { files, refetch } = useFilesContext();
  const [fileIdToDelete, setFileIdToDelete] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isRecycleBinOpen, setIsRecycleBinOpen] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      p={2}
      sx={{
        overflowY: "auto",
      }}
    >
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Danh sách excel" />
        <Tab label="Danh sách mẫu word" />
      </Tabs>
      {selectedTab === 0 && (
        <>
          <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
            <FileUploadButton onUploadSuccess={refetch} />
            <Button
              variant="contained"
              color="error"
              onClick={() => setIsRecycleBinOpen(true)}
              startIcon={<DeleteIcon />}
            >
              Thùng rác
            </Button>
          </Box>
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
        </>
      )}
      {selectedTab === 1 && (
        <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
          <TemplateUploadButtons />
        </Box>
      )}
      {fileIdToDelete && (
        <ConfirmDeleteFileDialog
          onClose={() => setFileIdToDelete(null)}
          onDeleted={refetch}
          fileIdToDelete={fileIdToDelete}
        />
      )}
      {isRecycleBinOpen && (
        <FilesRecycleBin
          onClose={() => setIsRecycleBinOpen(false)}
          onRestored={refetch}
        />
      )}
    </Box>
  );
};
