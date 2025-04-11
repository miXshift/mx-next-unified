import { ZodSchema } from 'zod';
import { ReactNode } from 'react';

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'time'
  | 'datetime'
  | 'file'
  | 'avatar'
  | 'toggle'
  | 'custom';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormFieldConfig<T = any> {
  id: keyof T;
  name?: string; // Optional name if different from id
  label: string;
  type: FieldType;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  defaultValue?: any;
  options?: SelectOption[];
  min?: number;
  max?: number;
  step?: number;
  accept?: string; // For file inputs
  multiple?: boolean; // For file inputs or multiselect
  rows?: number; // For textarea
  cols?: number; // For textarea
  className?: string;
  validation?: {
    required?: string;
    min?: { value: number; message: string };
    max?: { value: number; message: string };
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  };
  dependencies?: Array<{
    field: string;
    value: any;
    action: 'show' | 'hide' | 'enable' | 'disable' | 'require' | 'unrequire';
  }>;
  render?: (props: any) => ReactNode; // For custom field rendering
}

export interface FormConfig<T = any> {
  id: string;
  title?: string;
  description?: string;
  fields: FormFieldConfig<T>[];
  schema: ZodSchema;
  onSubmit?: (data: T) => void | Promise<void>;
  submitButtonText?: string;
  cancelButtonText?: string;
  showReset?: boolean;
  resetButtonText?: string;
  layout?: 'vertical' | 'horizontal' | 'inline';
  className?: string;
  fieldClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  submitButtonClassName?: string;
  cancelButtonClassName?: string;
  resetButtonClassName?: string;
  hideSubmitButton?: boolean;
}

export interface DynamicFormProps<T = any> {
  config: FormConfig<T>;
  defaultValues?: Partial<T>;
  onSubmit?: (data: T) => void | Promise<void>;
  onCancel?: () => void;
  onValidationChange?: (isValid: boolean) => void;
  isLoading?: boolean;
  className?: string;
}
