'use server';

import { encodedRedirect } from '@utils/uri';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  // const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      'error',
      '/sign-up',
      'Email and password are required'
    );
  }

  // send request to server
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // send request to server

  return redirect('/protected');
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl')?.toString();

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required');
  }

  // send request to server

  // if (error) {
  //   console.error(error.message);
  //   return encodedRedirect(
  //     "error",
  //     "/forgot-password",
  //     "Could not reset password",
  //   );
  // }

  // if (callbackUrl) {
  //   return redirect(callbackUrl);
  // }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.'
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Passwords do not match'
    );
  }

  // send request to server

  // if (error) {
  //   encodedRedirect(
  //     "error",
  //     "/protected/reset-password",
  //     "Password update failed",
  //   );
  // }

  encodedRedirect('success', '/protected/reset-password', 'Password updated');
};

export const signOutAction = async () => {
  return redirect('/sign-in');
};
