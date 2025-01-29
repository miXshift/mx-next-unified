// app/middleware/auth.ts
import type { NextRequest, NextResponse } from 'next/server'

export function handleAuth(
  request: NextRequest,
  response: NextResponse
): NextResponse {
  // Auth logic here
  return response
}