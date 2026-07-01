import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../hooks/useTasks';
import { TaskStats } from '../../components/tasks/TaskStats';
import { TaskFilters } from '../../components/tasks/TaskFilters';
import { TaskList } from '../../components/tasks/TaskList';
import { TodoForm } from '../../components/tasks/TodoForm';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import type { TaskFormValues } from '../../types';
import toast from 'react-hot-toast';
import { sendNotificationEmail } from '../../services/api/emailService';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const {
    tasks,
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
    stats,
  } = useTasks(user?.uid);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sendingReport, setSendingReport] = useState(false);

  const handleSendReport = async () => {
    if (!user?.email) {
      toast.error('El usuario no tiene una dirección de correo configurada.');
      return;
    }

    setSendingReport(true);
    const toastId = toast.loading('Enviando reporte...');

    const subject = `Resumen de Tareas de ${user.displayName || user.email}`;
    const text = `Hola ${user.displayName || 'Usuario'},

Aquí tienes el resumen actual de tus tareas en el Gestor de Tareas:

- Total de tareas: ${stats.total}
- Tareas completadas: ${stats.completed}
- Tareas pendientes: ${stats.pending}
- Tareas pendientes de alta prioridad: ${stats.highPriorityPending}
- Tasa de finalización: ${stats.completionRate}%

¡Sigue trabajando duro y aumentando tu productividad!

Saludos,
El equipo de Gestor de Tareas.`;

    try {
      await sendNotificationEmail(user.email, subject, text);
      toast.success('Reporte enviado correctamente', { id: toastId });
    } catch (err: unknown) {
      console.error(err);
      toast.error('Error al enviar el reporte', { id: toastId });
    } finally {
      setSendingReport(false);
    }
  };

  const handleAddTaskSubmit = async (values: TaskFormValues) => {
    await addTask(values);
    setIsAddModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 className="dashboard-title" style={{ margin: 0 }}>Mi Tablero</h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSendReport}
              disabled={sendingReport}
              className="btn-send-report"
            >
              📧 Enviar Reporte
            </Button>
          </div>
          <p className="dashboard-subtitle" style={{ margin: 0 }}>Gestiona tus tareas y aumenta tu productividad</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="btn-add-task-trigger"
        >
          ➕ Nueva Tarea
        </Button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <TaskStats stats={stats} />

      <TaskFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="task-list-section">
        <h3 className="section-title-small">
          Tareas del Tablero ({tasks.length})
        </h3>
        <TaskList
          tasks={tasks}
          loading={loading}
          onToggleStatus={toggleTaskStatus}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Crear Nueva Tarea"
      >
        <TodoForm onSubmit={handleAddTaskSubmit} />
      </Modal>
    </div>
  );
};
