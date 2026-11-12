import { createContext } from "react";
import type { AuthUser, Role } from "../types";

export interface AuthContextValue {
  user: AuthUser | null;
  login: (role: Role) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);