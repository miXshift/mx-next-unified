import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseCredentialsFromEnv } from './get-supabase-credentials-from-env';
import { getCookieOptionsFromEnv } from './get-cookie-options-from-env';

export async function updateSupabaseSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const credentials = getSupabaseCredentialsFromEnv(process.env);
  const cookieOptions = getCookieOptionsFromEnv(process.env);
  const supabase = createServerClient(credentials.url, credentials.key, {
    cookieOptions,
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user == null) {
    if (process.env.AUTH_APP_URL == null) {
      throw new Error('AUTH_APP_URL is not defined');
    }

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
    authAppUrl.pathname = '/auth/login';

    authAppUrl.searchParams.set('next', fullUrl);

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
