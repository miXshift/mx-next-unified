'use client';

import { useEffect } from 'react';
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

const avatarSchema = isClient
  ? z
      .instanceof(File)
      .refine(file => file?.size <= MAX_FILE_SIZE, 'Max file size is 5MB.')
      .refine(
        file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
      .optional()
  : z.any().optional();

const profileFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  timezone: z.string().min(1, 'Please select your timezone'),
  avatar: avatarSchema,
  agreedToTerms: z.boolean().refine(val => val, 'You must agree to the terms'),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

// Define the timezone options
const timezoneOptions = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
];

// Define the form configuration
const profileFormConfig: FormConfig<ProfileFormData> = {
  id: 'profile-form',
  title: 'Create Profile',
  description: 'Tell us more about yourself',
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
      options: timezoneOptions,
    },
    {
      id: 'agreedToTerms',
      label: 'I agree to the Terms and Conditions',
      type: 'checkbox',
      required: true,
    },
  ],
  schema: profileFormSchema,
  submitButtonText: 'Save Profile',
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
