import React, { useEffect, useRef } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { LoginFormValues } from '../../types';
import toast from 'react-hot-toast';

interface LoginFormProps {
  onSuccess: () => void;
}

const validateForm = (values: LoginFormValues) => {
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
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, error: submitError, clearError } = useAuth();

  const form = useForm<LoginFormValues>({
    initialValues: { email: '', password: '' },
    validate: validateForm,
    onSubmit: async (values) => {
      try {
        await login(values);
        onSuccess();
      } catch (err: unknown) {
        // Handled reactively via submitError useEffect
      }
    },
  });

  const isErrorDisplayed = useRef(false);

  // Handle Firebase login errors reactively with toasts
  useEffect(() => {
    if (submitError) {
      if (!isErrorDisplayed.current) {
        toast.error(submitError, { duration: 3000 });
        isErrorDisplayed.current = true;
        clearError();
      }
    } else {
      isErrorDisplayed.current = false;
    }
  }, [submitError, clearError]);

  return (
    <form onSubmit={form.handleSubmit} className="auth-form">
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
