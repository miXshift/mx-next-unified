import { redirect } from 'next/navigation';

import { createSupabaseClient } from '@/utils/create-supabase-client';
import { Button } from '@mixshift/web-ui';

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
        <Button variant="default">Sign out</Button>
      </form>
    </>
  );
}
