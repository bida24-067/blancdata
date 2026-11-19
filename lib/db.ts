import fs from 'fs/promises'
import path from 'path'
import { Project, projects as staticProjects } from '@/content/projects'

interface D1Result<T = unknown> {
  results: T[]
  success: boolean
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement
  first<T = unknown>(colName?: string): Promise<T | null>
  all<T = unknown>(): Promise<D1Result<T>>
  run<T = unknown>(): Promise<D1Result<T>>
}

interface D1Database {
  prepare(query: string): D1PreparedStatement
}

const localProjectsFile = path.join(process.cwd(), 'content', 'projects.json')

// Get Cloudflare D1 Database binding if present
function getD1Database(): D1Database | null {
  try {
    // In Cloudflare Pages / Workers runtime, bindings are exposed globally or via process.env
    const globalObj = globalThis as unknown as { DB?: D1Database }
    if (globalObj.DB && typeof globalObj.DB.prepare === 'function') {
      return globalObj.DB
    }
    const envObj = process.env as unknown as { DB?: D1Database }
    if (envObj.DB && typeof envObj.DB.prepare === 'function') {
      return envObj.DB
    }
  } catch {
    // Not running inside Cloudflare runtime
  }
  return null
}

// ── Local Fallback File Readers ─────────────────────────────
async function readLocalProjects(): Promise<Project[]> {
  try {
    const raw = await fs.readFile(localProjectsFile, 'utf-8')
    const parsed = JSON.parse(raw) as Project[]
    if (Array.isArray(parsed) && parsed.length > 0) return parsed
  } catch {
    // Filesystem not available on Cloudflare Workers edge runtime
  }
  return staticProjects
}

async function writeLocalProjects(projects: Project[]): Promise<void> {
  try {
    await fs.writeFile(localProjectsFile, JSON.stringify(projects, null, 2), 'utf-8')
  } catch {
    // Non-fatal on edge environments where filesystem is read-only
  }
}

// Convert D1 database row into typed Project object
function mapRowToProject(row: Record<string, unknown>): Project {
  let tools: string[] = []
  try {
    tools = typeof row.tools === 'string' ? JSON.parse(row.tools) : (row.tools as string[]) || []
  } catch {
    tools = []
  }

  let detail: Project['detail']
  try {
    detail = typeof row.detail === 'string' ? JSON.parse(row.detail) : (row.detail as Project['detail'])
  } catch {
    detail = undefined
  }

  return {
    id: String(row.id || ''),
    slug: String(row.slug || ''),
    title: String(row.title || ''),
    sector: String(row.sector || ''),
    question: String(row.question || ''),
    dataSource: String(row.data_source || ''),
    tools,
    status: (row.status as Project['status']) || 'in-progress',
    summary: String(row.summary || ''),
    detail,
    disclaimer: row.disclaimer ? String(row.disclaimer) : undefined,
    demoUrl: row.demo_url ? String(row.demo_url) : undefined,
  }
}

// ── Public & Admin Query Methods ────────────────────────────

/**
 * Fetch all projects (including hidden ones for Admin)
 */
export async function getAllProjects(): Promise<Project[]> {
  const db = getD1Database()
  if (db) {
    try {
      const res = await db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all<Record<string, unknown>>()
      if (res.results && res.results.length > 0) {
        return res.results.map(mapRowToProject)
      }
    } catch (err) {
      console.error('Error querying Cloudflare D1:', err)
    }
  }
  return readLocalProjects()
}

/**
 * Fetch published projects only (complete and in-progress)
 */
export async function getPublishedProjects(): Promise<Project[]> {
  const db = getD1Database()
  if (db) {
    try {
      const res = await db
        .prepare("SELECT * FROM projects WHERE status != 'hidden' ORDER BY created_at DESC")
        .all<Record<string, unknown>>()
      if (res.results && res.results.length > 0) {
        return res.results.map(mapRowToProject)
      }
    } catch (err) {
      console.error('Error querying Cloudflare D1:', err)
    }
  }
  const all = await readLocalProjects()
  return all.filter((p) => p.status !== 'hidden')
}

/**
 * Fetch a single project by URL slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const db = getD1Database()
  if (db) {
    try {
      // Secure parameterized prepared query
      const row = await db
        .prepare('SELECT * FROM projects WHERE slug = ? LIMIT 1')
        .bind(slug)
        .first<Record<string, unknown>>()
      if (row) return mapRowToProject(row)
    } catch (err) {
      console.error('Error querying Cloudflare D1 by slug:', err)
    }
  }
  const all = await readLocalProjects()
  return all.find((p) => p.slug === slug) || null
}

/**
 * Insert or update a project (Admin only)
 */
export async function upsertProject(project: Project): Promise<Project> {
  const db = getD1Database()
  const toolsJson = JSON.stringify(project.tools || [])
  const detailJson = JSON.stringify(project.detail || {})

  if (db) {
    // Parameterized prepared query to prevent SQL injection
    await db
      .prepare(`
        INSERT INTO projects (
          id, slug, title, sector, question, data_source, tools, status, summary, detail, disclaimer, demo_url, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, unixepoch())
        ON CONFLICT(id) DO UPDATE SET
          slug = excluded.slug,
          title = excluded.title,
          sector = excluded.sector,
          question = excluded.question,
          data_source = excluded.data_source,
          tools = excluded.tools,
          status = excluded.status,
          summary = excluded.summary,
          detail = excluded.detail,
          disclaimer = excluded.disclaimer,
          demo_url = excluded.demo_url,
          updated_at = unixepoch()
      `)
      .bind(
        project.id,
        project.slug,
        project.title,
        project.sector,
        project.question || '',
        project.dataSource || '',
        toolsJson,
        project.status,
        project.summary || '',
        detailJson,
        project.disclaimer || '',
        project.demoUrl || ''
      )
      .run()
  }

  // Also sync to local file for offline access
  const all = await readLocalProjects()
  const idx = all.findIndex((p) => p.id === project.id)
  if (idx >= 0) {
    all[idx] = project
  } else {
    all.unshift(project)
  }
  await writeLocalProjects(all)

  return project
}

/**
 * Delete a project by ID (Admin only)
 */
export async function deleteProjectById(id: string): Promise<boolean> {
  const db = getD1Database()
  if (db) {
    await db.prepare('DELETE FROM projects WHERE id = ?').bind(id).run()
  }

  const all = await readLocalProjects()
  const filtered = all.filter((p) => p.id !== id)
  await writeLocalProjects(filtered)

  return true
}
