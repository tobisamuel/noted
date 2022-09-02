import useAxiosPrivate from "./useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { Note } from "../utils/types";

const useFetchNotes = (userId: string) => {
  const axiosPrivate = useAxiosPrivate();

  const getNotes = async (id: string): Promise<Note[]> => {
    const response = await axiosPrivate.get(`/notes/${id}`);
    return response.data;
  };

  return useQuery(["notes", userId], () => getNotes(userId), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60,
  });
};

export default useFetchNotes;
