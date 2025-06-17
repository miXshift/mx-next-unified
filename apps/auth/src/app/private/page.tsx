import { redirect } from 'next/navigation';

import { createSupabaseClient } from '@/utils/create-supabase-client';

export default async function PrivatePage() {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/auth/login');
  }

  return (
    <>
      <p>Hello {data.user.email}</p>{' '}
      <form action="/logout" method="POST">
        <button type="submit">Sign out</button>
      </form>
    </>
  );
}
