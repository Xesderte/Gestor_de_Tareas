import React, { useEffect, useRef } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { RegisterFormValues } from '../../types';
import toast from 'react-hot-toast';

interface RegisterFormProps {
  onSuccess: () => void;
}

const validateForm = (values: RegisterFormValues) => {
  const errors: Partial<Record<keyof RegisterFormValues, string>> = {};
  if (!values.displayName) {
    errors.displayName = 'El nombre es requerido';
  }
  if (!values.email) {
    errors.email = 'El correo electrónico es requerido';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'El formato del correo electrónico no es válido';
  }
  if (!values.password) {
    errors.password = 'La contraseña es requerida';
  } else {
    if (values.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = 'La contraseña debe tener al menos una letra mayúscula';
    } else if (!/[0-9]/.test(values.password)) {
      errors.password = 'La contraseña debe tener al menos un número';
    } else if (!/[^A-Za-z0-9]/.test(values.password)) {
      errors.password = 'La contraseña debe tener al menos un carácter especial';
    }
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }
  return errors;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { register, error: submitError, clearError } = useAuth();

  const form = useForm<RegisterFormValues>({
    initialValues: { displayName: '', email: '', password: '', confirmPassword: '' },
    validate: validateForm,
    onSubmit: async (values) => {
      try {
        await register(values);
        onSuccess();
      } catch (err: unknown) {
        // Handled reactively via submitError useEffect
      }
    },
  });

  const isErrorDisplayed = useRef(false);

  // Handle Firebase registration errors reactively with toasts
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
        label="Nombre"
        type="text"
        name="displayName"
        value={form.values.displayName}
        onChange={form.handleChange}
        error={form.errors.displayName}
        placeholder="Juan Pérez"
        required
      />
      
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
        autoComplete="new-password"
        required
      />

      <Input
        label="Confirmar Contraseña"
        type="password"
        name="confirmPassword"
        value={form.values.confirmPassword}
        onChange={form.handleChange}
        error={form.errors.confirmPassword}
        placeholder="******"
        autoComplete="new-password"
        required
      />

      <Button
        type="submit"
        fullWidth
        disabled={form.isSubmitting}
        className="btn-auth-submit"
      >
        {form.isSubmitting ? 'Cargando...' : 'Crear Cuenta'}
      </Button>
    </form>
  );
};
