import React, { useState } from 'react';
import type { Task, TaskFormValues } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { TodoForm } from './TodoForm';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>) => Promise<void>;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onUpdate,
  onDelete,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const getPriorityVariant = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const getPriorityLabel = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return priority;
    }
  };

  const isOverdue = () => {
    if (task.status === 'completed' || !task.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dueDate = new Date(task.dueDate + 'T23:59:59');
    return dueDate < today;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleEditSubmit = async (values: TaskFormValues) => {
    await onUpdate(task.id, values);
    setIsEditOpen(false);
  };

  return (
    <>
      <Card
        className={`task-item ${task.status === 'completed' ? 'task-completed' : ''} ${isOverdue() ? 'task-overdue' : ''}`}
        hoverable
      >
        <div className="task-item-layout">
          <div className="task-item-checkbox">
            <input
              type="checkbox"
              checked={task.status === 'completed'}
              onChange={() => onToggleStatus(task.id)}
              aria-label={`Marcar "${task.title}" como ${task.status === 'completed' ? 'pendiente' : 'completada'}`}
              className="task-checkbox"
            />
          </div>

          <div className="task-item-body">
            <div className="task-item-header">
              <h4 className="task-title">{task.title}</h4>
              <div className="task-badges">
                <Badge variant={getPriorityVariant(task.priority)}>
                  {getPriorityLabel(task.priority)}
                </Badge>
                <Badge variant="secondary">{task.category}</Badge>
              </div>
            </div>
            
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}

            <div className="task-item-meta">
              {task.dueDate && (
                <span className={`task-due-date ${isOverdue() ? 'text-danger overdue-warning' : ''}`}>
                  📅 Vence: {formatDate(task.dueDate)} {isOverdue() && ' (Vencida)'}
                </span>
              )}
            </div>
          </div>

          <div className="task-item-actions">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditOpen(true)}
              className="btn-task-edit"
              aria-label={`Editar ${task.title}`}
            >
              Editar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="btn-task-delete text-danger"
              aria-label={`Eliminar ${task.title}`}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Editar Tarea"
      >
        <TodoForm
          onSubmit={handleEditSubmit}
          initialTask={task}
          submitButtonText="Guardar Cambios"
        />
      </Modal>
    </>
  );
};
