import { MetadataRoute } from 'next'
import { getPublishedProjects } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://blancsociety.co.uk'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                lastModified: new Date('2026-11-01'), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/services`,  lastModified: new Date('2026-11-01'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/projects`,  lastModified: new Date('2026-11-01'), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/about`,     lastModified: new Date('2026-11-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`,   lastModified: new Date('2026-10-01'), changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${base}/help`,      lastModified: new Date('2026-11-23'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`,   lastModified: new Date('2026-10-01'), changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const publishedProjects = await getPublishedProjects()
  const projectRoutes: MetadataRoute.Sitemap = publishedProjects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date('2026-11-01'),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...projectRoutes]
}
