import React, { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { clearError } = useAuth();

  useEffect(() => {
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="auth-page-container">
      <Card className="auth-card">
        <h2 className="auth-title">Ingresar</h2>
        <p className="auth-subtitle">Ingresa tus datos para acceder a tu cuenta</p>
        
        <LoginForm onSuccess={handleSuccess} />
        
        <div className="auth-footer-link">
          ¿No tienes cuenta? <NavLink to="/register">Regístrate aquí</NavLink>
        </div>
      </Card>
    </div>
  );
};
