import projectsData from './projects.json'

export type ProjectStatus = 'complete' | 'in-progress' | 'hidden'

export interface ProjectDetail {
  problem: string
  data: string
  method: string
  result: string
  limits: string
  techStack: string[]
  architecture?: string
}

export interface Project {
  id: string
  slug: string
  title: string
  sector: string
  question: string
  dataSource: string
  tools: string[]
  status: ProjectStatus
  summary: string
  detail?: ProjectDetail
  disclaimer?: string
  demoUrl?: string
}

export const projects: Project[] = projectsData as Project[]

export const publishedProjects: Project[] = (projectsData as Project[]).filter(
  (p) => p.status !== 'hidden'
)
