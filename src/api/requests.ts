import { Note, User } from "../utils/types";
import axios, { axiosPrivate } from "./axios";
import { AuthType } from "../context/auth/context";
import { NoteDeets } from "../components/noteForm";

export const login = async (data: {
  email: string;
  password: string;
}): Promise<AuthType> => {
  const response = await axios.post("/auth", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.get("/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getNotes = async (token: string) => {
  const response = await axios.get("/notes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createNote = async (data: NoteDeets): Promise<Note> => {
  const response = await axiosPrivate.post("/notes", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const updateNote = async (note: Note): Promise<Note> => {
  const response = await axiosPrivate.put(`/notes/${note._id}`, note, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const deleteNote = async (id: String) => {
  const response = await axiosPrivate.delete(`/notes/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const fetchUser = async (userId: string): Promise<User> => {
  const response = await axiosPrivate.get(`/users/${userId}`);

  return response.data;
};

export const updateUser = async (data: User): Promise<User> => {
  const { id, ...rest } = data;
  const response = await axiosPrivate.put(`/users/${id}`, rest);
  return response.data;
};

type PassArgs = {
  id: string;
  oldPassword: string;
  newPassword: string;
};

export const changePassword = async (data: PassArgs) => {
  const response = await axiosPrivate.post("/users/password", data);

  return response.data;
};
