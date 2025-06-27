'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseClient } from '@/utils/create-supabase-client';
import z from 'zod';
import { getAuthConfirmUrl } from '@/utils/get-auth-confirm-url';

export type ActionState = {
  message?: {
    type: 'success' | 'error';
    text: string;
  };
};

const resetPasswordFormSchema = z.object({
  email: z.string().email(),
});

export async function requestPasswordReset(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const validation = resetPasswordFormSchema.safeParse({
    email: formData.get('email'),
  });

  if (validation.success === false) {
    return {
      message: {
        type: 'error',
        text: 'Please enter a valid email address',
      },
    };
  }

  const redirectTo = getAuthConfirmUrl('/update-password');

  const supabase = await createSupabaseClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    validation.data.email,
    { redirectTo }
  );

  if (error) {
    console.error('Password reset error:', error);
    return {
      message: {
        type: 'error',
        text: `Failed to send reset link: ${error.message}`,
      },
    };
  }

  revalidatePath('/auth/reset-password');

  return {
    message: {
      type: 'success',
      text: 'Check your email for the password reset link',
    },
  };
}
