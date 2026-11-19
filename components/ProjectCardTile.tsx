'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Project } from '@/content/projects'

interface ProjectCardTileProps {
  project: Project
  initialExpanded?: boolean
}

export default function ProjectCardTile({ project, initialExpanded = false }: ProjectCardTileProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded)

  return (
    <div
      className={`border transition-all duration-300 rounded-2xl overflow-hidden bg-[#191919] ${
        isExpanded
          ? 'border-white/[0.25] shadow-2xl shadow-black/40 ring-1 ring-white/10'
          : 'border-white/[0.08] hover:border-white/[0.18] hover:bg-[#1c1c1c]'
      }`}
    >
      {/* ── Main Tile Header / Summary ── */}
      <div className="p-6 md:p-8 flex flex-col gap-5">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70">
            {project.sector}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${
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

        {/* Project Title */}
        <div>
          <h3 className="text-2xl font-medium text-white tracking-tight leading-snug">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-[#9fa3fc] font-normal leading-relaxed">
            {project.question}
          </p>
        </div>

        {/* Short Summary */}
        <p className="text-sm md:text-base text-white/65 leading-relaxed">
          {project.summary}
        </p>

        {/* Tech Stack & Data Source Pill Group */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs text-white/40 mr-1">Stack:</span>
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#121212] border border-white/[0.08] text-white/80"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Tile Action Bar */}
        <div className="pt-4 mt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.1] px-4 py-2 rounded-lg transition-all"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Collapse Architecture & Details' : 'Expand Project Breakdown'}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <Link
            href={`/projects/${project.slug}`}
            className="text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Permanent URL</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Expanded Deep-Dive Details ── */}
      {isExpanded && project.detail && (
        <div className="border-t border-white/[0.1] bg-[#141414] p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">
              System Architecture & Methodology
            </h4>
            <span className="text-xs text-white/40">Data Source: {project.dataSource}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Challenge & Problem Statement */}
            <div className="p-5 rounded-xl bg-[#191919] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2 text-white">
                <span className="w-2 h-2 rounded-full bg-[#9fa3fc]"></span>
                <span className="text-xs uppercase font-semibold tracking-wider text-white/80">Business Problem</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                {project.detail.problem}
              </p>
            </div>

            {/* Ingested Dataset */}
            <div className="p-5 rounded-xl bg-[#191919] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2 text-white">
                <span className="w-2 h-2 rounded-full bg-[#9fa3fc]"></span>
                <span className="text-xs uppercase font-semibold tracking-wider text-white/80">Data Inputs</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                {project.detail.data}
              </p>
            </div>
          </div>

          {/* Pipeline Architecture Diagram / Description */}
          {project.detail.architecture && (
            <div className="p-5 rounded-xl bg-[#191919] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-xs uppercase font-semibold tracking-wider text-white/80">Pipeline Flow</span>
              </div>
              <div className="font-mono text-xs md:text-sm text-emerald-300/90 bg-[#0d0d0d] p-3 rounded-lg border border-white/[0.04] overflow-x-auto">
                {project.detail.architecture}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Methodology & ML */}
            <div className="p-5 rounded-xl bg-[#191919] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span className="text-xs uppercase font-semibold tracking-wider text-white/80">Machine Learning & Analysis</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                {project.detail.method}
              </p>
            </div>

            {/* Result & Deliverables */}
            <div className="p-5 rounded-xl bg-[#191919] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span className="text-xs uppercase font-semibold tracking-wider text-white/80">Application & Results</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                {project.detail.result}
              </p>
            </div>
          </div>

          {/* Limitations and Disclaimer */}
          <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.04] text-xs text-white/50 space-y-2">
            <p>
              <strong className="text-white/70">Analytical Scope & Limitations:</strong> {project.detail.limits}
            </p>
            {project.disclaimer && (
              <p className="italic text-white/40">
                {project.disclaimer}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
