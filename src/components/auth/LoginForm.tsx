import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { LoginFormValues } from '../../types';

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    initialValues: { email: '', password: '' },
    validate: (values) => {
      const errors: Partial<Record<keyof LoginFormValues, string>> = {};
      if (!values.email) {
        errors.email = 'El correo electrónico es requerido';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'El formato del correo electrónico no es válido';
      }
      if (!values.password) {
        errors.password = 'La contraseña es requerida';
      } else if (values.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres';
      }
      return errors;
    },
    onSubmit: async (values) => {
      setSubmitError(null);
      try {
        await login(values);
        onSuccess();
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Error al iniciar sesión';
        setSubmitError(errMsg);
      }
    },
  });

  return (
    <form onSubmit={form.handleSubmit} className="auth-form">
      {submitError && (
        <div className="alert alert-danger" role="alert">
          {submitError}
        </div>
      )}
      
      <Input
        label="Correo Electrónico"
        type="email"
        name="email"
        value={form.values.email}
        onChange={form.handleChange}
        error={form.errors.email}
        placeholder="ejemplo@correo.com"
        autoComplete="email"
        required
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        value={form.values.password}
        onChange={form.handleChange}
        error={form.errors.password}
        placeholder="******"
        autoComplete="current-password"
        required
      />

      <Button
        type="submit"
        fullWidth
        disabled={form.isSubmitting}
        className="btn-auth-submit"
      >
        {form.isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
};
