import * as z from 'zod';

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

export const organizationFormSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  companyDisplayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters'),
  companyType: z.string().min(1, 'Please select a company type'),
  logo: logoSchema,
  agreedToTerms: z.boolean().refine(val => val, 'You must agree to the terms'),
});

export type OrganizationFormSchema = z.infer<typeof organizationFormSchema>;
