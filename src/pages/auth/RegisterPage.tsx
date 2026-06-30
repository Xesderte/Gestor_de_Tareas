import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { Card } from '../../components/ui/Card';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="auth-page-container">
      <Card className="auth-card">
        <h2 className="auth-title">Registrarse</h2>
        <p className="auth-subtitle">Crea una cuenta para organizar tus tareas</p>
        
        <RegisterForm onSuccess={handleSuccess} />
        
        <div className="auth-footer-link">
          ¿Ya tienes cuenta? <NavLink to="/login">Inicia sesión</NavLink>
        </div>
      </Card>
    </div>
  );
};
