import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest) {
  NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: '/dashboard/:path*'
}
