import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSharedAuthCookie, getJwtSecret } from '../shared-auth';

export async function createClient() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL == null) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined');
  }
  if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY == null) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined');
  }

  const cookieStore = await cookies();
  
  // Get the shared auth token from cookie if it exists
  const sharedAuthToken = await getSharedAuthCookie();
  
  if (
    process.env.COOKIE_OPTION_SAME_SITE != null &&
    process.env.COOKIE_OPTION_SAME_SITE !== 'lax' &&
    process.env.COOKIE_OPTION_SAME_SITE !== 'strict' &&
    process.env.COOKIE_OPTION_SAME_SITE !== 'none' &&
    process.env.COOKIE_OPTION_SAME_SITE !== 'yes'
  ) {
    throw new Error(
      'COOKIE_OPTION_SAME_SITE must be "lax", "strict" or "none"'
    );
  }

  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookieOptions: {
        path: process.env.COOKIE_OPTION_PATH,
        secure: process.env.COOKIE_OPTION_SECURE === 'yes',
        domain: process.env.COOKIE_OPTION_DOMAIN,
        sameSite:
          process.env.COOKIE_OPTION_SAME_SITE === 'yes'
            ? true
            : process.env.COOKIE_OPTION_SAME_SITE,
      },
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
    }
  );
  
  // If we have a shared auth token, set the session with JWT
  if (sharedAuthToken) {
    try {
      // Set the auth using the shared JWT token
      await client.auth.setSession({
        access_token: sharedAuthToken,
        refresh_token: '', // Not needed since we're using JWT auth
      });
    } catch (error) {
      console.error('Error setting session with shared auth token:', error);
    }
  }
  
  return client;
}
