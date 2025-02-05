import { FormMessage, Message } from '@components/form-message';
import { AuthForm } from '@modules/auth/auth.component';

export default async function AuthPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ('message' in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }
  return (
    <div className="container relative min-h-screen flex items-center justify-center">
      <AuthForm
        className="border rounded-xl shadow-sm p-8"
        message={searchParams}
      />
    </div>
  );
}
