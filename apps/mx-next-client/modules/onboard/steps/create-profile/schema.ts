import * as z from 'zod';

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

export const profileFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  timezone: z.string().min(1, 'Please select your timezone'),
  avatar: avatarSchema,
  agreedToTerms: z.boolean().refine(val => val, 'You must agree to the terms'),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
