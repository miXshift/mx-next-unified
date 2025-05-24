import { createBrowserClient } from '@supabase/ssr';
import { SHARED_AUTH_COOKIE_NAME } from '../shared-auth';

export function createClient() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL == null) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined');
  }
  if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY == null) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined');
  }

  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  // Get the shared auth token from cookie if it exists
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  };

  const sharedAuthToken = getCookie(SHARED_AUTH_COOKIE_NAME);
  
  // If we have a shared auth token, set the session with JWT
  if (sharedAuthToken) {
    // This is run client-side, so we can safely use a promise without await
    client.auth.setSession({
      access_token: sharedAuthToken,
      refresh_token: '', // Not needed since we're using JWT auth
    }).catch(error => {
      console.error('Error setting client session with shared auth token:', error);
    });
  }
  
  return client;
}
