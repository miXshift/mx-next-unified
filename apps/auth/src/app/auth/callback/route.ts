import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

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

  // TODO: verify redirectUri is allowed
  const redirectUri = searchParams.get('redirectUri') ?? '/';
  return NextResponse.redirect(
    new URL(decodeURIComponent(redirectUri), req.url)
  );
}
