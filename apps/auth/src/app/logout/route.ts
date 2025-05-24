import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { clearSharedAuthCookieInResponse } from '@/utils/shared-auth';

export async function POST() {
  const supabase = await createClient();
  
  await supabase.auth.signOut();
  
  const response = NextResponse.redirect(
    new URL('/', process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'), 
    { status: 302 }
  );
  
  // Clear the shared auth cookie
  clearSharedAuthCookieInResponse(response);
  
  return response;
}