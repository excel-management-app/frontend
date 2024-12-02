import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Auth/Login";
import { SignUp } from "../pages/Auth/SignUp";
import { ROUTES } from "./consts";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import { FileManagement } from "../pages/FileManagement";
import { UserManagement } from "../pages/UserManagement";
import { Navbar } from "../components/Navbar";

export const AppRoutes = () => {
  const { isAuth } = useAuth();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route
          path={ROUTES.FILES}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <FileManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.USERS}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};
