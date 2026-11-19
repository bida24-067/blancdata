// JSON-LD Organization + ProfessionalService schema — rendered in the root layout <head>
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: 'Blanc Data',
    url: 'https://blancsociety.co.uk',
    email: 'hello@blancsociety.co.uk',
    description:
      'Blanc Data is a data analytics and intelligence consultancy based in Gaborone, Botswana, specialising in ETL pipelines, interactive dashboards, market analysis, and predictive machine learning.',
    areaServed: [
      { '@type': 'Country', name: 'Botswana' },
      { '@type': 'AdministrativeArea', name: 'Southern African Development Community (SADC)' },
    ],
    knowsAbout: [
      'Data Analytics',
      'Business Intelligence',
      'Machine Learning',
      'ETL Pipelines',
      'Power BI Dashboards',
      'PySpark',
      'Databricks',
      'Market Analysis',
      'Predictive Modelling',
    ],
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Gaborone',
        addressCountry: 'BW',
      },
    },
    sameAs: ['https://www.linkedin.com/company/blancdata/'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
