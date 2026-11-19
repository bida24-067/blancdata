# Blanc Data — Project

**Domain:** blancsociety.co.uk  
**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Clerk Auth · Resend · Cloudflare Pages  
**Contact email:** hello@blancsociety.co.uk

## Running locally

```bash
npm install
cp .env.example .env.local
# Fill in .env.local with your keys
npm run dev
```

## Environment variables

See `.env.example` for all required keys:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` — from clerk.com
- `RESEND_API_KEY` — from resend.com
- `CONTACT_EMAIL` — destination for contact form submissions

## Build & deploy

```bash
npm run build        # local production build
npm run lint         # ESLint check
```

Deployed to **Cloudflare Pages** via Git push. Set environment variables in the Cloudflare dashboard.

## Project structure

```
app/                   Next.js App Router pages
  layout.tsx           Root layout (Clerk provider, fonts)
  page.tsx             Home
  about/page.tsx       About
  projects/page.tsx    Projects
  contact/page.tsx     Contact
  privacy/page.tsx     Privacy policy
  admin/               Admin dashboard (Clerk-protected)
    layout.tsx         Admin layout with auth guard
    page.tsx           Admin home
    projects/page.tsx  Edit projects
  api/
    contact/route.ts   Contact form server action (Resend)
components/            Shared UI components
  Nav.tsx
  Footer.tsx
  ContactForm.tsx
  ContactOverlay.tsx
content/               Typed data (projects, services, team)
  projects.ts
  services.ts
  team.ts
styles/
  tokens.css           Design tokens (from micro1.ai extraction)
public/
  logos/               blanc. logo variants
design/
  reference/           Screenshots from micro1.ai at 4 widths
  tokens.json          Raw extracted token data
docs/                  Brief files (AGENTS, DESIGN, PAGES, CONTENT)
```