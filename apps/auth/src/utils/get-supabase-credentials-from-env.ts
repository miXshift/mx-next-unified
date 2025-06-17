import { z } from 'zod';

const supbaseCredentialsSchema = z.object({
  url: z.string(),
  key: z.string(),
});
type SupabaseCredentials = z.infer<typeof supbaseCredentialsSchema>;

export function getSupabaseCredentialsFromEnv(
  env: NodeJS.ProcessEnv,
): SupabaseCredentials {
  return supbaseCredentialsSchema.parse({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
}
