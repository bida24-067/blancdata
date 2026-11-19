// JSON-LD Organization schema — rendered in the root layout <head>
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Blanc Data',
    url: 'https://blancsociety.co.uk',
    email: 'hello@blancsociety.co.uk',
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
