import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { ROLES, type AuthUser, type Role } from "../types";
import { roleLabel } from "../routes";

const STORAGE_KEY = "music-dashboard-user";

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    return ROLES.includes(parsed.role) ? parsed : null; // ignore tampered data
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser);

  const login = useCallback((role: Role) => {
    const next: AuthUser = { name: `Demo ${roleLabel[role]}`, role };
    setUser(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      console.warn("Failed to persist user to storage, but the in-memory session is set.");
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      console.warn("Failed to clear storage, but the in-memory session is cleared.");
    }
  }, []);

  
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}