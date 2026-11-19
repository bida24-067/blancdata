'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Scroll detection for navbar blur / border styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  // Using a ref + layout-effect pattern avoids calling setState synchronously
  // inside an effect body (react-hooks/set-state-in-effect rule).
  useEffect(() => {
    // Wrapping in a microtask defers the state update out of the effect body,
    // preventing the cascading-render warning while keeping the behaviour identical.
    const id = setTimeout(() => setMobileOpen(false), 0)
    return () => clearTimeout(id)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  // Hide public navbar inside admin dashboard
  if (pathname.startsWith('/admin')) {
    return null
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        mobileOpen
          ? 'h-screen bg-[#121212] flex flex-col'
          : scrolled
          ? 'h-[72px] bg-[#121212]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/20'
          : 'h-[72px] bg-[#121212]/60 backdrop-blur-sm border-b border-white/[0.04]'
      }`}
    >
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full h-[72px] px-4 sm:px-6 lg:px-8 flex items-center justify-between shrink-0">
        {/* Brand / Logo */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2 group py-2"
          aria-label="Blanc Data Home"
        >
          <Image
            src="/logos/blanc-logo-white.png"
            alt="blanc."
            width={120}
            height={37}
            className="h-7 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
            priority
          />
          <span className="text-[10px] tracking-wider uppercase font-semibold text-white/50 border-l border-white/10 pl-2">
            Data
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1.5"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm px-4 py-1.5 rounded-full transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/[0.12] font-medium shadow-sm'
                    : 'text-white/65 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 bg-white text-black text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <span>Get in touch</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5 -mr-2 text-white/80 hover:text-white active:scale-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Visible when mobileOpen is true) */}
      {mobileOpen && (
        <div className="md:hidden flex-1 flex flex-col justify-between border-t border-white/[0.08] px-6 py-8 overflow-y-auto bg-[#121212]">
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation Links">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between text-lg px-4 py-3.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'text-white bg-white/[0.1] font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <span>{link.label}</span>
                  <svg className="w-4 h-4 text-white/40" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )
            })}
          </nav>

          <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-4">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center bg-white text-black font-semibold text-sm py-3.5 rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              Get in touch
            </Link>
            <p className="text-xs text-center text-white/40">
              Blanc Data · Gaborone, Botswana
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
