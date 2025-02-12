import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const publicRoutes = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/_next(.*)',
  '/favicon.ico',
  '/api(.*)' // Allow API routes
])

export default clerkMiddleware((auth, req) => {
  const isPublicRoute = publicRoutes(req)
  const isAuthed = !!auth.userId
  const url = new URL(req.url)

  // Redirect authenticated users from public routes to /chat
  if (isAuthed && isPublicRoute) {
    url.pathname = '/chat'
    return Response.redirect(url)
  }

  // Redirect unauthenticated users from protected routes to /sign-in 
  if (!isAuthed && !isPublicRoute) {
    url.pathname = '/sign-in'
    return Response.redirect(url)
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};