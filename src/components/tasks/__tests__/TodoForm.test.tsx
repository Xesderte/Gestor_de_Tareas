import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TodoForm } from '../TodoForm';

describe('TodoForm Component', () => {
  it('renders all form fields', () => {
    const mockSubmit = vi.fn();
    render(<TodoForm onSubmit={mockSubmit} />);

    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prioridad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Vencimiento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoría/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear Tarea/i })).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty', async () => {
    const mockSubmit = vi.fn();
    render(<TodoForm onSubmit={mockSubmit} />);

    const submitBtn = screen.getByRole('button', { name: /Crear Tarea/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/El título de la tarea es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/La fecha de vencimiento es requerida/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();

    const titleInput = screen.getByLabelText(/Título/i);
    fireEvent.change(titleInput, { target: { value: 'ab' } });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/El título debe tener al menos 3 caracteres/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('submits form with correct values when valid', async () => {
    const mockSubmit = vi.fn();
    render(<TodoForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Lavar ropa' } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Ropa blanca con jabón suave' } });
    fireEvent.change(screen.getByLabelText(/Prioridad/i), { target: { value: 'low' } });
    fireEvent.change(screen.getByLabelText(/Vencimiento/i), { target: { value: '2026-07-05' } });
    fireEvent.change(screen.getByLabelText(/Categoría/i), { target: { value: 'Casa' } });

    const submitBtn = screen.getByRole('button', { name: /Crear Tarea/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Lavar ropa',
      description: 'Ropa blanca con jabón suave',
      priority: 'low',
      dueDate: '2026-07-05',
      category: 'Casa',
    });
  });
});
