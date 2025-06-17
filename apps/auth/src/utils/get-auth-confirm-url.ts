import z from 'zod';

export function getAuthConfirmUrl(next = '/'): string {
  const origin = z.string().parse(process.env.AUTH_APP_URL);

  const redirectTo = `${origin}/auth/confirm?next=${encodeURIComponent(next)}`;

  return redirectTo;
}
