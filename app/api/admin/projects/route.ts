import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { getAllProjects, upsertProject, deleteProjectById } from '@/lib/db'
import { Project } from '@/content/projects'

/** Only this e-mail address is permitted to call admin API endpoints */
const ADMIN_EMAIL = 'hello@blancsociety.co.uk'

/** Shared auth + e-mail allowlist guard — returns null when access is denied */
async function requireAdmin(): Promise<NextResponse | null> {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized: Authentication required' }, { status: 401 })
  }

  const user = await currentUser()
  const primaryEmail = user?.emailAddresses?.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress

  if (!primaryEmail || primaryEmail.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 })
  }

  return null // access granted
}

// GET /api/admin/projects - Return all projects (Admin Protected)
export async function GET() {
  const denied = await requireAdmin()
  if (denied) return denied

  try {
    const projects = await getAllProjects()
    return NextResponse.json({ projects })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Database query failed' },
      { status: 500 }
    )
  }
}

// POST /api/admin/projects - Create a new project (Admin Protected)
export async function POST(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  try {
    const body = (await req.json()) as Partial<Project>
    if (!body.title || !body.sector) {
      return NextResponse.json({ error: 'Title and Sector are required' }, { status: 400 })
    }

    const id = (body.id || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30))
      .trim()
      .replace(/[^a-zA-Z0-9_-]/g, '')
    const slug = (body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
      .trim()
      .replace(/[^a-zA-Z0-9_-]/g, '')

    const newProject: Project = {
      id,
      slug,
      title: body.title.trim(),
      sector: body.sector.trim(),
      question: (body.question || '').trim(),
      dataSource: (body.dataSource || '').trim(),
      tools: Array.isArray(body.tools) ? body.tools.map((t) => String(t).trim()).filter(Boolean) : [],
      status: body.status || 'in-progress',
      summary: (body.summary || '').trim(),
      detail: body.detail || {
        problem: '',
        data: '',
        method: '',
        result: '',
        limits: '',
        techStack: Array.isArray(body.tools) ? body.tools : [],
        architecture: '',
      },
      disclaimer: (body.disclaimer || '').trim(),
      demoUrl: (body.demoUrl || '').trim(),
    }

    const saved = await upsertProject(newProject)
    return NextResponse.json({ success: true, project: saved }, { status: 201 })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create project' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/projects - Update an existing project (Admin Protected)
export async function PUT(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  try {
    const body = (await req.json()) as Project
    if (!body.id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    const sanitizedProject: Project = {
      ...body,
      id: String(body.id).trim(),
      slug: String(body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')).trim(),
      title: String(body.title || '').trim(),
      sector: String(body.sector || '').trim(),
      tools: Array.isArray(body.tools) ? body.tools.map((t) => String(t).trim()).filter(Boolean) : [],
      status: body.status || 'in-progress',
      summary: String(body.summary || '').trim(),
      detail: body.detail
        ? {
            problem: String(body.detail.problem || ''),
            data: String(body.detail.data || ''),
            method: String(body.detail.method || ''),
            result: String(body.detail.result || ''),
            limits: String(body.detail.limits || ''),
            techStack: Array.isArray(body.detail.techStack)
              ? body.detail.techStack
              : Array.isArray(body.tools)
              ? body.tools
              : [],
            architecture: body.detail.architecture ? String(body.detail.architecture) : undefined,
          }
        : undefined,
    }

    const updated = await upsertProject(sanitizedProject)
    return NextResponse.json({ success: true, project: updated })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/projects - Delete a project (Admin Protected)
export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Project ID parameter is required' }, { status: 400 })
    }

    await deleteProjectById(id)
    return NextResponse.json({ success: true, message: 'Project successfully deleted' })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to delete project' },
      { status: 500 }
    )
  }
}
