import { createContext, useState, useEffect, type ReactNode } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  isAuthenticated,
} from "./authService";
import type { AuthContextType } from "../types/auth";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<{email: string} | null>(null);

  useEffect(() => {
    const authStatus = isAuthenticated();
    setIsAuth(authStatus);
    if (authStatus) {
      setUser({ email: localStorage.getItem("userEmail") || "" });
    }
  }, []);

  const login = (email: string, password: string) => {
    loginUser(email, password);
    setIsAuth(true);
    setUser({ email });
  };

  const register = (email: string, password: string) => {
    registerUser(email, password);
    setIsAuth(true);
    setUser({ email });
  };

  const logout = () => {
    logoutUser();
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};