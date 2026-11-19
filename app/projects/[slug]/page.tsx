import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getProjectBySlug, getPublishedProjects } from '@/lib/db'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} · Case Study`,
    description: project.summary,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <article className="flex flex-col">
      {/* ── Header ── */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#121212]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-6">
            <Link href="/projects" className="text-white hover:underline">
              Projects
            </Link>
            <span>/</span>
            <span className="text-[#9fa3fc]">{project.sector}</span>
          </div>

          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white max-w-3xl">
              {project.title}
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full border ${
                project.status === 'complete'
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                  : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  project.status === 'complete' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                }`}
              />
              {project.status === 'complete' ? 'Completed Pipeline' : 'Prototype In Progress'}
            </span>
          </div>

          <p className="text-lg text-white/60 max-w-3xl leading-relaxed mt-4">
            {project.summary}
          </p>

          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
            <span className="text-xs text-white/40 mr-2">Technologies Used:</span>
            {project.tools.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1 bg-[#191919] border border-white/[0.08] rounded-md text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Detailed Structured Tiles ── */}
      {project.detail && (
        <section className="py-16 md:py-24 bg-[#0e0e0e]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Core Question Tile */}
            <div className="p-8 rounded-2xl bg-[#171717] border border-white/[0.08] space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9fa3fc]">
                Core Analytical Question
              </span>
              <p className="text-xl md:text-2xl text-white font-medium leading-snug">
                &ldquo;{project.question}&rdquo;
              </p>
            </div>

            {/* Problem & Ingestion Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-[#171717] border border-white/[0.06] space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Business Problem & Objectives
                </h2>
                <p className="text-sm md:text-base text-white/65 leading-relaxed">
                  {project.detail.problem}
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#171717] border border-white/[0.06] space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Ingested Data Inputs
                </h2>
                <p className="text-sm md:text-base text-white/65 leading-relaxed">
                  {project.detail.data}
                </p>
                <p className="text-xs text-white/40 pt-2 border-t border-white/[0.04]">
                  Source: {project.dataSource}
                </p>
              </div>
            </div>

            {/* Architecture Pipeline Tile */}
            {project.detail.architecture && (
              <div className="p-8 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Data Pipeline Architecture
                </h2>
                <div className="p-4 rounded-xl bg-[#0b0b0b] border border-white/[0.05] font-mono text-xs md:text-sm text-emerald-300/90 leading-relaxed overflow-x-auto">
                  {project.detail.architecture}
                </div>
              </div>
            )}

            {/* Methodology & Application Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-[#171717] border border-white/[0.06] space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Machine Learning & Statistical Method
                </h2>
                <p className="text-sm md:text-base text-white/65 leading-relaxed">
                  {project.detail.method}
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#171717] border border-white/[0.06] space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Decision Engine & User Interface
                </h2>
                <p className="text-sm md:text-base text-white/65 leading-relaxed">
                  {project.detail.result}
                </p>
              </div>
            </div>

            {/* Scope Limitations & Disclaimer */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/[0.04] space-y-3 text-xs text-white/50">
              <p>
                <strong className="text-white/70">Analytical Scope:</strong> {project.detail.limits}
              </p>
              {project.disclaimer && (
                <p className="italic text-white/40 pt-2 border-t border-white/[0.04]">
                  {project.disclaimer}
                </p>
              )}
            </div>

            {/* Bottom Navigation */}
            <div className="pt-8 border-t border-white/[0.08] flex items-center justify-between">
              <Link
                href="/projects"
                className="text-sm text-white/60 hover:text-white flex items-center gap-2 transition-colors"
              >
                <span>← Back to all projects</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-black text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-all shadow-sm"
              >
                <span>Inquire about this project</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
