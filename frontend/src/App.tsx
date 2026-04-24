import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Register from "./pages/register";
import HomePage from "./pages/homePage";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./App.css";

function App() {
  return <RouterProvider router={router} />;
}

export default App;