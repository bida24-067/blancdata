import { MetadataRoute } from 'next'
import { getPublishedProjects } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://blancsociety.co.uk'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/services`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/projects`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/about`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${base}/privacy`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const publishedProjects = await getPublishedProjects()
  const projectRoutes: MetadataRoute.Sitemap = publishedProjects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...projectRoutes]
}
