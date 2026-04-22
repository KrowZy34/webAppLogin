import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home (protegido)</h1>

      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}