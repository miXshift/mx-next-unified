'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseClient } from '@/utils/create-supabase-client';
import z from 'zod';

type ActionState = {
  message?: {
    type: 'success' | 'error';
    text: string;
  };
};

const updatePasswordFormSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export async function updatePassword(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const validation = updatePasswordFormSchema.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (validation.success === false) {
    return {
      message: {
        type: 'error',
        text: validation.error.errors[0].message ?? 'Invalid password',
      },
    };
  }

  const supabase = await createSupabaseClient();

  const { error } = await supabase.auth.updateUser({
    password: validation.data.password,
  });

  if (error) {
    console.error('Error updating password:', error);
    return {
      message: {
        type: 'error',
        text: `Failed to update password: ${error.message}`,
      },
    };
  }

  revalidatePath('/update-password');

  return {
    message: {
      type: 'success',
      text: 'Your password has been updated successfully',
    },
  };
}
