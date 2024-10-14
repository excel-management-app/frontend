import { useLocalStorage } from "react-use";
import { CurrentUser, isAdmin } from "../utils/types";

interface Result {
  currentUser: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
  isAdmin: boolean;
}

export const useCurrentUser = (): Result => {
  const [user, setCurrentUser] = useLocalStorage<CurrentUser>("currentUser", {
    _id: "",
    name: "",
    role: "user" as CurrentUser["role"],
  });
  const currentUser = user
    ? user
    : {
        _id: "",
        name: "",
        role: "user" as CurrentUser["role"],
      };

  return {
    currentUser,
    setCurrentUser,
    isAdmin: isAdmin(currentUser),
  };
};
