import type { Metadata } from 'next'
import Link from 'next/link'
import { getPublishedProjects } from '@/lib/db'
import ProjectCardTile from '@/components/ProjectCardTile'

export const metadata: Metadata = {
  title: 'Portfolio Projects & Technical Architecture',
  description:
    'Explore Blanc Data portfolio of agricultural intelligence, credit underwriting pipelines, and Databricks data architectures built on public datasets in Botswana and the SADC region.',
}

export default async function ProjectsPage() {
  const publishedProjects = await getPublishedProjects()

  return (
    <div className="flex flex-col">
      {/* ── Header ── */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] block mb-3">
              Portfolio & Prototypes
            </span>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
              Production data pipelines and analytics systems.
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              These are live end-to-end prototypes built from published and public datasets. Each tile below outlines the analytical objectives, data flow, ML model specifics, and user interface.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-white/40">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Click on any project tile to expand its full architecture & technical method.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Tiles Grid ── */}
      <section className="py-16 md:py-24 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="text-sm font-medium text-white/70">
              Showing {publishedProjects.length} Verified Solutions
            </div>
            <div className="text-xs text-white/40">
              Independent Prototypes · Public Data
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {publishedProjects.map((project, idx) => (
              <ProjectCardTile
                key={project.id}
                project={project}
                initialExpanded={idx === 0} // First project open by default for neat instant inspection
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Method Note & CTA ── */}
      <section className="py-16 border-t border-white/[0.08] bg-[#121212]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-medium text-white">
            Need custom data modelling for your proprietary records?
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
            We adapt these exact pipeline patterns to your internal spreadsheets, accounting packages, and transaction logs under strict non-disclosure.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-all shadow-md"
            >
              <span>Discuss your data requirements</span>
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
