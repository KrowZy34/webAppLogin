import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const HomePage: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center px-4">
      
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl p-10 text-center relative">
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 text-sm text-red-400 hover:text-red-300 transition px-3 py-1 border border-red-500 rounded-md hover:bg-red-500 hover:bg-opacity-20"
        >
          Cerrar Sesión
        </button>

        {/* TÍTULO */}
        <h1 className="text-4xl font-bold mb-4">
          Sistema de Gestión
        </h1>

        {/* DESCRIPCIÓN */}
        <p className="text-gray-400 mb-8 text-lg">
          Administra tus <span className="text-blue-400 font-semibold">tareas</span> y{" "}
          <span className="text-green-400 font-semibold">productos</span> de forma rápida y eficiente 🚀
        </p>

        {/* BOTÓN PRINCIPAL */}
        <Link
          to="/dashboard"
          className="block w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold mb-4"
        >
          Ir al Dashboard
        </Link>

        {/* INFO EXTRA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300 mt-6">

          <div className="bg-gray-900 p-4 rounded-lg">
            📝 Gestión de tareas
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            📦 Control de productos
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            ⚡ Interfaz rápida
          </div>

        </div>

      </div>
    </div>
  );
};

export default HomePage;
