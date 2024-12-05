import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "./consts";
import { ErrorBoundary } from "../components/ErrorBoundary";

interface ProtectedRouteProps {
  isAuth: boolean;
  isAdmin: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectPath?: string;
}

export const ProtectedRoute = ({
  isAuth,
  isAdmin,
  isLoading = false,
  children,
  fallback = <div>Loading...</div>,
  redirectPath = ROUTES.LOGIN,
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (!isAdmin) {
    return <Navigate to={ROUTES.ERROR} replace />;
  }

  if (!isAuth) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return (
    <ErrorBoundary fallback={<Navigate to={ROUTES.ERROR} replace />}>
      {children}
    </ErrorBoundary>
  );
};
