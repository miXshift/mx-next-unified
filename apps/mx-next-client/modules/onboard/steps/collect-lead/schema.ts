import * as z from 'zod';

export const leadFormSchema = z.object({
  source: z.string({
    required_error: 'Please select how you heard about us',
  }),
  sourceOther: z
    .string()
    .optional()
    .refine(val => {
      if (val === undefined) return true;
      return val.trim().length > 0;
    }, 'Please specify how you heard about us'),
  companySize: z.string({
    required_error: 'Please select your company size',
  }),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  requirements: z
    .string()
    .min(10, 'Please provide more details about your requirements'),
  industry: z.string({
    required_error: 'Please select your industry',
  }),
});

export type LeadFormSchema = z.infer<typeof leadFormSchema>;
