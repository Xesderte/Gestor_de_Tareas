export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  category: string;
  userId: string;
  createdAt: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues extends LoginFormValues {
  displayName: string;
  confirmPassword?: string;
}

export interface TaskFormValues {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  category: string;
}

export interface AuthValues {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (values: LoginFormValues) => Promise<void>;
  register: (values: RegisterFormValues) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}
