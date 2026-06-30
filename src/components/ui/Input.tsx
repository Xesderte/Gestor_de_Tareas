import React from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseProps {
  label?: string;
  error?: string;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & {
  multiline?: false;
};

type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & {
  multiline: true;
  rows?: number;
};

export const Input: React.FC<InputProps | TextareaProps> = (props) => {
  const { label, error, multiline, className = '', id, ...rest } = props;
  const inputId = id || `input-${Math.random().toString(36).substring(2, 11)}`;
  const containerClass = `form-group ${error ? 'has-error' : ''} ${className}`;

  if (multiline) {
    const { rows = 3, ...textareaProps } = rest as TextareaHTMLAttributes<HTMLTextAreaElement> & { rows?: number };
    return (
      <div className={containerClass}>
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          className="form-control"
          rows={rows}
          {...textareaProps}
        />
        {error && <span className="error-message" role="alert">{error}</span>}
      </div>
    );
  }

  const inputProps = rest as InputHTMLAttributes<HTMLInputElement>;
  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className="form-control"
        {...inputProps}
      />
      {error && <span className="error-message" role="alert">{error}</span>}
    </div>
  );
};
