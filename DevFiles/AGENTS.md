# AGENTS.md

Standing rules for this repository. Read this first in every session. (Rename to `CLAUDE.md` if you use Claude Code.)

## Project

The Blanc Data marketing website: Home, About, Projects, Contact, and a Privacy page. Its job is to show prospective clients what Blanc Data does and make it easy to start a conversation.

Briefs live in `/docs`: `DESIGN.md`, `PAGES.md`, `CONTENT.md`. Where files disagree, this order wins: `DESIGN.md` for visuals, `PAGES.md` for structure and behaviour, `CONTENT.md` for words.

## Stack

Use this unless the owner says otherwise:

- Next.js (App Router) with TypeScript
- Tailwind CSS, configured from the generated design tokens, with no hard-coded colours or font sizes in components
- Fonts self-hosted through `next/font` or Fontsource
- `next/image` for images, with explicit dimensions
- A transactional email service for the contact form (for example Resend), called from a server route
- Hosting on Vercel or Cloudflare Pages, to be chosen by the owner
- ESLint, Prettier, and `tsc --noEmit` in CI

Ask before adding any dependency beyond these. Prefer plain CSS and small utilities to heavy animation or UI libraries.

## Working rules

1. Extract design tokens before writing UI code, as `DESIGN.md` requires. Never guess colours or fonts.
2. Work in this order: tokens, design plan, layout shell (nav and footer), then pages, then the contact flow, then SEO, then accessibility and performance passes.
3. Show the owner the token table and the design plan, and wait for approval before building pages.
4. Keep content in `/src/content`, not inside components. Projects, services and team members are typed data.
5. Never fabricate content. If `CONTENT.md` has a `[placeholder]`, keep it visible in dev and fail the production build if any `[` placeholder is left in rendered copy (add a check script).
6. Don't mention micro1 anywhere on the public site, in metadata, or in alt text.
7. Don't name BAC or UnpakData on the site.
8. Don't claim any organisation is a client. Prototypes built on public data carry the disclaimer given in `CONTENT.md`.
9. Small, focused commits with clear messages. One feature per branch.

## Security and privacy

- All secrets in environment variables. Add `.env.example` with names only, and keep `.env*` out of git.
- Validate and sanitise form input on the server. Rate limit the contact route. Include a honeypot field.
- Don't log personal data. Don't send form contents to analytics.
- The contact form needs a consent checkbox and a link to the privacy page.
- Set security headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`).

## Quality bar

Done means all of these are true:

- [ ] All five routes render, with correct titles, descriptions and Open Graph tags
- [ ] Matches the reference screenshots in `/design/reference` at 1440, 1024, 768 and 390 px
- [ ] No horizontal scroll at any width
- [ ] Lighthouse on mobile: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+
- [ ] Keyboard-only use works end to end, including the contact overlay (focus trap, Escape, focus return)
- [ ] Text contrast meets WCAG 2.2 AA, with any adjustments from micro1's values listed for the owner
- [ ] `prefers-reduced-motion` is respected
- [ ] Contact form tested for success, validation errors, server failure, and spam rejection
- [ ] `sitemap.xml`, `robots.txt`, and JSON-LD present
- [ ] No placeholder text, broken links, or console errors
- [ ] README explains how to run, build, set environment variables, and deploy

## Final report

When you finish a phase, report:

1. What you built and where it lives
2. Every token or choice marked `estimated`
3. Every `[placeholder]` still open
4. Anything you decided without being told, and why
5. What you couldn't verify
