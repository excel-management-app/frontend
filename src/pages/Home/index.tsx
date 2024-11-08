import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { ExcelViewer } from "../../components/ExcelViewer";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useGetAllFiles } from "../../components/ExcelViewer/hooks/useGetAllFiles";

export const Home = () => {
  const { currentUser } = useCurrentUser();
  const isAuth = currentUser._id && currentUser.name;

  const { files, isLoading } = useGetAllFiles();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  return (
    <Box>
      <ExcelViewer files={files} />
    </Box>
  );
};
