import { AuthForm } from '@modules/auth/auth.component';

export default function AuthPage() {
  return (
    <div className="container relative min-h-screen flex items-center justify-center">
      <AuthForm className="border rounded-xl shadow-sm p-8" />
    </div>
  );
}
