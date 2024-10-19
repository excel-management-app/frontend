import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Checkbox,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import axiosClient from "../../apis/axiosClient";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles()(() => ({
  addButton: {
    height: 40,
    color: colors.grey["100"],
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paper: {
    width: 400,
  },
}));
interface UpdateData {
  name: string;
  password?: string; // The ? makes the password property optional
}

export const UserInfo = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [name, setName] = useState(currentUser.name);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const isChange = name !== currentUser.name || password !== "";
  const onClose = () => {
    setEditing(false);
    setName("");
    setPassword("");
  };
  const handleUpdateAccount = async () => {
    if (!isChange) {
      return;
    }
    const newData: UpdateData = {
      name,
    };
    if (password) {
      newData["password"] = password;
    }

    try {
      const res = await axiosClient.put("/accounts", {
        data: newData,
      });
      setCurrentUser(res.data);

      onClose();
      toast.success("Cập nhật thành công");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };

  const handleLogout = async () => {
    setCurrentUser({
      _id: "",
      name: "",
      role: "user",
    });
    navigate("/login");
  };

  return (
    <Box>
      {!editing ? (
        <Box display="flex" alignItems="center" gap={2}>
          <Typography
            variant="h6"
            height={40}
            display={"flex"}
            alignItems="center"
          >
            {currentUser.name}
          </Typography>
          <Tooltip title="Ấn vào để cập nhật">
            <IconButton onClick={() => setEditing(true)}>
              <EditOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Dialog
          open
          maxWidth="md"
          classes={{
            paper: classes.paper,
          }}
        >
          <DialogTitle className={classes.title}>
            <Typography
              variant="body1"
              fontWeight="bold"
              fontSize={18}
              textTransform="uppercase"
            >
              Cập nhật tài khoản
            </Typography>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
          </DialogTitle>

          <DialogContent>
            <FormControl fullWidth size="small" margin="normal">
              <TextField
                label="Tên"
                margin="normal"
                size="small"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <FormControlLabel
                label="Đổi mật khẩu"
                control={
                  <Checkbox
                    checked={isUpdatingPassword}
                    onChange={(e) => setIsUpdatingPassword(e.target.checked)}
                  />
                }
              />
              {isUpdatingPassword && (
                <TextField
                  label="Mật khẩu"
                  margin="normal"
                  size="small"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              )}
            </FormControl>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="error"
              className={classes.addButton}
              onClick={handleLogout}
            >
              Thoát tài khoản
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.addButton}
              onClick={handleUpdateAccount}
            >
              Cập nhật
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};
