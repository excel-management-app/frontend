import { useState } from "react";
import { useCurrentUser } from "./useCurrentUser";

export function useAuth() {
  const { currentUser } = useCurrentUser();
  const [isAuth, setIsAuth] = useState(
    Boolean(currentUser?._id && currentUser?.name),
  );

  return { isAuth, setIsAuth };
}
