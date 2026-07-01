import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthValues, LoginFormValues, RegisterFormValues, User } from '../../types';
import { getAuthService } from '../../services/serviceFactory';

export const AuthContext = createContext<AuthValues | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const authService = getAuthService();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [authService]);

  const login = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const loggedUser = await authService.login(values);
      setUser(loggedUser);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Error desconocido al iniciar sesión';
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (values: RegisterFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const registeredUser = await authService.register(values);
      setUser(registeredUser);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Error desconocido al registrar usuario';
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await authService.logout();
      setUser(null);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Error desconocido al cerrar sesión';
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};
