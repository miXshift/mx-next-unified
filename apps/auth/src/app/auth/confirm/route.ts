import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/utils/create-supabase-client';
import z from 'zod';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = z.string().parse(searchParams.get('code'));

  const supabase = await createSupabaseClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error != null) {
    throw error;
  }

  const next = searchParams.get('next') ?? '/';
  return NextResponse.redirect(new URL(decodeURIComponent(next), req.url));
}
