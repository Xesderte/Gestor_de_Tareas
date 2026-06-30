import { firebaseEnabled } from './firebase/config';
import { authService as firebaseAuthService } from './firebase/authService';
import { taskService as firebaseTaskService } from './firebase/taskService';
import { storageService } from './api/storageService';

if (firebaseEnabled) {
  console.log('Task Manager: Running in Firebase Mode (Firestore & Auth)');
} else {
  console.warn(
    'Task Manager: Firebase environment keys not found. Falling back to LocalStorage Mode.'
  );
}

export const getAuthService = () => {
  return firebaseEnabled ? firebaseAuthService : storageService;
};

export const getTaskService = () => {
  return firebaseEnabled ? firebaseTaskService : storageService;
};
