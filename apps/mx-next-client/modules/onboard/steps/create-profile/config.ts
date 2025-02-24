import { FormFieldConfig } from './types';

export const formFields: FormFieldConfig[] = [
  {
    id: 'firstName',
    label: 'First Name',
    placeholder: 'Enter your first name',
    required: true,
  },
  {
    id: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter your last name',
    required: true,
  },
  {
    id: 'displayName',
    label: 'Display Name',
    placeholder: 'How should we display your name?',
    required: true,
  },
  {
    id: 'jobTitle',
    label: 'Job Title',
    placeholder: 'e.g. Marketing Manager',
    required: true,
  },
  {
    id: 'timezone',
    label: 'Timezone',
    placeholder: 'Select your timezone',
    required: true,
  },
];
