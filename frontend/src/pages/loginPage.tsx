import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../components/NotificationProvider";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      login(email, password);
      notify("Bienvenido de vuelta.", "success");
      navigate("/home");
    } catch (error: any) {
      notify(error.message, "error");
    }
  };

  return (
    <div className="auth-wrap">
      <div
        className="deco"
        style={{
          width: "320px", height: "320px", top: "-120px", right: "-100px",
          background: "radial-gradient(circle,#1d4ed8 0%,transparent 70%)", opacity: 0.18
        }}
      />
      <div
        className="deco"
        style={{
          width: "256px", height: "256px", bottom: "-80px", left: "-80px",
          background: "radial-gradient(circle,#3b82f6 0%,transparent 70%)", opacity: 0.12
        }}
      />
      <div
        className="deco"
        style={{
          width: "160px", height: "160px", top: "40%", left: "-60px",
          background: "radial-gradient(circle,#60a5fa 0%,transparent 70%)", opacity: 0.10
        }}
      />
      <div
        className="deco"
        style={{
          width: "96px", height: "96px", bottom: "20%", right: "5%",
          background: "radial-gradient(circle,#93c5fd 0%,transparent 70%)", opacity: 0.14
        }}
      />
      <div
        className="deco"
        style={{
          width: "64px", height: "64px", top: "30%", right: "8%",
          border: "1px solid rgba(59,130,246,.25)"
        }}
      />
      <div
        className="deco"
        style={{
          width: "40px", height: "40px", bottom: "30%", left: "10%",
          border: "1px solid rgba(59,130,246,.15)"
        }}
      />

      <form className="auth-card" onSubmit={handleSubmit}>
        <h1 className="auth-title">Gestiona</h1>
        <p className="auth-sub">Tu plataforma de gestión inteligente</p>

        <div className="field">
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field" style={{ marginBottom: "1.5rem" }}>
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Ingresar
        </button>

        <div className="divider">
          <span>o</span>
        </div>

        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate("/register")}
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}