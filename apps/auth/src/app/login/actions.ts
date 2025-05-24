'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const redirectUri = formData.get('redirectUri') ?? '/';
  if (typeof redirectUri !== 'string') {
    throw new Error('redirectUri is not a string');
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect(redirectUri);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const redirectUri = formData.get('redirectUri') as string | null;

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect(redirectUri || '/');
}

export async function signInWithGoogle(formData: FormData) {
  const origin = process.env.AUTH_APP_URL;
  if (origin == null) {
    throw new Error('AUTH_APP_URL is not set');
  }

  const redirectUri = formData.get('redirectUri') ?? '/';
  if (typeof redirectUri !== 'string') {
    throw new Error('redirectUri is not a string');
  }

  const redirectTo = `${origin}/auth/callback?redirectUri=${encodeURIComponent(
    redirectUri
  )}`;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    },
  });

  if (error) {
    redirect('/error');
  }

  redirect(data.url);
}
