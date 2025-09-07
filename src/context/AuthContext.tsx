import { createContext } from "react";

type User = {
  id: string;
  name: string;
  role: "user" | "admin";
  avatar?: string;
  email: string;
  token?: string;
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean; // Add loading to context
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
