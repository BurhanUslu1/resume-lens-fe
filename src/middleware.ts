import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const TOKEN_COOKIE_NAME = 'accessToken';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get(TOKEN_COOKIE_NAME)?.value;
    const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/register');
    const isPublicPage = isAuthPage ||
        request.nextUrl.pathname === '/' ||
        request.nextUrl.pathname.startsWith('/about') ||
        request.nextUrl.pathname.startsWith('/pricing') ||
        request.nextUrl.pathname.startsWith('/contact') ||
        request.nextUrl.pathname.startsWith('/privacy') ||
        request.nextUrl.pathname.startsWith('/terms') ||
        request.nextUrl.pathname.startsWith('/verify-email');
    const isProtectedRoute = !isPublicPage;

    // If logged-in user hits login/register, send them to dashboard
    if (isAuthPage && accessToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If logged-out user hits a protected route, send them to login
    if (isProtectedRoute && !accessToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}; 