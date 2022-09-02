import useAxiosPrivate from "./useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { User } from "../utils/types";

const useFetchUser = (userId: string) => {
  const axiosPrivate = useAxiosPrivate();

  const fetchUser = async (userId: string): Promise<User> => {
    const response = await axiosPrivate.get(`/users/${userId}`);
    return response.data;
  };

  return useQuery(["user", userId], () => fetchUser(userId), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default useFetchUser;
