import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us · Start a Project',
  description: 'Initiate an analytics consultation with Blanc Data in Gaborone, Botswana. We reply within 3 business days.',
}

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* ── Page Header ── */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] block mb-3">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
              Tell us about your data challenge.
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              Whether you need to automate month-end spreadsheets, audit default risk, or build a custom forecasting engine—share a few details and we&apos;ll reply with a preliminary assessment within 3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Split Tiles ── */}
      <section className="py-16 md:py-24 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info & Reassurances (Tiles) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-[#171717] border border-white/[0.06] space-y-6">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                    Direct Email
                  </h2>
                  <a
                    href="mailto:hello@blancsociety.co.uk"
                    className="text-lg font-medium text-white hover:text-[#9fa3fc] transition-colors"
                  >
                    hello@blancsociety.co.uk
                  </a>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                    Location & Base
                  </h2>
                  <p className="text-sm text-white/80">
                    Gaborone, Botswana
                  </p>
                  <p className="text-xs text-white/50 mt-1">
                    Serving organisations across Botswana and the SADC region.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                    Response Commitment
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="text-sm text-white/90 font-medium">Within 3 Business Days</span>
                  </div>
                  <p className="text-xs text-white/50 mt-1">
                    Every message is directly reviewed by lead analyst Loago Montsho.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                    Professional Network
                  </h2>
                  <a
                    href="https://www.linkedin.com/company/blancdata/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#9fa3fc] hover:underline"
                  >
                    <span>Connect on LinkedIn</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Data Safety Note */}
              <div className="p-6 rounded-2xl bg-[#141414] border border-white/[0.04] space-y-2 text-xs text-white/50">
                <p className="font-semibold text-white/70">Confidentiality Guarantee</p>
                <p>
                  Information submitted through this form is transmitted securely via Resend and used exclusively to respond to your inquiry. We never share or sell client details.
                </p>
              </div>
            </div>

            {/* Right: Step-by-Step Form Tile */}
            <div className="lg:col-span-7 p-8 md:p-10 rounded-2xl bg-[#191919] border border-white/[0.08] shadow-2xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
