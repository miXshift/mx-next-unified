// app/middleware/landing.ts
import { NextRequest, NextResponse } from 'next/server';

export function handleLanding(
  request: NextRequest,
  response: NextResponse
): NextResponse {
     const url = request.nextUrl.clone();
  // // If user is logged in, redirect to dashboard
  if (request.nextUrl.pathname === '/') {
    url.pathname = '/auth';
    return NextResponse.redirect(url)
  }
  return response;
}
