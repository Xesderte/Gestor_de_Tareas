import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/Card';

export const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="home-page-container">
      <section className="hero-section">
        <h1 className="hero-title">Organiza tu vida, <br />una tarea a la vez</h1>
        <p className="hero-subtitle">
          El Gestor de Tareas definitivo que te ayuda a mantenerte enfocado,
          organizado y productivo. Controla tus actividades diarias con facilidad.
        </p>
        
        <div className="hero-cta-container">
          {user ? (
            <NavLink to="/dashboard" className="btn btn-primary btn-lg">
              Ir a mi Tablero
            </NavLink>
          ) : (
            <div className="hero-buttons">
              <NavLink to="/register" className="btn btn-primary btn-lg">
                Comenzar Gratis
              </NavLink>
              <NavLink to="/login" className="btn btn-outline btn-lg">
                Iniciar Sesión
              </NavLink>
            </div>
          )}
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Características Principales</h2>
        
        <div className="features-grid">
          <Card className="feature-card" hoverable>
            <div className="feature-icon">⚡</div>
            <h3>Rápido e Intuitivo</h3>
            <p>
              Crea, edita y gestiona tus tareas en segundos con una interfaz moderna y fluida.
            </p>
          </Card>

          <Card className="feature-card" hoverable>
            <div className="feature-icon">📊</div>
            <h3>Métricas en Tiempo Real</h3>
            <p>
              Monitorea tu productividad con indicadores de avance y tareas de alta prioridad.
            </p>
          </Card>

          <Card className="feature-card" hoverable>
            <div className="feature-icon">🔍</div>
            <h3>Filtros Avanzados</h3>
            <p>
              Busca y ordena por categorías, estados y prioridades para encontrar lo que necesitas.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};
