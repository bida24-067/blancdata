import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { OrganizationSchema } from '@/components/OrganizationSchema'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://blancsociety.co.uk'),
  title: {
    default: 'Blanc Data | Data Analytics & Intelligence in Botswana',
    template: '%s | Blanc Data',
  },
  description:
    'Blanc Data builds enterprise data pipelines, interactive dashboards, and predictive machine learning models for organisations in Botswana and the SADC region.',
  openGraph: {
    type: 'website',
    locale: 'en_BW',
    url: 'https://blancsociety.co.uk',
    siteName: 'Blanc Data',
    title: 'Blanc Data | Data Analytics in Botswana',
    description: 'Transforming complex data into actionable dashboards and predictive models.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${outfit.variable} h-full`}>
        <head>
          <OrganizationSchema />
        </head>
        <body className="min-h-full flex flex-col bg-[#121212] text-white/90 antialiased selection:bg-[#9fa3fc]/30 selection:text-white overflow-x-hidden">
          <div className="grain-overlay" aria-hidden="true" />
          <Nav />
          <main className="flex-1 flex flex-col pt-[72px]">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
