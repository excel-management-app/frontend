import { useLocalStorage } from "react-use";
import { CurrentUser } from "../utils/types";

interface Result {
  currentUser: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
}

export const useCurrentUser = (): Result => {
  const [currentUser, setCurrentUser] = useLocalStorage<CurrentUser>(
    "currentUser",
    {
      _id: "",
      name: "",
      role: "user",
    },
  );

  return {
    currentUser: currentUser
      ? currentUser
      : {
          _id: "",
          name: "",
          role: "user",
        },
    setCurrentUser,
  };
};
