interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  items: FAQItem[]
}

/**
 * JSON-LD FAQPage schema — renders a FAQ structured data block.
 * Eligible for Google rich results (FAQ dropdowns in SERP).
 *
 * Usage:
 *   <FAQSchema items={[
 *     { question: 'What do you build?', answer: 'We build dashboards…' },
 *   ]} />
 */
export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
