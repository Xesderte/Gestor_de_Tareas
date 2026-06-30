import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from './config';
import type { Task } from '../../types';

export const taskService = {
  getTasks: async (userId: string): Promise<Task[]> => {
    if (!db) throw new Error('Firestore is not initialized');
    const tasksRef = collection(db, 'tasks');
    const q = query(
      tasksRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      tasks.push({
        id: docSnap.id,
        title: data.title || '',
        description: data.description || '',
        status: data.status || 'pending',
        priority: data.priority || 'medium',
        dueDate: data.dueDate || '',
        category: data.category || 'General',
        userId: data.userId || '',
        createdAt: data.createdAt || new Date().toISOString(),
      } as Task);
    });
    return tasks;
  },

  addTask: async (
    taskData: Omit<Task, 'id' | 'createdAt' | 'userId' | 'status'>,
    userId: string
  ): Promise<Task> => {
    if (!db) throw new Error('Firestore is not initialized');
    const tasksRef = collection(db, 'tasks');
    const newTask = {
      ...taskData,
      status: 'pending' as const,
      userId,
      createdAt: new Date().toISOString(),
    };
    const docRef = await addDoc(tasksRef, newTask);
    return {
      ...newTask,
      id: docRef.id,
    } as Task;
  },

  updateTask: async (
    taskId: string,
    taskUpdates: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>
  ): Promise<void> => {
    if (!db) throw new Error('Firestore is not initialized');
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, taskUpdates);
  },

  deleteTask: async (taskId: string): Promise<void> => {
    if (!db) throw new Error('Firestore is not initialized');
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  },
};
