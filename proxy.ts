import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    // Enforce Clerk authentication for all /admin routes.
    // Unauthenticated visitors are sent directly to /sign-in.
    // Authorized email verification (hello@blancsociety.co.uk) is enforced
    // securely on the server in app/admin/layout.tsx and app/api/admin/projects/route.ts
    // via Clerk's currentUser() with the secret key.
    await auth.protect({
      unauthenticatedUrl: new URL('/sign-in', req.url).toString(),
    })
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
