import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { RegisterFormValues } from '../../types';

interface RegisterFormProps {
  onSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { register } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    initialValues: { displayName: '', email: '', password: '', confirmPassword: '' },
    validate: (values) => {
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
      } else if (values.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres';
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
      }
      return errors;
    },
    onSubmit: async (values) => {
      setSubmitError(null);
      try {
        await register(values);
        onSuccess();
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Error al registrar usuario';
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
