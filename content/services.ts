export interface Service {
  id: string
  title: string
  description: string
  slug: string
}

export const services: Service[] = [
  {
    id: 'dashboards',
    title: 'Dashboards and reporting',
    description:
      'Interactive reports that update from your data, so you stop rebuilding the same spreadsheet each month.',
    slug: 'dashboards',
  },
  {
    id: 'cleaning',
    title: 'Data cleaning and extraction',
    description:
      'Turn PDFs, scattered spreadsheets and messy exports into one clean dataset you can query.',
    slug: 'cleaning',
  },
  {
    id: 'analysis',
    title: 'Market and sector analysis',
    description:
      'Trends, comparisons and concentration across a sector, built from published and public data.',
    slug: 'analysis',
  },
  {
    id: 'modelling',
    title: 'Predictive modelling',
    description:
      'Models that estimate what is likely to happen next, with the assumptions and error rates spelled out.',
    slug: 'modelling',
  },
]