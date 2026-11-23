'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const pathname = usePathname()
  const [cleanedPath, setCleanedPath] = useState<string | null>(null)
  const [detectedExtension, setDetectedExtension] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const current = pathname || window.location.pathname
      // Check for common faulty extensions: .html, .htm, .php, .asp, .aspx, .jsp
      const match = current.match(/\.(html?|php|aspx?|jsp)$/i)
      if (match) {
        const id = setTimeout(() => {
          setDetectedExtension(match[0])
          const clean = current.replace(/\.(html?|php|aspx?|jsp)$/i, '')
          setCleanedPath(clean || '/')
        }, 0)
        return () => clearTimeout(id)
      }
    }
  }, [pathname])

  return (
    <div className="flex flex-col min-h-[75vh] items-center justify-center relative overflow-hidden bg-[#121212] px-4 py-16 sm:px-6 lg:px-8">
      {/* Background glow & decorative blur */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 30%, rgba(159, 163, 252, 0.15) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-2xl w-full text-center relative z-10 space-y-8">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-semibold tracking-widest uppercase text-[#9fa3fc]">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Error 404 · Resource Not Found</span>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            We couldn&apos;t locate that page.
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-lg mx-auto">
            The link you followed may be outdated, mistyped, or contains an unsupported file extension.
          </p>
        </div>

        {/* Faulty Extension Auto-Suggestion Banner */}
        {cleanedPath && detectedExtension && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-left text-xs sm:text-sm text-amber-200/90 space-y-2">
            <div className="flex items-center gap-2 font-medium text-amber-300">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Faulty file extension detected ({detectedExtension})</span>
            </div>
            <p className="text-amber-200/75 leading-relaxed">
              Blanc Data uses clean URLs without <code className="bg-black/40 px-1.5 py-0.5 rounded text-amber-300 font-mono text-xs">{detectedExtension}</code> extensions.
            </p>
            <div className="pt-2">
              <Link
                href={cleanedPath}
                className="inline-flex items-center gap-1.5 bg-amber-400 text-black font-semibold text-xs px-4 py-2 rounded-full hover:bg-amber-300 transition-colors"
              >
                <span>Navigate to clean URL: {cleanedPath}</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        )}

        {/* Troubleshooting Guidance Box */}
        <div className="p-6 rounded-2xl bg-[#181818] border border-white/[0.08] text-left space-y-4 shadow-xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/40 block">
            Common reasons for this error
          </span>
          <ul className="text-xs sm:text-sm text-white/70 space-y-2.5 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#9fa3fc] font-bold">1.</span>
              <span><strong>File extension suffix:</strong> Avoid adding <code className="text-white/90 bg-white/[0.06] px-1 py-0.5 rounded text-xs">.html</code> or <code className="text-white/90 bg-white/[0.06] px-1 py-0.5 rounded text-xs">.php</code> to addresses. All routes are modern clean paths.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#9fa3fc] font-bold">2.</span>
              <span><strong>Moved or updated prototype:</strong> Prototype case studies may have been updated to a verified release slug.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#9fa3fc] font-bold">3.</span>
              <span><strong>Staff portal access:</strong> The staff portal requires active authorization at <code className="text-white/90 bg-white/[0.06] px-1 py-0.5 rounded text-xs">/sign-in</code>.</span>
            </li>
          </ul>

          <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-white/50">Need assistance resolving an issue?</span>
            <Link
              href="/help"
              className="text-[#9fa3fc] hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
            >
              <span>Read Customer Help &amp; Troubleshooting Guide</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-black text-xs sm:text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-md"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs sm:text-sm font-medium px-5 py-3 rounded-full border border-white/[0.1] transition-all"
          >
            <span>Our Services</span>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs sm:text-sm font-medium px-5 py-3 rounded-full border border-white/[0.1] transition-all"
          >
            <span>Verified Prototypes</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs sm:text-sm font-medium px-5 py-3 rounded-full border border-white/[0.1] transition-all"
          >
            <span>Report Broken Link</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
