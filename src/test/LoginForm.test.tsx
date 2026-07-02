import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginForm } from '../components/auth/LoginForm';
import { AuthProvider } from '../context/auth/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { authService } from '../services/firebase/authService';
import { Toaster } from 'react-hot-toast';

// 1. Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual as any,
    useNavigate: () => mockNavigate,
  };
});

// 2. Mock del módulo de authService
vi.mock('../services/firebase/authService');

// 3. Mock del factory para que devuelva nuestro authService mockeado
vi.mock('../services/serviceFactory', () => ({
  getAuthService: () => authService,
  getTaskService: () => ({}),
}));

describe('LoginForm Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('verifica que al enviar el form con éxito, se llama a authService.login y navega', async () => {
    // Configuramos el mock de login del objeto authService
    vi.mocked(authService.login).mockResolvedValue({
      uid: 'user-123',
      email: 'test@example.com',
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginForm onSuccess={() => mockNavigate('/dashboard')} />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('verifica que si authService.login falla, el componente muestra el error', async () => {
    const errorMessage = 'La contraseña es incorrecta.';
    vi.mocked(authService.login).mockRejectedValue(new Error(errorMessage));

    render(
      <MemoryRouter>
        <AuthProvider>
          <Toaster />
          <LoginForm onSuccess={() => mockNavigate('/dashboard')} />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});