'use client';

import { useActionState } from 'react';
import { updatePassword } from './actions';
import Link from 'next/link';

export default function UpdatePasswordClientPage() {
  const [updatePasswordState, updatePasswordAction, updatePasswordPending] =
    useActionState(updatePassword, {});

  return (
    <>
      <h1>Update your password</h1>

      <div role="alert">
        {updatePasswordState.message?.type === 'error' ? (
          <p>{updatePasswordState.message.text}</p>
        ) : null}
      </div>

      {updatePasswordState.message?.type === 'success' ? (
        <div>
          <p>Your password has been updated successfully.</p>
          <Link href="/">Return to Home</Link>
        </div>
      ) : (
        <form inert={updatePasswordPending}>
          <div>
            <label htmlFor="password">New Password:</label>
            <input id="password" name="password" type="password" required />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
            />
          </div>

          <div>
            <button type="submit" formAction={updatePasswordAction}>
              Update Password
            </button>
          </div>
        </form>
      )}
    </>
  );
}
