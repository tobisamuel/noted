import { logoutUser } from "../api/requests";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    await logoutUser();
  };

  return logout;
};

export default useLogout;
