export interface User {
  email: string;
  password: string;
}

export interface AuthContextType {
  isAuth: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
}