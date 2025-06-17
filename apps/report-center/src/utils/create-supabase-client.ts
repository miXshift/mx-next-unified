import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabaseCredentialsFromEnv } from './get-supabase-credentials-from-env';
import { getCookieOptionsFromEnv } from './get-cookie-options-from-env';

export async function createSupabaseClient() {
  const credentials = getSupabaseCredentialsFromEnv(process.env);
  const cookieOptions = getCookieOptionsFromEnv(process.env);
  const cookieStore = await cookies();

  return createServerClient(credentials.url, credentials.key, {
    cookieOptions,
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
