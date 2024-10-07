import { Box } from "@mui/material";
import { ExcelViewer } from "../../components/ExcelViewer";
import { useLocalStorage } from "react-use";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [deviceId] = useLocalStorage("deviceId", "");
  useEffect(() => {
    if (!deviceId) {
      navigate("/deviceInfo");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <Box>
      <ExcelViewer />
    </Box>
  );
};
