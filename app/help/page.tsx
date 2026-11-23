import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import { FAQSchema } from '@/components/FAQSchema'

export const metadata: Metadata = {
  title: 'Customer Help & Troubleshooting Guide',
  description:
    'Diagnostic steps, common error resolutions, and guidance for resolving navigation errors, faulty extensions, and contact form questions on Blanc Data.',
  alternates: { canonical: 'https://blancsociety.co.uk/help' },
  openGraph: {
    title: 'Customer Help & Troubleshooting Guide | Blanc Data',
    description:
      'Diagnostic steps and solutions for navigation errors, URL formatting, email delivery, and form submissions on Blanc Data.',
    url: 'https://blancsociety.co.uk/help',
  },
}

const faqItems = [
  {
    question: 'Why did I get a 404 Page Not Found error?',
    answer:
      'A 404 error usually occurs when following an outdated bookmark, mistyping a URL, or appending traditional file extensions such as .html, .htm, or .php. Blanc Data uses clean RESTful URLs without file extensions (e.g. /services instead of /services.html).',
  },
  {
    question: 'Why is my contact form inquiry not sending?',
    answer:
      'Our contact form enforces strict validation to protect our engineering inbox from spam. Ensure your project description is at least 10 characters long, your email is correctly formatted, and the privacy consent checkbox is checked. If you have submitted multiple times rapidly, wait 15 minutes for the rate limiter to reset.',
  },
  {
    question: 'Where can I find the confirmation email for my project inquiry?',
    answer:
      'Automated confirmation emails are dispatched instantly from noreply@noreply.blancsociety.co.uk. If it does not appear in your primary inbox within 2 minutes, please inspect your Junk or Spam folders. You can reply directly to that email to reach hello@blancsociety.co.uk.',
  },
  {
    question: 'How do I perform a hard cache refresh if the site looks cached?',
    answer:
      'On Mac, press Cmd + Shift + R in Chrome/Firefox or Option + Cmd + E in Safari. On Windows/Linux, press Ctrl + F5 or Ctrl + Shift + R. This reloads the latest static assets from our Cloudflare CDN.',
  },
  {
    question: 'How do I access the Staff Portal (/admin)?',
    answer:
      'The staff portal is restricted exclusively to authorized administrative accounts (hello@blancsociety.co.uk) via Clerk authentication. Unauthenticated or non-admin users are automatically redirected to the public homepage.',
  },
]

export default function HelpPage() {
  return (
    <div className="flex flex-col">
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: 'https://blancsociety.co.uk' },
          { name: 'Help & Troubleshooting', href: 'https://blancsociety.co.uk/help' },
        ]}
      />
      <FAQSchema items={faqItems} />

      {/* ── Header Section ── */}
      <section className="relative py-16 md:py-24 border-b border-white/[0.08] bg-[#121212] overflow-hidden">
        {/* Glow backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(159, 163, 252, 0.16) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] block mb-3">
              Support &amp; Diagnostics
            </span>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
              Customer Help &amp; Troubleshooting Guide.
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              Find quick resolutions to common site issues, clean URL formatting guidelines, contact form validation checks, and email delivery steps.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Diagnostics & Solutions Grid ── */}
      <section className="py-16 md:py-20 bg-[#0e0e0e] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section 1: Navigation & URL Suffix Errors */}
          <div className="space-y-6">
            <div className="border-b border-white/[0.08] pb-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#9fa3fc]">
                Section 01 · Navigation &amp; Routing
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white mt-1">
                Resolving 404s &amp; Faulty File Extensions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#161616] border border-white/[0.08] space-y-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm">
                  !
                </div>
                <h3 className="text-lg font-medium text-white">
                  Strip File Extensions (.html, .php, etc.)
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Older bookmarks or copied URLs sometimes retain legacy suffixes like <code className="text-white/80 bg-black/40 px-1 py-0.5 rounded text-xs">/services.html</code> or <code className="text-white/80 bg-black/40 px-1 py-0.5 rounded text-xs">/contact.php</code>. Blanc Data operates exclusively on clean, extension-free endpoints.
                </p>
                <div className="p-3 bg-black/40 rounded-xl text-xs space-y-1 font-mono">
                  <div className="text-red-400">✗ blancsociety.co.uk/about.html</div>
                  <div className="text-emerald-400">✓ blancsociety.co.uk/about</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#161616] border border-white/[0.08] space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#9fa3fc]/10 border border-[#9fa3fc]/20 text-[#9fa3fc] flex items-center justify-center font-bold text-sm">
                  #
                </div>
                <h3 className="text-lg font-medium text-white">
                  Standard Directory Sitemap
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  If you are unsure of a page address, use these canonical directory routes:
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <Link href="/" className="p-2 rounded-lg bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors">
                    / (Home) &rarr;
                  </Link>
                  <Link href="/services" className="p-2 rounded-lg bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors">
                    /services &rarr;
                  </Link>
                  <Link href="/projects" className="p-2 rounded-lg bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors">
                    /projects &rarr;
                  </Link>
                  <Link href="/about" className="p-2 rounded-lg bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors">
                    /about &rarr;
                  </Link>
                  <Link href="/contact" className="p-2 rounded-lg bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors">
                    /contact &rarr;
                  </Link>
                  <Link href="/privacy" className="p-2 rounded-lg bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors">
                    /privacy &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Form & Inquiry Delivery */}
          <div className="space-y-6">
            <div className="border-b border-white/[0.08] pb-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#9fa3fc]">
                Section 02 · Inquiry Submissions
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white mt-1">
                Contact Form &amp; Notification Troubleshooting
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#161616] border border-white/[0.08] space-y-3">
                <h3 className="text-base font-medium text-white">
                  1. Form Validation Rules
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  To prevent incomplete inquiries, our form requires:
                </p>
                <ul className="text-xs text-white/70 space-y-1.5 list-disc list-inside">
                  <li>Your full name (up to 200 chars)</li>
                  <li>Valid business or private email</li>
                  <li>Project scope of at least 10 characters</li>
                  <li>Selected referral / lead source</li>
                  <li>Mandatory privacy consent confirmation</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#161616] border border-white/[0.08] space-y-3">
                <h3 className="text-base font-medium text-white">
                  2. Rate Limiting (429 Error)
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  Our API limits form submissions to <strong>5 requests per 15-minute window per IP address</strong>. This prevents denial-of-service and bot spam. If rate limited, simply wait 15 minutes or email us directly at <a href="mailto:hello@blancsociety.co.uk" className="text-white underline">hello@blancsociety.co.uk</a>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#161616] border border-white/[0.08] space-y-3">
                <h3 className="text-base font-medium text-white">
                  3. Email Confirmation Delivery
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  All confirmation emails are dispatched from <code className="text-xs text-white/80 bg-black/40 px-1 py-0.5 rounded">noreply@noreply.blancsociety.co.uk</code> authenticated with SPF, DKIM, and DMARC. If missing, please check your Spam/Junk folder and mark our address as a safe sender.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Browser Cache & Display Issues */}
          <div className="space-y-6">
            <div className="border-b border-white/[0.08] pb-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#9fa3fc]">
                Section 03 · Display &amp; Performance
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white mt-1">
                Cache Invalidation &amp; Rendering Glitches
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#161616] border border-white/[0.08] space-y-3">
                <h3 className="text-base font-medium text-white">
                  How to Perform a Hard Cache Refresh
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  If buttons appear unresponsive, layout styles look misaligned, or updates do not appear immediately, your browser may be holding stale cached assets.
                </p>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="p-3 bg-black/30 rounded-xl flex items-center justify-between">
                    <span className="text-white/70">macOS (Chrome / Firefox / Edge):</span>
                    <kbd className="px-2 py-1 rounded bg-white/10 font-mono text-white">Cmd + Shift + R</kbd>
                  </div>
                  <div className="p-3 bg-black/30 rounded-xl flex items-center justify-between">
                    <span className="text-white/70">macOS (Safari):</span>
                    <kbd className="px-2 py-1 rounded bg-white/10 font-mono text-white">Option + Cmd + E</kbd>
                  </div>
                  <div className="p-3 bg-black/30 rounded-xl flex items-center justify-between">
                    <span className="text-white/70">Windows / Linux (All Browsers):</span>
                    <kbd className="px-2 py-1 rounded bg-white/10 font-mono text-white">Ctrl + F5</kbd>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#161616] border border-white/[0.08] space-y-3">
                <h3 className="text-base font-medium text-white">
                  Content Security &amp; Ad-Blockers
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Blanc Data implements a strict Content Security Policy (CSP) with zero third-party tracking or advertising scripts. However, certain aggressive ad-blockers or privacy extensions may interfere with legitimate authentication tokens or fonts.
                </p>
                <p className="text-xs text-white/50 leading-relaxed pt-2">
                  If you experience connection errors while accessing protected areas or forms, whitelist <code className="text-white/80">blancsociety.co.uk</code> in your browser extension settings.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Staff Portal Access */}
          <div className="space-y-6">
            <div className="border-b border-white/[0.08] pb-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#9fa3fc]">
                Section 04 · Portal Authentication
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white mt-1">
                Staff Portal Access (/admin)
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-[#161616] border border-white/[0.08] space-y-4">
              <p className="text-sm text-white/70 leading-relaxed">
                The administrative dashboard located at <code className="text-white bg-black/40 px-1.5 py-0.5 rounded text-xs">/admin</code> is dedicated strictly to verified Blanc Data partners and analysts. It enforces both Clerk cryptographic session authentication and an explicit email allowlist (<code className="text-[#9fa3fc]">hello@blancsociety.co.uk</code>).
              </p>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-white/60 space-y-2">
                <div className="text-white font-medium">Logged out or redirected to homepage?</div>
                <div>
                  Any authenticated account whose primary email is not on the admin allowlist is automatically redirected to the public homepage for data security. If you are a client looking for your project status or prototype files, please request them via direct email.
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Direct Support Escalation Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#161616] border border-white/[0.1] relative overflow-hidden space-y-6 shadow-2xl">
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full pointer-events-none opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(159, 163, 252, 0.4) 0%, transparent 70%)',
              }}
            />
            
            <div className="max-w-2xl space-y-3 relative z-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Direct Engineering Helpdesk
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white">
                Still encountering an issue?
              </h2>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                If your technical problem is not resolved by the diagnostic steps above, reach out directly to our engineering desk in Gaborone. We respond within 3 business days.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 relative z-10 pt-2">
              <a
                href="mailto:hello@blancsociety.co.uk?subject=Technical%20Assistance%20Inquiry%20%7C%20Blanc%20Data"
                className="inline-flex items-center gap-2 bg-white text-black text-xs sm:text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-md"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email hello@blancsociety.co.uk</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs sm:text-sm font-medium px-5 py-3 rounded-full border border-white/[0.1] transition-all"
              >
                <span>Use Web Contact Form &rarr;</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
