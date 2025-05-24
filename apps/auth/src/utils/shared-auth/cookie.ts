import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Constants
export const SHARED_AUTH_COOKIE_NAME = 'mixshift_auth_token';

// Types
type CookieOptions = {
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none' | boolean;
  maxAge?: number;
};

/**
 * Gets the cookie options from environment variables
 */
export function getSharedCookieOptions(): CookieOptions {
  return {
    path: process.env.COOKIE_OPTION_PATH || '/',
    secure: process.env.COOKIE_OPTION_SECURE === 'yes',
    domain: process.env.COOKIE_OPTION_DOMAIN,
    sameSite:
      process.env.COOKIE_OPTION_SAME_SITE === 'yes'
        ? true
        : (process.env.COOKIE_OPTION_SAME_SITE as 'lax' | 'strict' | 'none' | undefined),
    // 7 days expiry by default, can be configured via env
    maxAge: parseInt(process.env.AUTH_COOKIE_MAX_AGE || '604800', 10),
  };
}

/**
 * Sets the shared auth token cookie in server components/actions
 */
export async function setSharedAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SHARED_AUTH_COOKIE_NAME, token, getSharedCookieOptions());
}

/**
 * Gets the shared auth token from cookies in server components/actions
 */
export async function getSharedAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SHARED_AUTH_COOKIE_NAME)?.value;
}

/**
 * Sets the shared auth token cookie in middleware or API routes
 */
export function setSharedAuthCookieInResponse(
  response: NextResponse,
  token: string
): NextResponse {
  response.cookies.set(
    SHARED_AUTH_COOKIE_NAME,
    token,
    getSharedCookieOptions()
  );
  return response;
}

/**
 * Gets the shared auth token from a request in middleware or API routes
 */
export function getSharedAuthCookieFromRequest(
  request: NextRequest
): string | undefined {
  return request.cookies.get(SHARED_AUTH_COOKIE_NAME)?.value;
}

/**
 * Clears the shared auth token cookie
 */
export async function clearSharedAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SHARED_AUTH_COOKIE_NAME);
}

/**
 * Clears the shared auth token cookie in a response
 */
export function clearSharedAuthCookieInResponse(
  response: NextResponse
): NextResponse {
  response.cookies.delete(SHARED_AUTH_COOKIE_NAME);
  return response;
}
