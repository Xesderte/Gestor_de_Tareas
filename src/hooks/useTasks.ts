import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Task, TaskFormValues } from '../types';
import {
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
  subscribeToUserTasks,
} from '../services/firebase/firebaseTaskService';

export const useTasks = (userId: string | undefined) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'dueDateAsc' | 'dueDateDesc' | 'priorityHigh' | 'priorityLow'>('newest');

  // Real-time listener
  useEffect(() => {
    if (!userId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToUserTasks(
      userId,
      (fetchedTasks) => {
        setTasks(fetchedTasks);
        setLoading(false);
      },
      (err) => {
        setError(err.message || 'Error en la suscripción a Firestore');
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [userId]);

  // Operations wrapped in try/catch to set/reset errors
  const createTask = useCallback(
    async (data: TaskFormValues) => {
      if (!userId) return;
      setError(null);
      try {
        await apiCreateTask(userId, data);
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Error al crear la tarea';
        setError(errMsg);
        throw err;
      }
    },
    [userId]
  );

  const updateTask = useCallback(
    async (taskId: string, data: Partial<Task>) => {
      setError(null);
      try {
        await apiUpdateTask(taskId, data);
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Error al actualizar la tarea';
        setError(errMsg);
        throw err;
      }
    },
    []
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      setError(null);
      try {
        await apiDeleteTask(taskId);
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Error al eliminar la tarea';
        setError(errMsg);
        throw err;
      }
    },
    []
  );

  const toggleTaskStatus = useCallback(
    async (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      setError(null);
      try {
        await apiUpdateTask(taskId, { status: newStatus });
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Error al actualizar la tarea';
        setError(errMsg);
      }
    },
    [tasks]
  );

  const categories = useMemo(() => {
    const list = tasks.map((t) => t.category).filter(Boolean);
    return ['all', ...Array.from(new Set(list))];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((t) => t.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    if (categoryFilter !== 'all') {
      result = result.filter((t) => t.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      if (sortBy === 'dueDateAsc') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }

      if (sortBy === 'dueDateDesc') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }

      const priorityWeight = { high: 3, medium: 2, low: 1 };
      if (sortBy === 'priorityHigh') {
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }

      if (sortBy === 'priorityLow') {
        return priorityWeight[a.priority] - priorityWeight[b.priority];
      }

      return 0;
    });

    return result;
  }, [tasks, searchQuery, statusFilter, priorityFilter, categoryFilter, sortBy]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = total - completed;
    const highPriorityPending = tasks.filter(
      (t) => t.priority === 'high' && t.status === 'pending'
    ).length;

    return {
      total,
      completed,
      pending,
      highPriorityPending,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [tasks]);

  return {
    tasks: filteredTasks,
    allTasksCount: tasks.length,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,

    // UI and compatibility mappings
    addTask: createTask,
    toggleTaskStatus,
    categories,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    stats,
  };
};
