import { createContext, Dispatch } from "react";

export type AuthType = {
  accessToken?: string;
};

export type AuthContextType = {
  auth: AuthType;
  setAuth: Dispatch<React.SetStateAction<AuthType>>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
