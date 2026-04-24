import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const HomePage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="page active">
        <h2 className="page-title">
          Administra tus tareas<br />
          y productos
        </h2>
        <p className="page-sub">Gestiona de forma rápida y eficiente</p>

        <div className="cards-grid">
          <Link to="/dashboard" className="module-card blue">
            <div className="module-card-body">
              <div className="module-icon blue">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </div>
              <div className="module-title">Gestión de tareas</div>
              <div className="module-desc">Organiza y controla tus actividades</div>
              <span className="module-arrow">→</span>
            </div>
          </Link>

          <Link to="/dashboard" className="module-card green">
            <div className="module-card-body">
              <div className="module-icon green">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                </svg>
              </div>
              <div className="module-title">Control de productos</div>
              <div className="module-desc">Gestiona tu inventario y precios</div>
              <span className="module-arrow">→</span>
            </div>
          </Link>
        </div>

        <div className="info-card">
          <div className="info-card-icon">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <h3>Interfaz rápida</h3>
          <p>Diseñada para ser eficiente y sencilla de usar en todo momento</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
