import axios from "../api/axios";
import useAuth from "./useAuth";
import getIdFromToken from "../utils/decodeToken";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh");
    const token = response.data.accessToken;
    const userId = getIdFromToken(token);

    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
        userId: userId,
      };
    });

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
