import React from 'react';
import { Card } from '../ui/Card';

interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
    highPriorityPending: number;
    completionRate: number;
  };
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  return (
    <div className="task-stats-grid">
      <Card className="stat-card">
        <div className="stat-icon text-primary">📋</div>
        <div className="stat-info">
          <span className="stat-label">Total de Tareas</span>
          <h3 className="stat-value">{stats.total}</h3>
        </div>
      </Card>

      <Card className="stat-card">
        <div className="stat-icon text-success">✓</div>
        <div className="stat-info">
          <span className="stat-label">Completadas</span>
          <h3 className="stat-value">{stats.completed}</h3>
        </div>
        <div className="stat-progress-bar-container">
          <div className="stat-progress-bar">
            <div
              className="stat-progress-bar-fill"
              style={{ width: `${stats.completionRate}%` }}
            ></div>
          </div>
          <span className="stat-progress-bar-label">{stats.completionRate}%</span>
        </div>
      </Card>

      <Card className="stat-card">
        <div className="stat-icon text-warning">⏳</div>
        <div className="stat-info">
          <span className="stat-label">Pendientes</span>
          <h3 className="stat-value">{stats.pending}</h3>
        </div>
      </Card>

      <Card className={`stat-card ${stats.highPriorityPending > 0 ? 'border-danger-alert' : ''}`}>
        <div className="stat-icon text-danger">⚠️</div>
        <div className="stat-info">
          <span className="stat-label">Alta Prioridad Pendiente</span>
          <h3 className={`stat-value ${stats.highPriorityPending > 0 ? 'text-danger' : ''}`}>
            {stats.highPriorityPending}
          </h3>
        </div>
      </Card>
    </div>
  );
};
