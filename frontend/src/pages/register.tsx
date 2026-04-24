import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../components/NotificationProvider";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      notify("Las contraseñas no coinciden.", "error");
      return;
    }

    try {
      register(email, password);
      notify("Cuenta creada correctamente.", "success");
      navigate("/");
    } catch (error: any) {
      notify(error.message, "error");
    }
  };

  return (
    <div className="auth-wrap">
      <div
        className="deco"
        style={{
          width: "320px", height: "320px", top: "-100px", right: "-80px",
          background: "radial-gradient(circle,#064e3b 0%,transparent 70%)", opacity: 0.20
        }}
      />
      <div
        className="deco"
        style={{
          width: "240px", height: "240px", bottom: "-70px", left: "-60px",
          background: "radial-gradient(circle,#1d4ed8 0%,transparent 70%)", opacity: 0.14
        }}
      />
      <div
        className="deco"
        style={{
          width: "128px", height: "128px", top: "45%", left: "-50px",
          background: "radial-gradient(circle,#4ade80 0%,transparent 70%)", opacity: 0.09
        }}
      />
      <div
        className="deco"
        style={{
          width: "80px", height: "80px", bottom: "22%", right: "6%",
          background: "radial-gradient(circle,#34d399 0%,transparent 70%)", opacity: 0.12
        }}
      />
      <div
        className="deco"
        style={{
          width: "56px", height: "56px", top: "28%", right: "10%",
          border: "1px solid rgba(74,222,128,.20)"
        }}
      />
      <div
        className="deco"
        style={{
          width: "36px", height: "36px", bottom: "32%", left: "8%",
          border: "1px solid rgba(59,130,246,.15)"
        }}
      />

      <form className="auth-card" onSubmit={handleSubmit}>
        <h1 className="auth-title">Crear cuenta</h1>
        <p className="auth-sub">Comienza a gestionar en segundos</p>

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

        <div className="field">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="field" style={{ marginBottom: "1.5rem" }}>
          <label>Confirmar contraseña</label>
          <input
            type="password"
            placeholder="Repite la contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button type="submit" className="btn-primary">
          Registrarse
        </button>

        <div className="divider">
          <span>o</span>
        </div>

        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate("/")}
        >
          Ya tengo cuenta
        </button>
      </form>
    </div>
  );
}
