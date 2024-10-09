import { Box, TextField, Tooltip, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../apis/axiosClient";
import { useLocalStorage } from "react-use";

export interface Device {
  name: string;
  id: string;
}
export const DeviceName = () => {
  const [deviceName, setDeviceName] = useState("");
  const [editing, setEditing] = useState(false);
  const [initialized, setInitialized] = useState("");
  const [deviceId] = useLocalStorage("deviceId", "");

  useEffect(() => {
    const getDeviceName = async () => {
      const response = await axiosClient.get<Device>("/devices", {
        data: { deviceId },
      });

      setDeviceName(response.data.name);

      setInitialized(response.data.name);
    };
    getDeviceName();
  }, []);
  const isChange = deviceName !== initialized;

  const handleUpdateDeviceName = async () => {
    if (!isChange) {
      return;
    }
    try {
      await axiosClient.put<Device>("/devices", {
        data: { name: deviceName, id: deviceId },
      });

      setEditing(false);

      toast.success("Cập nhật thành công");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };
  return (
    <Box>
      {!editing ? (
        <Tooltip title="Ấn vào để cập nhật tên">
          <Typography variant="h6" height={40} onClick={() => setEditing(true)}>
            {deviceName}
          </Typography>
        </Tooltip>
      ) : (
        <TextField
          size="small"
          autoFocus
          value={deviceName}
          onChange={(e) => {
            setDeviceName(e.target.value);
          }}
          onBlur={handleUpdateDeviceName}
        />
      )}
    </Box>
  );
};
