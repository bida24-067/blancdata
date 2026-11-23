import Link from 'next/link'
import Image from 'next/image'
import { services } from '@/content/services'
import { getPublishedProjects } from '@/lib/db'
import ProjectCardTile from '@/components/ProjectCardTile'

const steps = [
  { n: '01', title: 'Scope', body: 'We agree on the core question, the source data, and exact definition of done.' },
  { n: '02', title: 'Prototype', body: 'You see an early working model on real sample data before committing.' },
  { n: '03', title: 'Deliver', body: 'We complete the automated pipeline, models, and rigorous documentation.' },
  { n: '04', title: 'Hand over', body: 'You receive complete source code, dashboards, and an executive walkthrough.' },
]

export default async function HomePage() {
  const publishedProjects = await getPublishedProjects()

  return (
    <div className="flex flex-col">
      {/* ── Hero Section ── */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-[#121212] border-b border-white/[0.08]">
        {/* Background Image at 45% opacity */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/background.webp"
            alt=""
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/40 via-transparent to-[#121212]" />
        </div>

        {/* Glow backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 z-0"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(159, 163, 252, 0.18) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-medium text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Data Consultancy · Gaborone, Botswana</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
              Data analytics for organisations in Botswana.
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl font-normal leading-relaxed">
              Blanc Data turns fragmented spreadsheets and records into automated dashboards, analytical pipelines, and predictive models you can check and reuse.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-md"
              >
                <span>Start a project</span>
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white text-sm font-medium px-6 py-3 rounded-full border border-white/[0.1] transition-all"
              >
                <span>Explore project prototypes</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities Overview (Cards & Tiles) ── */}
      <section className="py-20 md:py-28 bg-[#0f0f0f] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] block mb-2">
                What We Build
              </span>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                Core services & data solutions.
              </h2>
            </div>
            <Link
              href="/services"
              className="text-sm font-medium text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>View full service breakdowns & deliverables</span>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, idx) => (
              <div
                key={s.id}
                className="p-6 rounded-2xl bg-[#191919] border border-white/[0.08] hover:border-white/[0.2] flex flex-col justify-between transition-all group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-sm text-white/60">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-medium text-white group-hover:text-[#9fa3fc] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {s.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/[0.06]">
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-xs font-semibold text-white/70 group-hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Read deliverables</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Work (Interactive Expandable Project Tiles) ── */}
      <section className="py-20 md:py-28 bg-[#121212] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] block mb-2">
                Technical Case Studies
              </span>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-3">
                Recent project prototypes.
              </h2>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                Click any tile to expand the end-to-end data processing layers, ML classification models, and user interfaces built on Databricks & PySpark.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-all shrink-0"
            >
              <span>View all projects</span>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {publishedProjects.map((project) => (
              <ProjectCardTile key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Project Execution Workflow (Tiles) ── */}
      <section className="py-20 md:py-28 bg-[#0e0e0e] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] block mb-2">
              Engagement Framework
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
              How a project runs from start to delivery.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.n}
                className="p-6 rounded-2xl bg-[#171717] border border-white/[0.06] space-y-4"
              >
                <div className="text-3xl font-mono font-semibold text-white/20">
                  {step.n}
                </div>
                <h3 className="text-xl font-medium text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA Tile ── */}
      <section className="py-24 bg-[#121212] text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
            Bring us a question your data should be able to answer.
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Tell us about your data challenges in Gaborone and beyond. We respond within 3 business days with an initial scoping review.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-lg"
            >
              <span>Start a project inquiry</span>
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
