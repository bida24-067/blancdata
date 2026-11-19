# Prompt to paste into your AI agent

Copy everything below the line.

---

You are building the marketing website for Blanc Data, a data consultancy in Gaborone, Botswana. The site has four pages (Home, About, Projects, Contact) plus a Privacy page. The owner wants it to follow the design language of https://www.micro1.ai: its colours, fonts and backgrounds.

Before you do anything else, read these files in `/docs` and `AGENTS.md` at the repo root, in this order:

1. `AGENTS.md` for rules, stack, and the definition of done
2. `DESIGN.md` for the design system and how to extract micro1.ai's exact values
3. `PAGES.md` for page structure and the contact form flow
4. `CONTENT.md` for company facts, voice and draft copy
5. Inspiration = https://micro1.ai copy the exact design language, animations, colors, and fonts from this website. if there are any design elements like images, please request them and they will be provided
## Phase 1: extract the design tokens

Follow the extraction protocol in `DESIGN.md`. Open micro1.ai in a browser tool, read the computed colours, fonts, spacing, radii and background treatments (including the grain overlay), and save screenshots at four widths to `/design/reference/`.

Write `/design/tokens.json` and generate `/src/styles/tokens.css` from it. Mark each token `verified` or `estimated`.

Do not guess any value. If you have no browser tool, stop and ask me for screenshots of micro1.ai at desktop and mobile width, then match them and mark everything `estimated`.

Show me the token table, then wait for my approval.

## Phase 2: design plan

Write a short plan before any page code: the tokens, the type scale, a layout sketch (ASCII is fine) for each of the four pages, and the one place you'd spend the most visual effort. Check the plan against micro1.ai's reference screenshots. If any part reads like a generic template rather than the reference, change it and tell me what you changed and why.

Wait for my approval.

## Phase 3: build

Scaffold the project with the stack in `AGENTS.md`. Build the nav and footer, then Home, About, Projects, then the contact overlay and the `/contact` route, then the Privacy page. Use the copy in `CONTENT.md` exactly, and keep `[placeholders]` visible. Do not invent facts, clients, testimonials or statistics.

For the contact form, follow `PAGES.md`: the full-screen, one-question-at-a-time flow with Back, Next and Enter, validation, a consent checkbox, a server route that emails me, spam protection, and the thank-you screen.

## Phase 4: quality pass

Compare your build to the reference screenshots at all four widths and fix the differences. Run the accessibility, performance and keyboard checks listed under "Quality bar" in `AGENTS.md`. Remove generic template habits that micro1.ai doesn't use.

## Rules to keep in mind throughout

- Match micro1.ai's design language, not its assets. Don't copy its logo, images, illustrations, noise texture file, copy, or code, and don't mention micro1 on the site.
- No BAC or UnpakData branding.
- Don't present NBFIRA, Kgori Capital or any other organisation as a client.
- Ask me before adding dependencies beyond the stack in `AGENTS.md`.

## Ask me first

Before Phase 1, ask me once, in a single message, for anything you need that isn't in the files: the contact email, the domain name, the hosting account, whether I have a logo or want a text wordmark, and whether you have browser access for token extraction.

## When you finish each phase

Report what you built, every token marked `estimated`, every placeholder still open, any decision you made on your own, and anything you couldn't verify.
