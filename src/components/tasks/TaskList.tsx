import React from 'react';
import type { Task } from '../../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggleStatus: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>) => Promise<void>;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  onToggleStatus,
  onUpdate,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="task-list-loading">
        <div className="loading-spinner"></div>
        <p>Cargando tus tareas...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <div className="empty-icon">📋</div>
        <h3>No hay tareas pendientes</h3>
        <p>Crea una nueva tarea o modifica los filtros de búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
