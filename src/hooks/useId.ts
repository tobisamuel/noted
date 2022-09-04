import getIdFromToken from "../utils/decodeToken";
import useAuth from "./useAuth";

const useId = () => {
  const { auth } = useAuth();
  const userId = getIdFromToken(auth.accessToken!);

  return userId;
};

export default useId;
