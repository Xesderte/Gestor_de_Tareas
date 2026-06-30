import React from 'react';
import { useForm } from '../../hooks/useForm';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import type { TaskFormValues, Task } from '../../types';

interface TodoFormProps {
  onSubmit: (values: TaskFormValues) => void | Promise<void>;
  initialTask?: Task;
  submitButtonText?: string;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  initialTask,
  submitButtonText,
}) => {
  const form = useForm<TaskFormValues>({
    initialValues: {
      title: initialTask?.title || '',
      description: initialTask?.description || '',
      priority: initialTask?.priority || 'medium',
      dueDate: initialTask?.dueDate || '',
      category: initialTask?.category || 'General',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof TaskFormValues, string>> = {};
      if (!values.title.trim()) {
        errors.title = 'El título de la tarea es requerido';
      } else if (values.title.trim().length < 3) {
        errors.title = 'El título debe tener al menos 3 caracteres';
      }
      if (!values.dueDate) {
        errors.dueDate = 'La fecha de vencimiento es requerida';
      }
      if (!values.category.trim()) {
        errors.category = 'La categoría es requerida';
      }
      return errors;
    },
    onSubmit: async (values) => {
      await onSubmit(values);
      if (!initialTask) {
        form.resetForm();
      }
    },
  });

  const priorityOptions = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' },
  ];

  return (
    <form onSubmit={form.handleSubmit} className="todo-form">
      <Input
        label="Título"
        type="text"
        name="title"
        value={form.values.title}
        onChange={form.handleChange}
        error={form.errors.title}
        placeholder="Ej: Comprar alimentos"
        required
      />

      <Input
        label="Descripción"
        multiline
        name="description"
        value={form.values.description}
        onChange={form.handleChange}
        error={form.errors.description}
        placeholder="Detalles sobre la tarea..."
      />

      <div className="form-row">
        <Select
          label="Prioridad"
          name="priority"
          value={form.values.priority}
          onChange={form.handleChange}
          error={form.errors.priority}
          options={priorityOptions}
          className="form-col"
        />

        <Input
          label="Vencimiento"
          type="date"
          name="dueDate"
          value={form.values.dueDate}
          onChange={form.handleChange}
          error={form.errors.dueDate}
          className="form-col"
          required
        />
      </div>

      <Input
        label="Categoría"
        type="text"
        name="category"
        value={form.values.category}
        onChange={form.handleChange}
        error={form.errors.category}
        placeholder="Ej: Trabajo, Casa, Estudio"
        required
      />

      <div className="form-actions">
        <Button
          type="submit"
          disabled={form.isSubmitting}
          className="btn-submit-task"
          fullWidth
        >
          {form.isSubmitting
            ? 'Guardando...'
            : submitButtonText || (initialTask ? 'Actualizar Tarea' : 'Crear Tarea')}
        </Button>
      </div>
    </form>
  );
};
