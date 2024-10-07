import {
  Box,
  Button,
  colors,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocalStorage } from "react-use";
import { makeStyles } from "tss-react/mui";
import axiosClient from "../../apis/axiosClient";

const useStyles = makeStyles()(() => ({
  updateButton: {
    height: 40,
    backgroundColor: colors.grey["900"],
    color: colors.grey["100"],
  },
}));
export const DeviceInfo = () => {
  const { classes } = useStyles();
  // get device id from local storage
  const [, setDeviceId] = useLocalStorage("deviceId", "");
  const [deviceName, setDeviceName] = useState("");

  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      const res = await axiosClient.post("/devices", {
        data: {
          name: deviceName,
        },
      });
      if (res.data) {
        setDeviceId(res.data._id);
        toast.success("Cập nhật thành công");
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: 448,
          height: 284,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">Nhập tên máy của bạn</Typography>
          <Typography color="error" variant="body2">
            Bạn phải nhập tên máy để có thể tiếp tục
          </Typography>
          <FormControl size="medium" margin="normal" fullWidth>
            <TextField
              variant="outlined"
              label="Tên máy"
              value={deviceName}
              onChange={(event) => setDeviceName(event.target.value)}
              fullWidth
            />
            <Box mt={2}>
              <Button
                fullWidth
                size="small"
                onClick={handleCreate}
                className={classes.updateButton}
              >
                Cập nhật tên máy
              </Button>
            </Box>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  );
};
