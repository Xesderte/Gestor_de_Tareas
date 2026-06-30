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

  const handleAddTaskSubmit = async (values: TaskFormValues) => {
    await addTask(values);
    setIsAddModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Mi Tablero</h2>
          <p className="dashboard-subtitle">Gestiona tus tareas y aumenta tu productividad</p>
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
