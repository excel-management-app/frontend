import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "react-use";
import axiosClient from "../apis/axiosClient";
import { CurrentUser } from "../utils/types";

interface AuthContextType {
  currentUser: CurrentUser;
  isAuth: boolean;
  token: string | undefined;
  setToken: (token: string) => void;
  isAdmin: boolean;
  getUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    _id: "",
    name: "",
    role: "user",
  });
  const [token, setToken] = useLocalStorage<string>("token", "");
  const [isAuth, setIsAuth] = useState<boolean>(!!token);

  const getUser = useCallback(async () => {
    try {
      const res = await axiosClient.get("/accounts/me");
      setCurrentUser(res.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    }
  }, []);
  useLayoutEffect(() => {
    getUser();
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      getUser,
      currentUser,
      isAuth,
      isAdmin: currentUser?.role === "admin",
      token,
      setToken,
    }),
    [currentUser, token, setToken, getUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
