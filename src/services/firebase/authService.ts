import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from './config';
import type { LoginFormValues, RegisterFormValues, User } from '../../types';

const mapFirebaseUser = (firebaseUser: FirebaseUser): User => {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email || '',
    displayName: firebaseUser.displayName || undefined,
  };
};

const translateAuthError = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'Este correo no está registrado.';
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'La contraseña es incorrecta.';
      case 'auth/email-already-in-use':
        return 'Este correo ya está registrado, no puedes utilizarlo.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      case 'auth/invalid-email':
        return 'El formato del correo no es válido.';
      case 'auth/network-request-failed':
        return 'Error de conexión. Verifica tu internet.';
      default:
        return error.message || 'Ocurrió un error inesperado durante la autenticación.';
    }
  }
  return error instanceof Error ? error.message : 'Ocurrió un error inesperado durante la autenticación.';
};

export const authService = {
  login: async (values: LoginFormValues): Promise<User> => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      return mapFirebaseUser(userCredential.user);
    } catch (error) {
      throw new Error(translateAuthError(error));
    }
  },

  register: async (values: RegisterFormValues): Promise<User> => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      
      if (values.displayName) {
        await updateProfile(userCredential.user, {
          displayName: values.displayName,
        });
      }
      
      await userCredential.user.reload();
      const updatedUser = auth.currentUser || userCredential.user;
      
      return mapFirebaseUser(updatedUser);
    } catch (error) {
      throw new Error(translateAuthError(error));
    }
  },

  logout: async (): Promise<void> => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    await signOut(auth);
  },

  onAuthStateChanged: (callback: (user: User | null) => void): (() => void) => {
    if (!auth) {
      return () => {};
    }
    return firebaseOnAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        callback(mapFirebaseUser(firebaseUser));
      } else {
        callback(null);
      }
    });
  },
};
