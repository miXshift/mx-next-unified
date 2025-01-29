// app/middleware/utils/headers.ts
import type { NextRequest } from 'next/server'

export function getCustomHeaders(request: NextRequest) {
  return {
    clientId: request.headers.get('x-client-id'),
    region: request.headers.get('x-region'),
    // ... other common headers
  }
}