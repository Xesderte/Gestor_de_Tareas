import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <NavLink to="/" className="brand-logo">
          <span className="brand-icon">✓</span>
          <span className="brand-name">GestorTareas</span>
        </NavLink>
        
        <nav className="nav-menu">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            end
          >
            Inicio
          </NavLink>
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            >
              Mis Tareas
            </NavLink>
          )}
        </nav>

        <div className="auth-status-container">
          {user ? (
            <div className="user-profile-menu">
              <span className="user-welcome">
                Hola, <strong>{user.displayName || user.email.split('@')[0]}</strong>
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Salir
              </Button>
            </div>
          ) : (
            <div className="auth-actions">
              <NavLink to="/login" className="btn-link-login">
                Ingresar
              </NavLink>
              <NavLink to="/register" className="btn btn-primary btn-sm">
                Registrarse
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
