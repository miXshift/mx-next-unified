'use client';

import { useActionState } from 'react';
import { requestPasswordReset } from './actions';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [resetState, resetAction, resetPending] = useActionState(
    requestPasswordReset,
    {},
  );

  return (
    <>
      <h1>Reset your password</h1>

      <div role="alert">
        {resetState.message?.type === 'error' ? (
          <p>{resetState.message.text}</p>
        ) : null}
      </div>

      {resetState.message?.type === 'success' ? (
        <div>
          <p>Check your email for the password reset link.</p>
          <Link href="/auth/login">Return to login</Link>
        </div>
      ) : (
        <form inert={resetPending}>
          <div>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div>
            <button type="submit" formAction={resetAction}>
              Send Reset Link
            </button>
          </div>

          <div>
            <Link href="/auth/login">Back to login</Link>
          </div>
        </form>
      )}
    </>
  );
}
