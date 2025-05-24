/**
 * Shared JWT secret configuration - this must be the same across all Supabase projects
 */
export function getJwtSecret(): string {
  if (!process.env.SUPABASE_JWT_SECRET) {
    throw new Error('SUPABASE_JWT_SECRET must be defined in environment variables');
  }
  return process.env.SUPABASE_JWT_SECRET;
}
