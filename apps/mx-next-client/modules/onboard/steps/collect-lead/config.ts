import { FormFieldConfig } from './types';

export const formFields: FormFieldConfig[] = [
  {
    id: 'source',
    label: 'How did you hear about us?',
    type: 'select',
    required: true,
    options: [
      { value: 'linkedin', label: 'LinkedIn' },
      { value: 'google', label: 'Google Search' },
      { value: 'referral', label: 'Referral' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    id: 'companySize',
    label: 'Company Size',
    type: 'radio',
    required: true,
    options: [
      { value: '1-10', label: '1-10 employees' },
      { value: '11-50', label: '11-50 employees' },
      { value: '51-200', label: '51-200 employees' },
      { value: '201+', label: '201+ employees' },
    ],
  },
  {
    id: 'role',
    label: 'Your Role',
    type: 'input',
    required: true,
    placeholder: 'e.g. Marketing Manager',
  },
  {
    id: 'requirements',
    label: 'Business Requirements',
    type: 'textarea',
    required: true,
    placeholder: 'Tell us about your business needs...',
    description: 'What are your main business challenges?',
  },
  {
    id: 'industry',
    label: 'Industry',
    type: 'select',
    required: true,
    options: [
      { value: 'tech', label: 'Technology' },
      { value: 'retail', label: 'Retail' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'finance', label: 'Finance' },
      { value: 'other', label: 'Other' },
    ],
  },
];
