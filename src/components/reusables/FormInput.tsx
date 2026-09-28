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
  // UI-kit input on cream: hairline border, 14px radius, terracotta border on focus.
  const baseInputClasses = `w-full px-4 py-3 border ${
    error ? 'border-danger' : 'border-hairline'
  } rounded-[14px] bg-cream text-body text-charcoal placeholder:text-ink focus:border-terracotta disabled:opacity-60`;

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
      <label htmlFor={id} className="block text-small font-semibold text-charcoal mb-2">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
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
        <p className="text-danger text-small mt-2">{error.message}</p>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
