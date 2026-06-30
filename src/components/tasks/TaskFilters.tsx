import React from 'react';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';

interface TaskFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: 'all' | 'completed' | 'pending';
  setStatusFilter: (status: 'all' | 'completed' | 'pending') => void;
  priorityFilter: 'all' | 'low' | 'medium' | 'high';
  setPriorityFilter: (priority: 'all' | 'low' | 'medium' | 'high') => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: string[];
  sortBy: 'newest' | 'dueDateAsc' | 'dueDateDesc' | 'priorityHigh' | 'priorityLow';
  setSortBy: (sort: 'newest' | 'dueDateAsc' | 'dueDateDesc' | 'priorityHigh' | 'priorityLow') => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
  categories,
  sortBy,
  setSortBy,
}) => {
  const priorityOptions = [
    { value: 'all', label: 'Todas las prioridades' },
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Creado: más reciente' },
    { value: 'dueDateAsc', label: 'Vencimiento: más cercano' },
    { value: 'dueDateDesc', label: 'Vencimiento: más lejano' },
    { value: 'priorityHigh', label: 'Prioridad: Alta → Baja' },
    { value: 'priorityLow', label: 'Prioridad: Baja → Alta' },
  ];

  return (
    <div className="task-filters-panel">
      <div className="filters-search-bar">
        <Input
          type="text"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por título o descripción..."
          className="search-input"
        />
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label className="form-label">Estado</label>
          <div className="btn-group">
            <button
              type="button"
              className={`btn-filter ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              Todos
            </button>
            <button
              type="button"
              className={`btn-filter ${statusFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setStatusFilter('pending')}
            >
              Pendientes
            </button>
            <button
              type="button"
              className={`btn-filter ${statusFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setStatusFilter('completed')}
            >
              Completadas
            </button>
          </div>
        </div>

        <Select
          label="Prioridad"
          name="priorityFilter"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as 'all' | 'low' | 'medium' | 'high')}
          options={priorityOptions}
          className="filter-select"
        />

        <Select
          label="Categoría"
          name="categoryFilter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          options={[
            { value: 'all', label: 'Todas las categorías' },
            ...categories
              .filter((c) => c !== 'all')
              .map((c) => ({ value: c, label: c })),
          ]}
          className="filter-select"
        />

        <Select
          label="Ordenar por"
          name="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'newest' | 'dueDateAsc' | 'dueDateDesc' | 'priorityHigh' | 'priorityLow')}
          options={sortOptions}
          className="filter-select"
        />
      </div>
    </div>
  );
};
