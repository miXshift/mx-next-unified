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
    <main className="min-h-screen min-w-screen flex items-center justify-center bg-secondary/30">
      <AuthForm
        className="bg-card border rounded-xl shadow-sm p-8 transition-all duration-200 hover:shadow-md"
        message={searchParams}
      />
    </main>
  );
}
