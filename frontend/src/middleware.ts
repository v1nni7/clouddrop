import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('clouddrop.token')?.value

  if (!token) {
    return NextResponse.redirect('http://localhost:3000/sign-in')
  }

  NextResponse.next()
}

export const config = {
  matcher: '/',
}
