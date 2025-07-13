import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const { pathname, origin } = req.nextUrl;

  if (!token) {
    if (pathname.startsWith('/dashboard-admin')) {
      return NextResponse.redirect(`${origin}/login`);
    }
    if (pathname.startsWith('/dashboard-consultor')) {
      return NextResponse.redirect(`${origin}/login`);
    }
    if (pathname.startsWith('/dashboard-empresa')) {
      return NextResponse.redirect(`${origin}/login`);
    }

    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (pathname.startsWith('/dashboard-admin') && payload.tipo !== 'admin') {
      return NextResponse.redirect(`${origin}/login`);
    }

    if (pathname.startsWith('/dashboard-consultor') && payload.tipo !== 'consultor') {
      return NextResponse.redirect(`${origin}/login`);
    }

    if (pathname.startsWith('/dashboard-empresa') && payload.tipo !== 'empresa') {
      return NextResponse.redirect(`${origin}/login`);
    }

    return NextResponse.next();
  } catch (err) {
    console.error('Token inválido:', err);
    return NextResponse.redirect(`${origin}/login`);
  }
}

export const config = {
  matcher: [
    '/dashboard-admin/:path*',
    '/dashboard-consultor/:path*',
    '/dashboard-empresa/:path*',
  ],
};
