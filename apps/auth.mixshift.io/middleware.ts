import type { NextRequest } from 'next/server'
import { updateSession } from './src/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

// This ensures that middleware runs only on routes that access Supabase
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * Feel free to modify this to your needs
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}