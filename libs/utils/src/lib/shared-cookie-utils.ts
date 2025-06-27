import { z } from 'zod';

const yesOrno = z
  .enum(['yes', 'no'])
  .transform((val) => (val === 'yes' ? true : val === 'no' ? false : val));

const serializeOptionsSchema = z.object({
  maxAge: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
  expires: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  domain: z.string().optional(),
  path: z.string().optional(),
  httpOnly: yesOrno.optional(),
  secure: yesOrno.optional(),
  partitioned: yesOrno.optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  sameSite: z.union([yesOrno, z.enum(['lax', 'strict', 'none'])]).optional(),
});
export type SerializeOptions = z.infer<typeof serializeOptionsSchema>;

export function getCookieOptionsFromEnv(
  env: NodeJS.ProcessEnv
): SerializeOptions {
  return serializeOptionsSchema.parse({
    maxAge: env.COOKIE_OPTION_MAX_AGE,
    expires: env.COOKIE_OPTION_EXPIRES,
    domain: env.COOKIE_OPTION_DOMAIN,
    path: env.COOKIE_OPTION_PATH,
    httpOnly: env.COOKIE_OPTION_HTTP_ONLY,
    secure: env.COOKIE_OPTION_SECURE,
    partitioned: env.COOKIE_OPTION_PARTITIONED,
    priority: env.COOKIE_OPTION_PRIORITY,
    sameSite: env.COOKIE_OPTION_SAME_SITE,
  });
}
