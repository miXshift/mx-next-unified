import { FormFieldConfig } from './types';

export const formFields: FormFieldConfig[] = [
  {
    id: 'companyName',
    label: 'Company Name',
    type: 'input',
    placeholder: 'Enter your company name',
    required: true,
  },
  {
    id: 'companyDisplayName',
    label: 'Company Display Name',
    type: 'input',
    placeholder: 'How should we display your company name?',
    required: true,
  },
  {
    id: 'companyType',
    label: 'Company Type',
    type: 'select',
    placeholder: 'Select Company Type',
    required: true,
    options: [
      { value: 'startup', label: 'Startup' },
      { value: 'enterprise', label: 'Enterprise' },
      { value: 'agency', label: 'Agency' },
      { value: 'other', label: 'Other' },
    ],
  },
];
