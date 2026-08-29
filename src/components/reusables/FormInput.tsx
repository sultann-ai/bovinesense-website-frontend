import React from 'react';
import { UseFormRegister, UseFormRegisterReturn, FieldError, RegisterOptions } from 'react-hook-form';

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  multiline?: boolean;
  className?: string;
  register?: UseFormRegister<any> | UseFormRegisterReturn;
  error?: FieldError;
  validation?: RegisterOptions;
  // For non-react-hook-form usage
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormInputProps
>(({
  label,
  id,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  rows = 3,
  multiline = false,
  className = '',
  register,
  error,
  validation,
  value,
  onChange
}, ref) => {
  const baseInputClasses = `w-full px-3 py-2 border ${
    error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
  } rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`;

  // Combine default validation with custom validation
  const finalValidationRules: RegisterOptions = {
    ...(validation || {}),
    ...(required ? { required: `${label} is required` } : {})
  };

  const registerProps = typeof register === 'function'
    ? register(id, finalValidationRules)
    : register || {};

  const inputProps = register 
    ? registerProps
    : { value, onChange };

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={baseInputClasses}
          ref={ref as React.RefObject<HTMLTextAreaElement>}
          {...inputProps}
        />
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          className={baseInputClasses}
          ref={ref as React.RefObject<HTMLInputElement>}
          {...inputProps}
        />
      )}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
