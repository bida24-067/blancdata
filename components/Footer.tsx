'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { services } from '@/content/services'

const year = new Date().getFullYear()

export default function Footer() {
  const pathname = usePathname()

  // Hide public footer inside admin dashboard
  if (pathname.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="border-t border-white/[0.08] bg-[#0e0e0e] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-2" aria-label="Blanc Data Home">
              <Image
                src="/logos/blanc-logo-white.png"
                alt="blanc."
                width={100}
                height={31}
                className="h-6 w-auto object-contain"
              />
              <span className="text-[10px] tracking-wider uppercase font-semibold text-white/50 border-l border-white/10 pl-2">
                Data
              </span>
            </Link>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              Data analytics for organisations in Botswana. High-impact dashboards, robust data pipelines, and predictive modelling you can check and reuse.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-2">
              <a
                href="https://www.linkedin.com/company/blancdata/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Blanc Data on LinkedIn"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.1] transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Pages */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-4">Pages</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Projects', href: '/projects' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Help & Support', href: '/help' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-4">Services</p>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.slug}`} className="text-sm text-white/60 hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Admin */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-4">Contact</p>
            <ul className="flex flex-col gap-2.5 text-sm text-white/60">
              <li>
                <a href="mailto:hello@blancsociety.co.uk" className="hover:text-white transition-colors">
                  hello@blancsociety.co.uk
                </a>
              </li>
              <li>Gaborone, Botswana</li>
              <li className="mt-3 pt-3 border-t border-white/[0.08]">
                <Link href="/privacy" className="hover:text-white transition-colors text-xs">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-xs text-white/30">
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-white/40">
          <p>© {year} Blanc Data. Independent Data Consultancy · Gaborone, Botswana.</p>
          <div className="flex gap-4">
            <Link href="/help" className="hover:text-white transition-colors">
              Help
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
