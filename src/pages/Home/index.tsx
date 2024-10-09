import { Box } from "@mui/material";
import { ExcelViewer } from "../../components/ExcelViewer";
import { useLocalStorage } from "react-use";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../apis/axiosClient";
import { Device } from "../../components/DeviceInfo/DeviceName";

export const Home = () => {
  const navigate = useNavigate();
  const [deviceId, setDeviceId] = useLocalStorage("deviceId", "");
  useEffect(() => {
    const getDeviceName = async () => {
      return await axiosClient.get<Device>("/devices", {
        data: { deviceId },
      });
    };
    if (!deviceId) {
      navigate("/deviceInfo");
    } else {
      getDeviceName()
        .then((response) => {
          setDeviceId(response.data.id);
          navigate("/");
        })
        .catch((error) => {
          setDeviceId(undefined);
          console.error(error);
        });
    }
  }, []);
  return (
    <Box>
      <ExcelViewer />
    </Box>
  );
};
