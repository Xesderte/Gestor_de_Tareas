import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './config';
import type { Task, TaskFormValues } from '../../types';

export const createTask = async (userId: string, data: TaskFormValues): Promise<void> => {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  const tasksRef = collection(db, 'tasks');
  await addDoc(tasksRef, {
    title: data.title,
    description: data.description,
    priority: data.priority,
    dueDate: data.dueDate,
    category: data.category,
    userId,
    status: 'pending',
    createdAt: new Date().toISOString(),
  });
};

export const updateTask = async (taskId: string, data: Partial<Task>): Promise<void> => {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  const taskRef = doc(db, 'tasks', taskId);
  
  // Create updates object without undefined fields or the id field to avoid issues
  const updates: Record<string, unknown> = {};
  if (data.title !== undefined) updates.title = data.title;
  if (data.description !== undefined) updates.description = data.description;
  if (data.status !== undefined) updates.status = data.status;
  if (data.priority !== undefined) updates.priority = data.priority;
  if (data.dueDate !== undefined) updates.dueDate = data.dueDate;
  if (data.category !== undefined) updates.category = data.category;
  if (data.userId !== undefined) updates.userId = data.userId;
  if (data.createdAt !== undefined) updates.createdAt = data.createdAt;

  await updateDoc(taskRef, updates);
};

export const deleteTask = async (taskId: string): Promise<void> => {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  const taskRef = doc(db, 'tasks', taskId);
  await deleteDoc(taskRef);
};

export const subscribeToUserTasks = (
  userId: string,
  callback: (tasks: Task[]) => void,
  onError?: (error: Error) => void
): (() => void) => {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  const tasksRef = collection(db, 'tasks');
  const q = query(tasksRef, where('userId', '==', userId));

  return onSnapshot(
    q,
    (snapshot) => {
      const tasksList: Task[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const task: Task = {
          id: docSnap.id,
          title: typeof data.title === 'string' ? data.title : '',
          description: typeof data.description === 'string' ? data.description : '',
          status: (data.status === 'completed' || data.status === 'pending') ? data.status : 'pending',
          priority: (data.priority === 'low' || data.priority === 'medium' || data.priority === 'high') ? data.priority : 'medium',
          dueDate: typeof data.dueDate === 'string' ? data.dueDate : '',
          category: typeof data.category === 'string' ? data.category : '',
          userId: typeof data.userId === 'string' ? data.userId : '',
          createdAt: typeof data.createdAt === 'string' ? data.createdAt : '',
        };
        tasksList.push(task);
      });
      callback(tasksList);
    },
    (error) => {
      if (onError) {
        onError(error);
      } else {
        console.error('Error onSnapshot in subscribeToUserTasks:', error);
      }
    }
  );
};
