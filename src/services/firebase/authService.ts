import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth } from './config';
import type { LoginFormValues, RegisterFormValues, User } from '../../types';

const mapFirebaseUser = (firebaseUser: FirebaseUser): User => {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email || '',
    displayName: firebaseUser.displayName || undefined,
  };
};

export const authService = {
  login: async (values: LoginFormValues): Promise<User> => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    return mapFirebaseUser(userCredential.user);
  },

  register: async (values: RegisterFormValues): Promise<User> => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
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
