import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
}) => {
  return <span className={`badge badge-${variant}`}>{children}</span>;
};
