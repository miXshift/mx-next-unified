import * as z from 'zod';

export const amazonConnectionSchema = z.object({
  accountName: z
    .string()
    .min(1, 'Account name is required')
    .min(2, 'Account name must be at least 2 characters'),
  amazonEmail: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .regex(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Please enter a valid email format'
    )
    .transform(val => val.toLowerCase()),
  logoutConfirmed: z
    .union([z.boolean(), z.string()])
    .transform(val => !!val)
    .refine(val => val === true, 'You must confirm logging out of Amazon'),
});

export type AmazonConnectionSchema = z.infer<typeof amazonConnectionSchema>;
