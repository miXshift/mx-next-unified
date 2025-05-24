import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getSharedAuthCookieFromRequest } from '../shared-auth';

export async function updateSession(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL == null) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined');
  }
  if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY == null) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined');
  }

  let supabaseResponse = NextResponse.next({
    request,
  });
  
  // Get the shared auth token from the request cookies
  const sharedAuthToken = getSharedAuthCookieFromRequest(request);

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

  const supabase = createServerClient(
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
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  
  // If we have a shared auth token, set the session with JWT
  if (sharedAuthToken) {
    try {
      // Set the auth using the shared JWT token
      await supabase.auth.setSession({
        access_token: sharedAuthToken,
        refresh_token: '', // Not needed since we're using JWT auth
      });
    } catch (error) {
      console.error('Error setting session with shared auth token in middleware:', error);
    }
  }

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (process.env.AUTH_APP_URL == null) {
      throw new Error('AUTH_APP_URL is not defined');
    }

    // No authenticated user and no shared token, redirect to auth app for login
    const currentUrl = new URL(request.url);
    const hostname =
      request.headers.get('x-forwarded-host') ||
      request.headers.get('host') ||
      currentUrl.hostname;
    const protocol =
      request.headers.get('x-forwarded-proto') ||
      currentUrl.protocol.replace(':', '');
    const fullUrl = `${protocol}://${hostname}${request.nextUrl.pathname}${request.nextUrl.search}`;

    const authAppUrl = new URL(process.env.AUTH_APP_URL);
    authAppUrl.pathname = '/login';

    // Pass current URL as redirect URI to return after successful authentication
    authAppUrl.searchParams.set('redirectUri', fullUrl);

    return NextResponse.redirect(authAppUrl);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
