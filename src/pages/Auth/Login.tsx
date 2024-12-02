import {
  Box,
  Button,
  Card,
  CardContent,
  colors,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { CurrentUser } from "../../utils/types";
import axiosClient from "../../apis/axiosClient";
import { useLocalStorage, useTitle } from "react-use";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ROUTES } from "../../routes/consts";
import { useAuth } from "../../hooks/useAuth";

const useStyles = makeStyles()(() => ({
  updateButton: {
    height: 40,
    backgroundColor: colors.grey["900"],
    color: colors.grey["100"],
  },
}));

export const Login = () => {
  useTitle("Đăng nhập");
  const { classes } = useStyles();

  const navigate = useNavigate();
  const { setIsAuth } = useAuth();
  const [, setCurrentUser] = useLocalStorage<CurrentUser>("currentUser", {
    _id: "",
    name: "",
    role: "user",
  });

  const [user, setUser] = useState<{
    name: string;
    password: string;
  }>({
    name: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await axiosClient.post("/accounts/login", {
        data: user,
      });
      setCurrentUser(res.data);
      toast.success("Đăng nhập thành công");
      setIsAuth(true);
      navigate(ROUTES.HOME);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        console.log(error);
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
          height: 350,
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
          <Typography variant="h5">Nhập tài khoản của bạn</Typography>
          <Typography color="error" variant="body2">
            Bạn phải nhập tài khoản có thể tiếp tục
          </Typography>
          <FormControl size="medium" margin="normal" fullWidth>
            <TextField
              margin="normal"
              variant="outlined"
              label="Tài khoản"
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
              fullWidth
            />
            <TextField
              margin="normal"
              variant="outlined"
              label="Mật khẩu"
              type="password"
              value={user.password}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              fullWidth
            />
            <Box mt={2}>
              <Button
                fullWidth
                size="small"
                onClick={handleLogin}
                className={classes.updateButton}
              >
                Đăng nhập
              </Button>
            </Box>
            <Typography variant="body1" mt={1}>
              Chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
            </Typography>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  );
};
