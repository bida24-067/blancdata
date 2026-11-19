import type { Metadata } from 'next'
import Link from 'next/link'
import { team } from '@/content/team'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'About Us · Leadership & Methodology',
  description: 'Blanc Data is a data consultancy in Gaborone, Botswana. Meet founder Loago Montsho, our analysts, and our operating commitments.',
  alternates: { canonical: 'https://blancsociety.co.uk/about' },
  openGraph: {
    title: 'About Blanc Data · Leadership & Methodology',
    description: 'Blanc Data is a data consultancy in Gaborone, Botswana. Meet founder Loago Montsho, our analysts, and our operating commitments.',
    url: 'https://blancsociety.co.uk/about',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'About Blanc Data' }],
  },
}

const commitments = [
  {
    title: 'Source Transparency',
    body: 'We show our sources. Every chart, model parameter, and forecast links directly back to verified data provenance.',
  },
  {
    title: 'Prototype Before Pitch',
    body: 'We build an early working prototype before you commit. You validate the real pipeline output before any enterprise rollout.',
  },
  {
    title: 'Strict Confidentiality',
    body: 'We use your data solely for your project and nothing else. Zero multi-tenant leaks, zero third-party AI training on your records.',
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: 'https://blancsociety.co.uk' },
          { name: 'About', href: 'https://blancsociety.co.uk/about' },
        ]}
      />
      {/* ── Header ── */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] block mb-3">
              About Blanc Data
            </span>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
              Engineering clarity from complex data environments.
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              Blanc Data is a data consultancy based in Gaborone, Botswana. We design dashboards, build clean ETL pipelines, and execute predictive modelling for organisations that have vast records but lack the time or specialised engineering to extract value.
            </p>
          </div>
        </div>
      </section>

      {/* ── Narrative & Origin ── */}
      <section className="py-16 md:py-20 bg-[#0f0f0f] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="p-8 rounded-2xl bg-[#171717] border border-white/[0.06] space-y-4">
              <h2 className="text-2xl font-medium text-white">Our Focus in Botswana</h2>
              <p className="text-sm md:text-base text-white/65 leading-relaxed">
                We started by identifying the questions Botswana&apos;s published economic, agricultural, and financial data can already answer. Rather than making vague claims, we engineered end-to-end prototypes on verifiable public data—proving our architecture before pitching commercial clients.
              </p>
              <p className="text-sm md:text-base text-white/65 leading-relaxed">
                Our approach pairs modern cloud data lakehouses (Databricks, Delta Lake, PySpark) with accessible operational interfaces (Power BI, Streamlit).
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#171717] border border-white/[0.06] space-y-4">
              <h2 className="text-2xl font-medium text-white">The Quality Standard</h2>
              <p className="text-sm md:text-base text-white/65 leading-relaxed">
                We believe executive leadership should never be handed a &quot;black-box&quot; model or an unvalidated spreadsheet. Every calculation we produce is documented down to its schema transformation, statistical error margin, and data lineage.
              </p>
              <div className="pt-2">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                  Lean Six Sigma & Medallion Pipeline Architecture
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership & Team Cards ── */}
      <section className="py-16 md:py-24 bg-[#121212] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] block mb-2">
              People & Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
              The Analytical Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="p-8 rounded-2xl bg-[#191919] border border-white/[0.08] hover:border-white/[0.18] flex flex-col justify-between transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-xl font-bold text-white/80 shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-medium text-white">{member.name}</h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#9fa3fc]">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-white/65 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Contact Channels */}
                  {(member.email || member.linkedin || member.instagram) && (
                    <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
                          aria-label={`Email ${member.name}`}
                        >
                          <svg className="w-3.5 h-3.5 text-[#9fa3fc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                          <span>{member.email}</span>
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
                          aria-label={`${member.name}'s LinkedIn profile`}
                        >
                          <svg className="w-3.5 h-3.5 text-[#9fa3fc]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74V9.96H5.06v8.54h2.8z" />
                          </svg>
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
                          aria-label={`${member.name}'s Instagram profile`}
                        >
                          <svg className="w-3.5 h-3.5 text-[#9fa3fc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                          </svg>
                          <span>Instagram</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {member.skills && member.skills.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                    {member.skills.map((tag) => (
                      <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#121212] border border-white/[0.06] text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Operating Commitments (Tiles) ── */}
      <section className="py-16 md:py-24 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] block mb-2">
              Our Principles
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
              How we work with clients.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commitments.map((c, idx) => (
              <div
                key={c.title}
                className="p-6 md:p-8 rounded-2xl bg-[#161616] border border-white/[0.06] space-y-3"
              >
                <span className="font-mono text-xs text-white/30">0{idx + 1}</span>
                <h3 className="text-xl font-medium text-white">{c.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-2xl bg-[#1a1a1a] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-medium text-white mb-1">
                Ready to review what your data can do?
              </h3>
              <p className="text-sm text-white/60">
                Let&apos;s set up an introductory discussion with our analytics team in Gaborone.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-all shrink-0 shadow-md"
            >
              <span>Get in touch</span>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
