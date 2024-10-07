import {
  Box,
  Button,
  colors,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocalStorage } from "react-use";
import { makeStyles } from "tss-react/mui";
import axiosClient from "../../apis/axiosClient";

const useStyles = makeStyles()(() => ({
  exitButton: {
    height: 40,
    backgroundColor: colors.grey["100"],
    color: colors.grey["900"],
  },
  updateButton: {
    height: 40,
    backgroundColor: colors.grey["900"],
    color: colors.grey["100"],
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editRowButton: {
    height: 40,
    backgroundColor: colors.grey["900"],
  },
}));
export const DeviceInfo = () => {
  const { classes } = useStyles();
  // get device id from local storage
  const [deviceId, setDeviceId] = useLocalStorage("deviceId", "");
  const [open, setOpen] = useState(false);
  const [deviceName, setDeviceName] = useState("");

  useEffect(() => {
    if (!deviceId) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [deviceId]);

  const handleCreate = async () => {
    try {
      const res = await axiosClient.post("/devices", {
        data: {
          name: deviceName,
        },
      });
      if (res.data) {
        setDeviceId(res.data._id);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
      console.error(error);
    }
  };

  return open ? (
    <Dialog open fullScreen disableEscapeKeyDown>
      <DialogTitle className={classes.title}>
        <Typography variant="h6">Nhập tên máy của bạn</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          <Typography variant="h2">Thay đổi tên máy</Typography>
          <Typography color="error" variant="h6">
            Bạn phải nhập tên máy để có thể tiếp tục
          </Typography>
          <FormControl size="medium">
            <TextField
              variant="outlined"
              label="Tên máy"
              value={deviceName}
              onChange={(event) => setDeviceName(event.target.value)}
              fullWidth
            />
          </FormControl>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions
        sx={{
          p: 2,
        }}
      >
        <Button
          size="small"
          onClick={handleCreate}
          className={classes.updateButton}
        >
          Cập nhật tên máy
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
};
