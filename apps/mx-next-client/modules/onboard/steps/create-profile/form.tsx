'use client';

import { useEffect } from 'react';
import { DynamicForm, FormConfig } from '@/lib/components/dynamic-form';
import { profileFormSchema } from './schema';
import type { ProfileFormData } from './types';
import { useOnboarding } from '../../onboard.context';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const profileFormConfig: FormConfig<ProfileFormData> = {
  id: 'profile-form',
  fields: [
    {
      id: 'avatar',
      label: 'Profile Picture',
      type: 'avatar',
      accept: ACCEPTED_IMAGE_TYPES.join(', '),
      helperText: 'Upload a profile picture (max 5MB)',
    },
    {
      id: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter your first name',
      required: true,
    },
    {
      id: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter your last name',
      required: true,
    },
    {
      id: 'displayName',
      label: 'Display Name',
      type: 'text',
      placeholder: 'How should we display your name?',
      required: true,
    },
    {
      id: 'jobTitle',
      label: 'Job Title',
      type: 'text',
      placeholder: 'e.g. Marketing Manager',
      required: true,
    },
    {
      id: 'timezone',
      label: 'Timezone',
      type: 'select',
      placeholder: 'Select your timezone',
      required: true,
      options: [
        { value: 'America/New_York', label: 'Eastern Time (ET)' },
        { value: 'America/Chicago', label: 'Central Time (CT)' },
        { value: 'America/Denver', label: 'Mountain Time (MT)' },
        { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
        { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
        { value: 'Europe/Paris', label: 'Central European Time (CET)' },
        { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
        { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
      ],
    },
    {
      id: 'agreedToTerms',
      label: 'I agree to the Terms and Conditions',
      type: 'checkbox',
      required: true,
    },
  ],
  schema: profileFormSchema,
  className: 'space-y-6',
  fieldClassName: 'space-y-2',
  hideSubmitButton: true,
};

interface ProfileFormProps {
  onValidationChange?: (isValid: boolean) => void;
}

export function ProfileForm({ onValidationChange }: ProfileFormProps) {
  const { formData, updateStepData } = useOnboarding();

  const handleSubmit = (data: ProfileFormData) => {
    updateStepData('create-profile', data);
  };

  return (
    <DynamicForm
      config={profileFormConfig}
      defaultValues={formData['create-profile']}
      onSubmit={handleSubmit}
      onValidationChange={onValidationChange}
    />
  );
}
