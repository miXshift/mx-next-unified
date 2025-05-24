import { login, signup, signInWithGoogle } from './actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { redirectUri?: string };
}) {
  const { redirectUri } = await searchParams;

  return (
    <form>
      <h1>Sign in to MixShift</h1>

      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
      </div>

      {redirectUri && (
        <input type="hidden" name="redirectUri" value={redirectUri} />
      )}

      <div>
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </div>

      <div>
        <p>Or continue with</p>

        <button formAction={signInWithGoogle} formNoValidate>Continue with Google</button>
      </div>
    </form>
  );
}
