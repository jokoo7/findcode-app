import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { decrypt } from '@/services/session.service'

const protectedRoute = ['/admin/dashboard']
const loginRoute = ['/login']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoute.some(route => path.startsWith(route))
  const isLoginRoute = loginRoute.includes(path)

  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
