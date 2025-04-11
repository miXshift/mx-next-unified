'use client';

import * as z from 'zod';
import { DynamicForm, FormConfig } from '..';
import { useOnboarding } from '../../../../modules/onboard/onboard.context';

// Define the form schema
const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const isClient = typeof window !== 'undefined';

const logoSchema = isClient
  ? z
      .instanceof(File)
      .refine(file => file?.size <= MAX_FILE_SIZE, 'Max file size is 5MB.')
      .refine(
        file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
      .optional()
  : z.any().optional();

const organizationFormSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  companyDisplayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters'),
  companyType: z.string().min(1, 'Please select a company type'),
  logo: logoSchema,
  agreedToTerms: z.boolean().refine(val => val, 'You must agree to the terms'),
});

type OrganizationFormData = z.infer<typeof organizationFormSchema>;

// Define the company type options
const companyTypeOptions = [
  { value: 'startup', label: 'Startup' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'agency', label: 'Agency' },
  { value: 'other', label: 'Other' },
];

// Define the form configuration
const organizationFormConfig: FormConfig<OrganizationFormData> = {
  id: 'organization-form',
  title: 'Organization Details',
  description: 'Set up your organization',
  fields: [
    {
      id: 'logo',
      label: 'Company Logo',
      type: 'avatar',
      accept: ACCEPTED_IMAGE_TYPES.join(', '),
      helperText: 'Upload a company logo (max 5MB)',
    },
    {
      id: 'companyName',
      label: 'Company Name',
      type: 'text',
      placeholder: 'Enter your company name',
      required: true,
    },
    {
      id: 'companyDisplayName',
      label: 'Company Display Name',
      type: 'text',
      placeholder: 'How should we display your company name?',
      required: true,
    },
    {
      id: 'companyType',
      label: 'Company Type',
      type: 'select',
      placeholder: 'Select Company Type',
      required: true,
      options: companyTypeOptions,
    },
    {
      id: 'agreedToTerms',
      label: 'I agree to the Terms and Conditions',
      type: 'checkbox',
      required: true,
    },
  ],
  schema: organizationFormSchema,
  submitButtonText: 'Save Organization',
};

interface OrganizationFormProps {
  onValidationChange?: (isValid: boolean) => void;
}

export function OrganizationForm({
  onValidationChange,
}: OrganizationFormProps) {
  const { formData, updateStepData } = useOnboarding();

  const handleSubmit = (data: OrganizationFormData) => {
    updateStepData('create-organization', data);
  };

  return (
    <DynamicForm
      config={organizationFormConfig}
      defaultValues={formData['create-organization']}
      onSubmit={handleSubmit}
      onValidationChange={onValidationChange}
    />
  );
}
