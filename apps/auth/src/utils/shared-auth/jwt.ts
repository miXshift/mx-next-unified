import { createClient } from '../supabase/server';

/**
 * Retrieves the current session access token from Supabase 
 * to be shared across apps
 */
export async function getSessionAccessToken(): Promise<string | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getSession();
    
    if (!data.session) {
      return null;
    }
    
    return data.session.access_token;
  } catch (error) {
    console.error('Error getting session access token:', error);
    return null;
  }
}

/**
 * Shared JWT secret configuration - this must be the same across all Supabase projects
 */
export function getJwtSecret(): string {
  if (!process.env.SUPABASE_JWT_SECRET) {
    throw new Error('SUPABASE_JWT_SECRET must be defined in environment variables');
  }
  return process.env.SUPABASE_JWT_SECRET;
}
