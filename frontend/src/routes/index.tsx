import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homePage";
import Dashboard from "../components/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);