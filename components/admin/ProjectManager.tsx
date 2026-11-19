'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Project, ProjectStatus } from '@/content/projects'

const emptyProject: Project = {
  id: '',
  slug: '',
  title: '',
  sector: '',
  question: '',
  dataSource: '',
  tools: [],
  status: 'in-progress',
  summary: '',
  detail: {
    problem: '',
    data: '',
    method: '',
    result: '',
    limits: '',
    techStack: [],
    architecture: '',
  },
  disclaimer: '',
  demoUrl: '',
}

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Edit / Create state
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [activeTab, setActiveTab] = useState<'basic' | 'technical'>('basic')
  const [toolsInput, setToolsInput] = useState('')

  // Search
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch projects on load
  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/projects')
      if (!res.ok) throw new Error('Failed to fetch projects')
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error loading projects')
    } finally {
      setLoading(false)
    }
  }

  function handleOpenCreate() {
    setIsCreating(true)
    setEditingProject({
      ...emptyProject,
      id: `proj-${Date.now().toString().slice(-6)}`,
    })
    setToolsInput('')
    setActiveTab('basic')
  }

  function handleOpenEdit(project: Project) {
    setIsCreating(false)
    setEditingProject({
      ...project,
      detail: project.detail || { ...emptyProject.detail! },
    })
    setToolsInput((project.tools || []).join(', '))
    setActiveTab('basic')
  }

  function handleCloseModal() {
    setEditingProject(null)
    setIsCreating(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!editingProject) return
    if (!editingProject.title.trim()) {
      setError('Project title is required.')
      return
    }

    setSaving(true)
    setError(null)
    setSuccess(null)

    // Process tools
    const toolsArray = toolsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const payload: Project = {
      ...editingProject,
      tools: toolsArray,
      slug:
        editingProject.slug.trim() ||
        editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      detail: {
        ...editingProject.detail!,
        techStack: toolsArray,
      },
    }

    try {
      const method = isCreating ? 'POST' : 'PUT'
      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to save project')
      }

      setSuccess(isCreating ? 'Project created successfully!' : 'Project updated successfully!')
      handleCloseModal()
      fetchProjects()
      setTimeout(() => setSuccess(null), 4000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error saving project')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(project: Project) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${project.title}"? This cannot be undone.`
    )
    if (!confirmDelete) return

    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/projects?id=${encodeURIComponent(project.id)}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to delete project')
      }

      setSuccess(`Project "${project.title}" deleted.`)
      fetchProjects()
      setTimeout(() => setSuccess(null), 4000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error deleting project')
    } finally {
      setSaving(false)
    }
  }

  async function handleQuickStatusChange(project: Project, newStatus: ProjectStatus) {
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...project, status: newStatus }),
      })
      if (!res.ok) throw new Error('Failed to update status')
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, status: newStatus } : p))
      )
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    }
  }

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tools || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-8">
      {/* ── Top Bar with Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-white">Project Manager</h1>
          <p className="text-sm text-white/60 mt-1">
            Create, edit, and publish technical case studies displayed on the public site.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-white text-black text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-md shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create New Project</span>
        </button>
      </div>

      {/* ── Feedback Messages ── */}
      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-sm text-emerald-300 flex items-center justify-between">
          <span>{success}</span>
          <button onClick={() => setSuccess(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-sm text-red-300 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-white">✕</button>
        </div>
      )}

      {/* ── Search & Filter ── */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search projects by title, sector, or tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181818] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-white/40 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Project List ── */}
      {loading ? (
        <div className="p-12 text-center text-sm text-white/50">Loading projects...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#181818] border border-white/[0.06] text-center space-y-3">
          <p className="text-base text-white/70">No projects found.</p>
          <button onClick={handleOpenCreate} className="text-xs text-[#9fa3fc] hover:underline">
            Click here to add your first project.
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl bg-[#191919] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    {project.sector}
                  </span>
                  <span className="text-white/20">·</span>
                  {/* Status Dropdown */}
                  <select
                    value={project.status}
                    onChange={(e) => handleQuickStatusChange(project, e.target.value as ProjectStatus)}
                    aria-label={`Status for ${project.title}`}
                    className={`text-xs px-2.5 py-0.5 rounded-full border bg-transparent cursor-pointer font-medium focus:outline-none ${
                      project.status === 'complete'
                        ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                        : project.status === 'in-progress'
                        ? 'border-amber-500/40 text-amber-400 bg-amber-500/10'
                        : 'border-white/20 text-white/40 bg-white/5'
                    }`}
                  >
                    <option value="complete" className="bg-[#191919] text-emerald-400">Complete</option>
                    <option value="in-progress" className="bg-[#191919] text-amber-400">In Progress</option>
                    <option value="hidden" className="bg-[#191919] text-white/50">Hidden (Draft)</option>
                  </select>
                </div>

                <h3 className="text-xl font-medium text-white truncate">{project.title}</h3>
                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                  {project.summary || 'No summary provided.'}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(project.tools || []).map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#121212] border border-white/[0.06] text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
                <button
                  onClick={() => handleOpenEdit(project)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.08] hover:bg-white text-white hover:text-black text-xs font-semibold transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span>Edit</span>
                </button>

                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  className="p-2 rounded-lg border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.05] transition-all"
                  title="View on live website"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <button
                  onClick={() => handleDelete(project)}
                  className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                  title="Delete project"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Edit / Create Project Modal ── */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#161616] border border-white/[0.12] rounded-2xl w-full max-w-3xl my-8 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium text-white">
                  {isCreating ? 'Create New Project' : `Edit: ${editingProject.title}`}
                </h2>
                <p className="text-xs text-white/50 mt-0.5">
                  ID: <code className="text-[#9fa3fc]">{editingProject.id}</code>
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-white/40 hover:text-white p-2 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-white/[0.08] bg-[#121212]">
              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase transition-all ${
                  activeTab === 'basic'
                    ? 'text-white border-b-2 border-white bg-white/[0.04]'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                1. Basic Info & Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('technical')}
                className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase transition-all ${
                  activeTab === 'technical'
                    ? 'text-white border-b-2 border-white bg-white/[0.04]'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                2. Technical Architecture & Analysis
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="project-title" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                        Project Title *
                      </label>
                      <input
                        id="project-title"
                        type="text"
                        required
                        value={editingProject.title}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            title: e.target.value,
                            slug: editingProject.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                          })
                        }
                        className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label htmlFor="project-slug" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                        URL Slug
                      </label>
                      <input
                        id="project-slug"
                        type="text"
                        value={editingProject.slug}
                        onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                        className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm font-mono text-[#9fa3fc] focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="project-sector" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                        Sector *
                      </label>
                      <input
                        id="project-sector"
                        type="text"
                        required
                        placeholder="e.g. Agriculture Crop Farming, Credit Risk"
                        value={editingProject.sector}
                        onChange={(e) => setEditingProject({ ...editingProject, sector: e.target.value })}
                        className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label htmlFor="project-status" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                        Publish Status
                      </label>
                      <select
                        id="project-status"
                        value={editingProject.status}
                        onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as ProjectStatus })}
                        className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                      >
                        <option value="complete">Complete (Published)</option>
                        <option value="in-progress">In Progress (Published)</option>
                        <option value="hidden">Hidden / Draft (Internal only)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="project-question" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                      Core Analytical Question
                    </label>
                    <input
                      id="project-question"
                      type="text"
                      placeholder="e.g. Which variables most strongly predict default?"
                      value={editingProject.question}
                      onChange={(e) => setEditingProject({ ...editingProject, question: e.target.value })}
                      className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="project-summary" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                      Short Summary (Visible on Home & Portfolio card)
                    </label>
                    <textarea
                      id="project-summary"
                      rows={3}
                      value={editingProject.summary}
                      onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                      className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="project-datasource" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                        Data Source
                      </label>
                      <input
                        id="project-datasource"
                        type="text"
                        placeholder="e.g. Kaggle Public Agricultural Records"
                        value={editingProject.dataSource}
                        onChange={(e) => setEditingProject({ ...editingProject, dataSource: e.target.value })}
                        className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label htmlFor="project-tools" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                        Tools & Stack (Comma separated)
                      </label>
                      <input
                        id="project-tools"
                        type="text"
                        placeholder="Databricks, PySpark, Delta Lake, Streamlit"
                        value={toolsInput}
                        onChange={(e) => setToolsInput(e.target.value)}
                        className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm font-mono text-white focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'technical' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="project-problem" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                      Business Problem & Challenge
                    </label>
                    <textarea
                      id="project-problem"
                      rows={3}
                      value={editingProject.detail?.problem || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          detail: { ...editingProject.detail!, problem: e.target.value },
                        })
                      }
                      className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="project-data" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                      Data Inputs & Features
                    </label>
                    <textarea
                      id="project-data"
                      rows={2}
                      value={editingProject.detail?.data || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          detail: { ...editingProject.detail!, data: e.target.value },
                        })
                      }
                      className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="project-architecture" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                      Pipeline Flow / Architecture
                    </label>
                    <input
                      id="project-architecture"
                      type="text"
                      placeholder="e.g. Bronze (raw ingestion) → Silver (cleaning) → Gold (feature store) → ML scoring"
                      value={editingProject.detail?.architecture || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          detail: { ...editingProject.detail!, architecture: e.target.value },
                        })
                      }
                      className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm font-mono text-emerald-300 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="project-method" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                        Machine Learning & Methodology
                      </label>
                      <textarea
                        id="project-method"
                        rows={3}
                        value={editingProject.detail?.method || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            detail: { ...editingProject.detail!, method: e.target.value },
                          })
                        }
                        className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-white/30 resize-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="project-result" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                        Result & UI Deliverables
                      </label>
                      <textarea
                        id="project-result"
                        rows={3}
                        value={editingProject.detail?.result || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            detail: { ...editingProject.detail!, result: e.target.value },
                          })
                        }
                        className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-white/30 resize-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="project-limits" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                      Analytical Scope & Limitations
                    </label>
                    <input
                      id="project-limits"
                      type="text"
                      value={editingProject.detail?.limits || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          detail: { ...editingProject.detail!, limits: e.target.value },
                        })
                      }
                      className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="project-disclaimer" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                      Official Disclaimer
                    </label>
                    <input
                      id="project-disclaimer"
                      type="text"
                      value={editingProject.disclaimer || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, disclaimer: e.target.value })}
                      className="w-full bg-[#111111] border border-white/[0.08] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg border border-white/[0.1] text-xs font-medium text-white/70 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-white text-black text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-white/90 active:scale-95 transition-all shadow-md disabled:opacity-60"
                >
                  {saving ? 'Saving...' : isCreating ? 'Create Project' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
