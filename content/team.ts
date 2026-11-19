export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  skills?: string[]
  email?: string
  linkedin?: string
  instagram?: string
  photo?: string
}

export const team: TeamMember[] = [
  {
    id: 'loago',
    name: 'Loago Montsho',
    role: 'Founder & Lead Analyst',
    bio: 'Loago Kevin Montsho is a Data Analyst and third-year Business Intelligence and Data Analytics student at Botswana Accountancy College, specializing in end-to-end data pipelines, machine learning, and business process optimization. As the founder of blancData and a Lean Six Sigma Yellow Belt, he combines technical proficiency in Databricks, PySpark, SQL, and Power BI to transform complex datasets into actionable insights for financial markets, credit risk, and agricultural forecasting. Based in Gaborone, he is passionate about building scalable, data-driven solutions that drive strategic decision-making and operational efficiency.',
    skills: ['Databricks', 'PySpark', 'SQL', 'Power BI', 'Delta Lake', 'Lean Six Sigma'],
    email: 'loagom@blancsociety.co.uk',
    linkedin: 'https://www.linkedin.com/in/loagomov',
    instagram: 'https://www.instagram.com/loago.mov/',
    photo: undefined,
  },
  {
    id: 'abia',
    name: 'Abia Bleskit',
    role: 'Data Analyst',
    bio: 'Abia Bleskit is a Data Analyst with a keen interest in the intersection of Data Analytics, Data Engineering and Business Intelligence. His focus is on helping organisations transform fragmented data into structured, reliable and actionable intelligence through the development of Data Pipelines, Data Processing Solutions and Analytical Systems. With an emphasis on leveraging technology to solve complex business challenges, he is committed to helping businesses establish robust Data Foundations, improve Operational Visibility and unlock greater value from their Information Assets.',
    skills: ['Dashboard Development', 'Power Query', 'Microsoft Excel', 'Python', 'DAX', 'MySQL'],
    email: 'abiab@blancsociety.co.uk',
    photo: undefined,
  },
]