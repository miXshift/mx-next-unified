import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL == null) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined');
  }
  if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY == null) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined');
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
