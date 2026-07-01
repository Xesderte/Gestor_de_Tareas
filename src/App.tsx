import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
