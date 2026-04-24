import { type User } from "../types/auth";

const USERS_KEY = "users";
const TOKEN_KEY = "token";

export const getUsers = (): User[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const registerUser = (email: string, password: string) => {
  const users = getUsers();

  const exists = users.find((u) => u.email === email);
  if (exists) throw new Error("El usuario ya existe");

  users.push({ email, password });
  saveUsers(users);
  localStorage.setItem("userEmail", email);
};

export const loginUser = (email: string, password: string) => {
  const users = getUsers();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) throw new Error("Credenciales incorrectas");

  const fakeToken = "token_" + Date.now();
  localStorage.setItem(TOKEN_KEY, fakeToken);
  localStorage.setItem("userEmail", email);
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("userEmail");
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};