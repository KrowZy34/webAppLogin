import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import Register from "../pages/register";
import HomePage from "../pages/homePage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../components/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);