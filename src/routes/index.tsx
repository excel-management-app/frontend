import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Auth/Login";
import { SignUp } from "../pages/Auth/SignUp";
import { ROUTES } from "./consts";
import { ProtectedRoute } from "./ProtectedRoute";
import { FileManagement } from "../pages/FileManagement";
import { UserManagement } from "../pages/UserManagement";
import { Navbar } from "../components/Navbar";
import { useAuthContext } from "../contexts/AuthContext";

export const AppRoutes = () => {
  const { isAuth, isAdmin } = useAuthContext();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedRoute isAuth={isAuth}  isAdmin={true}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route
          path={ROUTES.FILES}
          element={
            <ProtectedRoute isAuth={isAuth} isAdmin ={isAdmin}>
              <FileManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.USERS}
          element={
            <ProtectedRoute isAuth={isAuth} isAdmin={isAdmin}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};
