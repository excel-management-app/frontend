import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { ROUTES } from "../../routes/consts";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { setCurrentUser } = useCurrentUser();
  const location = useLocation();

  const handleLogout = async () => {
    setCurrentUser({
      _id: "",
      name: "",
      role: "user",
    });
    navigate("/login");
  };

  if (
    !isAuth ||
    location.pathname === ROUTES.LOGIN ||
    location.pathname === ROUTES.SIGNUP
  ) {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Nhập Liệu
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to={ROUTES.HOME}>
            Trang chủ
          </Button>
          <Button color="inherit" component={Link} to={ROUTES.FILES}>
            Quản lý file
          </Button>
          <Button color="inherit" component={Link} to={ROUTES.USERS}>
            Quản lý người dùng
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
