'use client';

import { DynamicForm, FormConfig } from '@/lib/components/dynamic-form';
import { organizationFormSchema } from './schema';
import type { OrganizationFormData } from './types';
import { useOnboarding } from '../../onboard.context';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const organizationFormConfig: FormConfig<OrganizationFormData> = {
  id: 'organization-form',
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
      options: [
        { value: 'startup', label: 'Startup' },
        { value: 'enterprise', label: 'Enterprise' },
        { value: 'agency', label: 'Agency' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      id: 'agreedToTerms',
      label: 'I agree to the Terms and Conditions',
      type: 'checkbox',
      required: true,
    },
  ],
  schema: organizationFormSchema,
  className: 'space-y-6',
  fieldClassName: 'space-y-2',
  hideSubmitButton: true,
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
