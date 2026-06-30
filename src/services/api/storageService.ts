import type { LoginFormValues, RegisterFormValues, User, Task } from '../../types';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const USERS_KEY = 'task_manager_users';
const TASKS_KEY = 'task_manager_tasks';
const SESSION_KEY = 'task_manager_current_user';

let authListeners: Array<(user: User | null) => void> = [];

const triggerAuthListeners = (user: User | null) => {
  authListeners.forEach((listener) => listener(user));
};

export const storageService = {
  // --- AUTH METHODS ---
  login: async (values: LoginFormValues): Promise<User> => {
    await delay();
    const usersJson = localStorage.getItem(USERS_KEY);
    const users: Array<User & { password?: string }> = usersJson ? JSON.parse(usersJson) : [];
    
    const user = users.find(
      (u) => u.email.toLowerCase() === values.email.toLowerCase() && u.password === values.password
    );
    
    if (!user) {
      throw new Error('Credenciales incorrectas o usuario no registrado');
    }
    
    const sessionUser: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    triggerAuthListeners(sessionUser);
    return sessionUser;
  },

  register: async (values: RegisterFormValues): Promise<User> => {
    await delay();
    const usersJson = localStorage.getItem(USERS_KEY);
    const users: Array<User & { password?: string }> = usersJson ? JSON.parse(usersJson) : [];
    
    const emailExists = users.some(
      (u) => u.email.toLowerCase() === values.email.toLowerCase()
    );
    
    if (emailExists) {
      throw new Error('El correo electrónico ya está registrado');
    }
    
    const newUser = {
      uid: 'local_' + Math.random().toString(36).substring(2, 11),
      email: values.email,
      displayName: values.displayName,
      password: values.password,
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    const sessionUser: User = {
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName,
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    triggerAuthListeners(sessionUser);
    return sessionUser;
  },

  logout: async (): Promise<void> => {
    await delay();
    localStorage.removeItem(SESSION_KEY);
    triggerAuthListeners(null);
  },

  onAuthStateChanged: (callback: (user: User | null) => void): (() => void) => {
    authListeners.push(callback);
    
    const sessionUserJson = localStorage.getItem(SESSION_KEY);
    if (sessionUserJson) {
      try {
        const sessionUser = JSON.parse(sessionUserJson) as User;
        callback(sessionUser);
      } catch {
        callback(null);
      }
    } else {
      callback(null);
    }
    
    return () => {
      authListeners = authListeners.filter((listener) => listener !== callback);
    };
  },

  // --- TASK METHODS ---
  getTasks: async (userId: string): Promise<Task[]> => {
    await delay();
    const tasksJson = localStorage.getItem(TASKS_KEY);
    const tasks: Task[] = tasksJson ? JSON.parse(tasksJson) : [];
    return tasks
      .filter((t) => t.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  addTask: async (
    taskData: Omit<Task, 'id' | 'createdAt' | 'userId' | 'status'>,
    userId: string
  ): Promise<Task> => {
    await delay();
    const tasksJson = localStorage.getItem(TASKS_KEY);
    const tasks: Task[] = tasksJson ? JSON.parse(tasksJson) : [];
    
    const newTask: Task = {
      ...taskData,
      id: 'task_' + Math.random().toString(36).substring(2, 11),
      status: 'pending',
      userId,
      createdAt: new Date().toISOString(),
    };
    
    tasks.push(newTask);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return newTask;
  },

  updateTask: async (
    taskId: string,
    taskUpdates: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>
  ): Promise<void> => {
    await delay();
    const tasksJson = localStorage.getItem(TASKS_KEY);
    if (!tasksJson) return;
    
    const tasks: Task[] = JSON.parse(tasksJson);
    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, ...taskUpdates };
      }
      return t;
    });
    
    localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await delay();
    const tasksJson = localStorage.getItem(TASKS_KEY);
    if (!tasksJson) return;
    
    const tasks: Task[] = JSON.parse(tasksJson);
    const filteredTasks = tasks.filter((t) => t.id !== taskId);
    
    localStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks));
  },
};
