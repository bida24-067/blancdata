'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log unexpected errors securely
    console.error('Unhandled application error:', error)
  }, [error])

  return (
    <div className="flex flex-col min-h-[70vh] items-center justify-center relative overflow-hidden bg-[#121212] px-4 py-16 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 30%, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-xl w-full text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 text-xs font-semibold tracking-widest uppercase text-red-400">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
          <span>Application Notice</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white leading-tight">
          An unexpected glitch occurred.
        </h1>

        <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-md mx-auto">
          Our client application encountered an issue while rendering this section. No user data was lost.
        </p>

        {error?.digest && (
          <p className="text-xs font-mono text-white/30 bg-white/[0.03] py-1 px-3 rounded-full inline-block">
            Reference code: {error.digest}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-white text-black text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Try Again</span>
          </button>

          <Link
            href="/help"
            className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full border border-white/[0.1] transition-all"
          >
            <span>Customer Help &amp; Troubleshooting</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full border border-white/[0.1] transition-all"
          >
            <span>Return Home</span>
          </Link>
        </div>

        <p className="text-xs text-white/40 pt-4">
          If this issue persists, please notify our engineering desk at{' '}
          <a href="mailto:hello@blancsociety.co.uk" className="text-white/70 underline hover:text-white">
            hello@blancsociety.co.uk
          </a>.
        </p>
      </div>
    </div>
  )
}
