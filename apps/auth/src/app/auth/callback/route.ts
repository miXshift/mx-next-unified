import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getSessionAccessToken, setSharedAuthCookieInResponse } from '@/utils/shared-auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (code == null || code.trim() === '') {
    return NextResponse.redirect(new URL('/error', req.url));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error != null) {
    return NextResponse.redirect(new URL('/error', req.url));
  }

  // Get the session token and set it in the shared cookie
  const accessToken = await getSessionAccessToken();
  
  // TODO: verify redirectUri is allowed
  const redirectUri = searchParams.get('redirectUri') ?? '/';
  const response = NextResponse.redirect(
    new URL(decodeURIComponent(redirectUri), req.url)
  );
  
  // Set the shared auth cookie in the response
  if (accessToken) {
    setSharedAuthCookieInResponse(response, accessToken);
  }
  
  return response;
}
