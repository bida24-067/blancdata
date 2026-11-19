import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

/** Single e-mail address allowed to access the admin portal */
const ADMIN_EMAIL = 'hello@blancsociety.co.uk'

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    // 1️⃣  Enforce Clerk authentication first
    const { sessionClaims } = await auth.protect({
      unauthenticatedUrl: new URL('/sign-in', req.url).toString(),
    })

    // 2️⃣  Enforce strict e-mail allowlist — only the designated admin may proceed
    const email =
      (sessionClaims?.email as string | undefined) ??
      ((sessionClaims?.['https://clerk.dev/claims/email'] as string | undefined))

    if (!email || email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      // Redirect unauthorised (but authenticated) users back to the home page
      return Response.redirect(new URL('/', req.url))
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
