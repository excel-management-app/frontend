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
import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTitle } from "react-use";
import { makeStyles } from "tss-react/mui";
import axiosClient from "../../apis/axiosClient";
import { useAuthContext } from "../../contexts/AuthContext";
import { ROUTES } from "../../routes/consts";

const useStyles = makeStyles()(() => ({
  updateButton: {
    height: 40,
    backgroundColor: colors.grey["900"],
    color: colors.grey["100"],
  },
}));

export const SignUp = () => {
  useTitle("Đăng ký");
  const { classes } = useStyles();
  const { setToken } = useAuthContext();

  const [user, setUser] = useState<{
    name: string;
    password: string;
  }>({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axiosClient.post("/accounts/signup", { data: user });
      setToken(res.data.token);
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
          <Typography variant="h5">Tạo tài khoản </Typography>

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
                onClick={handleSignUp}
                className={classes.updateButton}
              >
                Tạo tài khoản
              </Button>
            </Box>
            <Typography variant="body1" mt={1}>
              Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </Typography>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  );
};
