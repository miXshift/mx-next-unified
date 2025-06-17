import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/utils/create-supabase-client';
import z from 'zod';

export async function POST() {
  const origin = z.string().url().parse(process.env.AUTH_APP_URL);

  const supabase = await createSupabaseClient();

  await supabase.auth.signOut();

  return NextResponse.redirect(new URL('/', origin), {
    status: 302,
  });
}
