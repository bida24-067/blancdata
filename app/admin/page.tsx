import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAllProjects } from '@/lib/db'

export default async function AdminDashboard() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  const user = await currentUser()

  const projects = await getAllProjects()
  const completedCount = projects.filter((p) => p.status === 'complete').length
  const inProgressCount = projects.filter((p) => p.status === 'in-progress').length
  const hiddenCount = projects.filter((p) => p.status === 'hidden').length

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400 block mb-2">
          Administrator Dashboard
        </span>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
          Welcome back{user?.firstName ? `, ${user.firstName}` : ''}.
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Manage your portfolio case studies, technical breakdowns, and website inquiries.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-[#191919] border border-white/[0.08] space-y-1">
          <p className="text-3xl font-semibold text-white">{projects.length}</p>
          <p className="text-xs uppercase tracking-wider text-white/50">Total Projects</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#191919] border border-white/[0.08] space-y-1">
          <p className="text-3xl font-semibold text-emerald-400">{completedCount}</p>
          <p className="text-xs uppercase tracking-wider text-white/50">Completed</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#191919] border border-white/[0.08] space-y-1">
          <p className="text-3xl font-semibold text-amber-400">{inProgressCount}</p>
          <p className="text-xs uppercase tracking-wider text-white/50">In Progress</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#191919] border border-white/[0.08] space-y-1">
          <p className="text-3xl font-semibold text-white/40">{hiddenCount}</p>
          <p className="text-xs uppercase tracking-wider text-white/50">Drafts / Hidden</p>
        </div>
      </div>

      {/* Action Tile */}
      <div className="p-8 rounded-2xl bg-[#171717] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-xl font-medium text-white">Manage & Edit Project Portfolio</h2>
          <p className="text-sm text-white/60">
            Add new Databricks pipelines, modify architecture descriptions, or toggle project visibility.
          </p>
        </div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 bg-white text-black text-xs font-semibold px-5 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-md shrink-0"
        >
          <span>Open Projects Manager</span>
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
