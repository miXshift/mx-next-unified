export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="text-center text-gray-700">
          There was an error with your authentication. Please try again or contact support if the problem persists.
        </p>
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to login
          </a>
        </div>
      </div>
    </div>
  )
}