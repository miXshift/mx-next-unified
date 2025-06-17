import { createSupabaseClient } from '@/utils/create-supabase-client';
import z from 'zod';

export default async function Index() {
  const origin = z.string().url().parse(process.env.AUTH_APP_URL);
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    throw new Error('User not authenticated');
  }

  return (
    <>
      <h1>Reports</h1>
      <p>Hello {data.user.email}</p>
      <form action={`${origin}/logout`} method="POST">
        <button type="submit">Sign out</button>
      </form>
    </>
  );
}
