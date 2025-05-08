import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL == null) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined');
  }
  if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY == null) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined');
  }

  const cookieStore = await cookies();

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

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookieOptions: {
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
}
