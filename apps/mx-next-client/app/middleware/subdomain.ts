// app/middleware/subdomain.ts
import type { NextRequest, NextResponse } from 'next/server';

export function handleSubdomain(
  request: NextRequest,
  response: NextResponse
): NextResponse {
  const host = request.headers.get('host');
  const subdomain = host?.split('.')[0];
  response.headers.set('x-subdomain', subdomain || '');
  return response;
}
