'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createSupabaseClient } from '@/utils/create-supabase-client';
import z from 'zod';
import { getAuthConfirmUrl } from '@/utils/get-auth-confirm-url';

const nextschema = z.string().default('/');
const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  next: nextschema,
});

type ActionState = {
  message?: {
    type: 'success' | 'error';
    text: string;
  };
};

export async function login(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const validation = loginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    next: formData.get('next') ?? undefined,
  });

  if (validation.success === false) {
    return {
      message: {
        type: 'error',
        text: 'Invalid email or password',
      },
    };
  }

  const supabase = await createSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: validation.data.email,
    password: validation.data.password,
  });

  if (error == null) {
    revalidatePath('/', 'layout');
    redirect(validation.data.next);
  }

  if (error.code === 'invalid_credentials') {
    return {
      message: {
        type: 'error',
        text: 'Invalid email or password. Please try again.',
      },
    };
  }

  console.error('Unexpected error during login:', error);
  return {
    message: {
      type: 'error',
      text: 'An unexpected error occurred. Please try again later.',
    },
  };
}

export async function signup(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const validation = loginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    next: formData.get('next') ?? undefined,
  });

  if (validation.success === false) {
    return {
      message: {
        type: 'error',
        text: 'Invalid email or password',
      },
    };
  }

  const emailRedirectTo = getAuthConfirmUrl(validation.data.next);
  const supabase = await createSupabaseClient();
  const { error } = await supabase.auth.signUp({
    email: validation.data.email,
    password: validation.data.password,
    options: { emailRedirectTo },
  });

  if (error) {
    return {
      message: {
        type: 'error',
        text: `Failed to sign up: ${error.message}`,
      },
    };
  }

  return {
    message: {
      type: 'success',
      text: 'Sign up successful! Please check your email to confirm your account.',
    },
  };
}

export async function signInWithGoogle(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const next = nextschema.parse(formData.get('next') ?? undefined);
  const redirectTo = getAuthConfirmUrl(next);

  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  });

  if (error) {
    return {
      message: {
        type: 'error',
        text: `Failed to sign in with Google: ${error.message}`,
      },
    };
  }

  redirect(data.url);
}
