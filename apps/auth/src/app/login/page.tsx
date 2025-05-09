import { login, signup } from './actions';
import { Button } from '@mixshift/ui';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { redirectUri?: string };
}) {
  const { redirectUri } = await searchParams;

  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      {redirectUri && (
        <input type="hidden" name="redirectUri" value={redirectUri} />
      )}
      <button formAction={login}>Log in</button>
      <Button formAction={signup}>Sign up</Button>
    </form>
  );
}
