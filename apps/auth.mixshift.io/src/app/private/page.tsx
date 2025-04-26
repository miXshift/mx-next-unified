import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // If no user is found, redirect to login page
    redirect('/login?message=You must be logged in to view this page')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Protected Content</h1>
        <p className="mb-4 text-center text-gray-700">
          Welcome, {user.email}!
        </p>
        <p className="mb-6 text-center text-gray-700">
          This is a protected page that only authenticated users can see.
        </p>
        <div className="mt-6 flex justify-center">
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}