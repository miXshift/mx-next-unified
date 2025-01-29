// app/middleware/index.ts (or middleware/index.ts in root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { handleSubdomain } from './subdomain';
import { handleAuth } from './auth';

// Export the main middleware function
export function middleware(request: NextRequest) {
  let response = NextResponse.next();

  // Chain middleware functions
  response = handleSubdomain(request, response);
  response = handleAuth(request, response);

  return response;
}

// Configure paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
