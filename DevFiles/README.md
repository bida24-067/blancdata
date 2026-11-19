# Blanc Data website brief pack

These files tell an AI coding agent (Claude Code, Cursor, Copilot, or similar) how to build the Blanc Data marketing site: Home, About, Projects and Contact, using the design language of micro1.ai.

## Files

| File | What it does |
|---|---|
| `PROMPT.md` | The prompt you paste into the agent to start the job |
| `AGENTS.md` | Standing rules for the repo: stack, conventions, definition of done. Rename to `CLAUDE.md` if you use Claude Code |
| `DESIGN.md` | The design system: how to extract micro1.ai's exact colours, fonts and backgrounds, and how to apply them |
| `PAGES.md` | Page-by-page structure, sections and behaviour, including the contact form flow |
| `CONTENT.md` | Company facts, voice, and draft copy for every page, with placeholders marked |

## How to use them

1. Create the repo and put all five files in a `/docs` folder. Copy `AGENTS.md` to the repo root.
2. Open the agent in that repo and paste the contents of `PROMPT.md`.
3. The agent's first job is to read the exact colours and fonts from micro1.ai and write them to a tokens file. It needs a browser tool or the ability to run Playwright for this. If it has neither, take screenshots of micro1.ai at desktop and mobile width and give them to it, then ask it to match them by eye and flag every value it is unsure of.
4. Review the extracted tokens and the design plan before it starts building pages.

## Why the tokens aren't filled in already

The tool used to prepare this pack could read micro1.ai's text and structure but not its stylesheet, so the exact hex values and font families weren't available. Rather than guess, `DESIGN.md` makes extraction the first step. The agent must not invent values.

## What you need to fill in before launch

Search the files for `[` to find placeholders. The main ones:

- Contact email address and any social links
- Founder and partner names, photos and short bios
- Founding year, and the exact services you want to list
- Real project details and links, and the data source for each
- A reply-time promise for the contact form
- Domain name and hosting account
- A privacy policy, reviewed by a lawyer, since the contact form collects personal data

## Two cautions

- Don't publish a project card for anything you haven't built. `CONTENT.md` says to remove unfinished cards before launch.
- The site must not use BAC or UnpakData branding, and must not describe NBFIRA, Kgori Capital or anyone else as a client unless they are one.
