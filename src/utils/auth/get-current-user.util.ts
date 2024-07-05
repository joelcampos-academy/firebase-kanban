import { getAuth } from "firebase/auth";

export const getCurrentUser = () => {
  const user = getAuth().currentUser;

  if (!user) throw new Error("User was expected");

  return user;
};
