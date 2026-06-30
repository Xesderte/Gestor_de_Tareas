import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Task } from '../types';
import { getTaskService } from '../services/serviceFactory';

export const useTasks = (userId: string | undefined) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'dueDateAsc' | 'dueDateDesc' | 'priorityHigh' | 'priorityLow'>('newest');

  const taskService = getTaskService();

  const fetchTasks = useCallback(async () => {
    if (!userId) {
      setTasks([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await taskService.getTasks(userId);
      setTasks(fetchedTasks);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Error al obtener las tareas';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, [userId, taskService]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'userId' | 'status'>) => {
    if (!userId) return;
    setError(null);
    try {
      const newTask = await taskService.addTask(taskData, userId);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Error al agregar la tarea';
      setError(errMsg);
      throw err;
    }
  };

  const toggleTaskStatus = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    
    setError(null);
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await taskService.updateTask(taskId, { status: newStatus });
    } catch (err: unknown) {
      // Revert optimistic update on failure
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: task.status } : t))
      );
      const errMsg = err instanceof Error ? err.message : 'Error al actualizar el estado de la tarea';
      setError(errMsg);
    }
  };

  const updateTask = async (
    taskId: string,
    updates: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>
  ) => {
    setError(null);
    const originalTasks = [...tasks];
    
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
    );

    try {
      await taskService.updateTask(taskId, updates);
    } catch (err: unknown) {
      // Revert on failure
      setTasks(originalTasks);
      const errMsg = err instanceof Error ? err.message : 'Error al actualizar la tarea';
      setError(errMsg);
      throw err;
    }
  };

  const deleteTask = async (taskId: string) => {
    setError(null);
    const originalTasks = [...tasks];

    // Optimistic update
    setTasks((prev) => prev.filter((t) => t.id !== taskId));

    try {
      await taskService.deleteTask(taskId);
    } catch (err: unknown) {
      // Revert on failure
      setTasks(originalTasks);
      const errMsg = err instanceof Error ? err.message : 'Error al eliminar la tarea';
      setError(errMsg);
    }
  };

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
    addTask,
    toggleTaskStatus,
    updateTask,
    deleteTask,
    refreshTasks: fetchTasks,
    stats,
  };
};
