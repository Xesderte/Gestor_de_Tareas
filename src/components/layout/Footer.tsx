import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} GestorTareas. Todos los derechos reservados.</p>
        <p className="footer-credits">
          Desarrollado en React + TypeScript
        </p>
      </div>
    </footer>
  );
};
