import { Box } from "@mui/material";
import { ExcelViewer } from "../../components/ExcelViewer";
import { useFilesContext } from "../../contexts/FilesContext";
import { useTitle } from "react-use";

export const Home = () => {
  useTitle("Trang chủ");
  const { files, loading } = useFilesContext();

  if (loading) {
    return <Box>Loading...</Box>;
  }
  return (
    <Box>
      <ExcelViewer files={files} />
    </Box>
  );
};
