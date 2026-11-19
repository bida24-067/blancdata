import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import ProjectManager from '@/components/admin/ProjectManager'

export default async function AdminProjectsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return (
    <div className="max-w-5xl mx-auto">
      <ProjectManager />
    </div>
  )
}
