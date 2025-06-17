import { createSupabaseClient } from '@/utils/create-supabase-client';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Index() {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase.auth.getUser();
  if (error == null && data.user != null) {
    redirect('/private');
  }

  return <Link href="/auth/login">Sign in</Link>;
}
