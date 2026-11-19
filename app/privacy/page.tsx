import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Blanc Data handles, processes, and protects personal information submitted through our site.',
}

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. What We Collect',
      body: 'When you submit our contact form, we collect your name, email address, message details, and optional phone number or organisation name. We also record which source channel (e.g. LinkedIn, referral, search) brought you to Blanc Data.',
    },
    {
      title: '2. Purpose of Collection',
      body: 'We collect this information exclusively to communicate with you regarding your inquiry, assess your technical requirements, and arrange consultations. We do not use your information for unsolicited newsletters or marketing lists.',
    },
    {
      title: '3. Processing & Storage',
      body: 'Inquiry emails are processed through Resend (a GDPR-compliant transactional email platform) and delivered directly to hello@blancsociety.co.uk. The website is served via Cloudflare Pages. We do not store form submissions in public databases.',
    },
    {
      title: '4. Data Retention',
      body: 'Inquiry records are retained only as long as necessary to complete commercial conversations or maintain legitimate audit trails. You may request permanent deletion of your contact history at any time.',
    },
    {
      title: '5. Your Rights',
      body: 'You have the right to request access to any personal records held, request correction, or request immediate deletion under applicable data protection legislation.',
    },
    {
      title: '6. Direct Contact',
      body: 'For privacy inquiries or deletion requests, contact our data lead at hello@blancsociety.co.uk (Blanc Data, Gaborone, Botswana).',
    },
  ]

  return (
    <div className="flex flex-col">
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#121212]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] block mb-3">
            Legal & Governance
          </span>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-white/50">
            Last Updated: November 2026 · Blanc Data (Gaborone, Botswana)
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="p-6 md:p-8 rounded-2xl bg-[#171717] border border-white/[0.06] space-y-3"
            >
              <h2 className="text-xl font-medium text-white">{section.title}</h2>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}

          <div className="pt-6 flex justify-between items-center text-sm text-white/50">
            <Link href="/" className="hover:text-white transition-colors">
              ← Return to Home
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Have questions? Contact us →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
