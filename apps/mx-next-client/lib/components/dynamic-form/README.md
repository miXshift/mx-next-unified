# Dynamic Form Module

A flexible and reusable form generation system that allows you to create forms from configuration objects.

## Features

- Generate forms from configuration objects
- Support for various field types (text, email, password, number, textarea, select, checkbox, radio, file, avatar, etc.)
- Built-in validation using Zod schemas
- Customizable styling
- Form state management with React Hook Form
- Responsive design
- Accessibility support

## Usage

### Basic Example

```tsx
import { DynamicForm, FormConfig } from '@/modules/dynamic-form';
import * as z from 'zod';

// Define your form schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  age: z.number().min(18, 'You must be at least 18 years old'),
});

type FormData = z.infer<typeof formSchema>;

// Define your form configuration
const formConfig: FormConfig<FormData> = {
  id: 'contact-form',
  title: 'Contact Information',
  description: 'Please provide your contact details',
  fields: [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter your name',
      required: true,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
    },
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      placeholder: 'Enter your age',
      required: true,
      min: 18,
    },
  ],
  schema: formSchema,
  submitButtonText: 'Submit',
};

// Use the DynamicForm component
export function ContactForm() {
  const handleSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  return <DynamicForm config={formConfig} onSubmit={handleSubmit} />;
}
```

### Supported Field Types

- `text`: Standard text input
- `email`: Email input
- `password`: Password input
- `number`: Number input
- `textarea`: Multi-line text input
- `select`: Dropdown select
- `multiselect`: Multiple selection dropdown
- `checkbox`: Single checkbox
- `radio`: Radio button group
- `date`: Date picker
- `time`: Time picker
- `datetime`: Date and time picker
- `file`: File upload
- `avatar`: Avatar/image upload with preview
- `toggle`: Toggle switch
- `custom`: Custom field rendering

### Form Configuration Options

The `FormConfig` interface provides the following options:

```typescript
interface FormConfig<T = any> {
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
}
```

### Field Configuration Options

Each field can be configured with the following options:

```typescript
interface FormFieldConfig<T = any> {
  id: keyof T;
  name?: string;
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
  accept?: string;
  multiple?: boolean;
  rows?: number;
  cols?: number;
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
  render?: (props: any) => ReactNode;
}
```

## Examples

Check the `examples` directory for more usage examples:

- `profile-form.tsx`: Example of a user profile form
- `organization-form.tsx`: Example of an organization details form
