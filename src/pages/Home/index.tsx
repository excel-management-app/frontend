import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { ExcelViewer } from "../../components/ExcelViewer";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export const Home = () => {
  const { currentUser } = useCurrentUser();
  const isAuth = currentUser._id && currentUser.name;

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <Box>
      <ExcelViewer />
    </Box>
  );
};
