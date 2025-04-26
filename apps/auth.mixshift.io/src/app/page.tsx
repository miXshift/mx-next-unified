import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">auth.mixshift.io</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link href="/private" className="text-blue-600 hover:text-blue-800">
                      Private Area
                    </Link>
                  </li>
                  <li>
                    <form action="/auth/signout" method="post">
                      <button
                        type="submit"
                        className="text-red-600 hover:text-red-800"
                      >
                        Sign out
                      </button>
                    </form>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/login" className="text-blue-600 hover:text-blue-800">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Welcome to MixShift Auth</h2>
          
          {user ? (
            <div className="bg-green-50 p-4 rounded-md mb-6">
              <p className="text-green-800">
                You are logged in as <strong>{user.email}</strong>
              </p>
              <p className="mt-2">
                <Link href="/private" className="text-blue-600 hover:underline">
                  Access your private area →
                </Link>
              </p>
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-md mb-6">
              <p className="text-yellow-800">
                You are not currently logged in.
              </p>
              <p className="mt-2">
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login or create an account →
                </Link>
              </p>
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">About this app</h3>
            <p className="text-gray-700">
              This auth.mixshift.io application provides server-side authentication using Supabase in a Next.js 
              application as part of the MixShift NX monorepo.
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} MixShift. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
