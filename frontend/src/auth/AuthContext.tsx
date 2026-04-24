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

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  const login = (email: string, password: string) => {
    loginUser(email, password);
    setIsAuth(true);
  };

  const register = (email: string, password: string) => {
    registerUser(email, password);
  };

  const logout = () => {
    logoutUser();
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};