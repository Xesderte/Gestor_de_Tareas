import { vi } from 'vitest';

export const authService = {
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  onAuthStateChanged: vi.fn((callback) => {
    callback(null);
    return () => { };
  }),
};