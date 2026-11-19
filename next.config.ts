import type { NextConfig } from 'next'
import path from 'path'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.blancsociety.co.uk https://*.clerk.accounts.dev https://challenges.cloudflare.com https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://img.clerk.com",
      "connect-src 'self' https://clerk.blancsociety.co.uk wss://clerk.blancsociety.co.uk https://*.clerk.accounts.dev wss://*.clerk.accounts.dev https://api.resend.com https://challenges.cloudflare.com https://cloudflareinsights.com",
      "frame-src 'self' https://clerk.blancsociety.co.uk https://*.clerk.accounts.dev https://challenges.cloudflare.com",
      "worker-src 'self' blob:",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.clerk.com' },
    ],
  },
}

export default nextConfig
