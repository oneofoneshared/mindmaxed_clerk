import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all routes except for static files, public files, sign-in, sign-up, and API routes
    '/((?!_next|static|.*\..*|favicon.ico|signin|signup|api).*)',
  ],
}; 