import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

/** Only this e-mail address may access the admin portal */
const ADMIN_EMAIL = 'hello@blancsociety.co.uk'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  // Second guard: verify the signed-in user's primary e-mail matches the allowlist
  const user = await currentUser()
  const primaryEmail = user?.emailAddresses?.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress

  if (!primaryEmail || primaryEmail.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-white/90">
      {/* Admin nav bar */}
      <header className="border-b border-white/[0.08] bg-[#161616]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Back to site" className="flex items-center gap-2">
              <Image src="/logos/blanc-logo-white.png" alt="blanc." width={90} height={28} className="h-6 w-auto object-contain" />
            </Link>
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Admin Portal
            </span>
          </div>
          <nav className="flex items-center gap-6" aria-label="Admin navigation">
            <Link href="/admin" className="text-sm text-white/60 hover:text-white transition-colors">
              Overview
            </Link>
            <Link href="/admin/projects" className="text-sm font-medium text-white transition-colors">
              Projects Manager
            </Link>
            <Link href="/" target="_blank" className="text-xs text-white/40 hover:text-white transition-colors">
              Live Site ↗
            </Link>
            <div className="border-l border-white/[0.1] pl-4">
              <UserButton />
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">{children}</main>
    </div>
  )
}
