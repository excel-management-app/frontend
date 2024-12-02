import { Navigate } from "react-router-dom";
import { ROUTES } from "./consts";

type ProtectedRouteProps = {
  isAuth: boolean;
  children: JSX.Element;
};

export const ProtectedRoute = ({ isAuth, children }: ProtectedRouteProps) => {
  return isAuth ? children : <Navigate to={ROUTES.LOGIN} />;
};
