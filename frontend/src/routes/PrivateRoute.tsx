import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";

export default function PrivateRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? children : <Navigate to="/" />;
}