'use client';

import { useSearchParams } from 'next/navigation';
import { login, signup, signInWithGoogle } from './actions';
import { useActionState } from 'react';

export default function LoginPage() {
  const [loginState, loginAction, loginPending] = useActionState(login, {});
  const [signupState, signupAction, singupPending] = useActionState(signup, {});
  const [
    signInWithGoogleState,
    signInWithGoogleAction,
    signInWithGooglePending,
  ] = useActionState(signInWithGoogle, {});

  const pending = loginPending || singupPending || signInWithGooglePending;
  const message =
    loginState.message ?? signupState.message ?? signInWithGoogleState.message;

  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const nextInput = next ? (
    <input type="hidden" name="next" value={next} />
  ) : null;

  return (
    <>
      <h1>Sign in to MixShift</h1>

      <div role="alert">{message != null ? <p>{message.text}</p> : null}</div>

      <form inert={pending}>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          <div>
            <a href="/auth/reset-password">Forgot password?</a>
          </div>
        </div>

        {nextInput}

        <div>
          <button formAction={loginAction}>Log in</button>
          <button formAction={signupAction}>Sign up</button>
        </div>
      </form>

      <form inert={pending}>
        <p>Or continue with</p>

        {nextInput}

        <button formAction={signInWithGoogleAction} formNoValidate>
          Continue with Google
        </button>
      </form>
    </>
  );
}
