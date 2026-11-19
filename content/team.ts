export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  photo?: string
}

export const team: TeamMember[] = [
  {
    id: 'loago',
    name: 'Loago Montsho',
    role: 'Founder & Lead Analyst',
    bio: 'Loago Kevin Montsho is a Data Analyst and third-year Business Intelligence and Data Analytics student at Botswana Accountancy College, specializing in end-to-end data pipelines, machine learning, and business process optimization. As the founder of blancData and a Lean Six Sigma Yellow Belt, he combines technical proficiency in Databricks, PySpark, SQL, and Power BI to transform complex datasets into actionable insights for financial markets, credit risk, and agricultural forecasting. Based in Gaborone, he is passionate about building scalable, data-driven solutions that drive strategic decision-making and operational efficiency.',
    photo: undefined,
  },
  {
    id: 'abia',
    name: 'Abia Bleskit',
    role: 'Data Analyst',
    bio: '[Two-sentence bio.]',
    photo: undefined,
  },
]