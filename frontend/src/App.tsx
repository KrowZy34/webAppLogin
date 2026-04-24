import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./auth/AuthContext";
import { NotificationProvider } from "./components/NotificationProvider";
import "./App.css";

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;