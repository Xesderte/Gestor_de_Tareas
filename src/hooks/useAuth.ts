import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import type { AuthValues } from '../types';

export const useAuth = (): AuthValues => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de un AuthProvider');
  }
  return context;
};
