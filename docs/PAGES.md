# PAGES.md

Four pages plus a privacy page. Layout patterns come from `DESIGN.md`; words come from `CONTENT.md`.

CONTACT_EMAIL = 'hello@blancsociety.co.uk'

## Sitemap

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/projects` | Projects |
| `/contact` | Contact (the form also opens as a full-screen overlay from any "Get in touch" button) |
| `/privacy` | Privacy policy |

Nav links: Services (dropdown to Home sections), Projects, About, and a "Get in touch" button. Footer repeats these and adds Privacy policy.

## Shared elements

**Navigation.** Wordmark left, links, "Get in touch" button right. The Services dropdown lists the four services, each with a one-line description, and links to the matching Home section anchor. Mobile menu has the same items. Mark the current page.

**Footer.** Wordmark, social links, link columns under short headings (Pages, Services, Company), a contact column (email, Gaborone, Botswana), copyright with a year generated in code, and the Privacy policy link.

**Get in touch overlay.** Every "Get in touch" button opens the contact form overlay described below, from any page. The `/contact` route renders the same form inline so it is linkable and works without JavaScript.

## Home (`/`)

1. **Hero.** Headline, one supporting sentence, primary button ("Start a project", opens the form), and a secondary text link to Projects. A large visual on the right or below, per the reference.
2. **Services.** Section heading, short intro, row of four cards (title, one line, image or illustration). Four cards, because there are four services; the reference's row of three is a pattern, not a quota. Wrap to two by two on tablet.
3. **Selected work.** Section heading, a line saying the projects are prototypes built on public data, then up to three project cards linking to `/projects`, and a "View all projects" link.
4. **How we work.** Four steps in order: Scope, Prototype, Deliver, Hand over. This is a real sequence, so numbered markers are appropriate here and only here.
5. **Closing statement.** One large heading and the primary button, above the footer.

## About (`/about`)

1. **Intro.** Heading and two short paragraphs on who Blanc Data is and where it works.
2. **Team.** One card per person: photo, name, role, two-sentence bio. Placeholders until the owner supplies them.
3. **How we work.** Three commitments, written as plain sentences, not bolded mini-headings.
4. **Closing.** The same closing statement section as Home.

## Projects (`/projects`)

1. **Intro.** Heading and a short paragraph. State plainly that these are portfolio projects built from public data unless a card says otherwise.
2. **Project grid.** One card per project. Each card shows: title, sector, the question it answers, data source, tools, status (In progress, Complete), and a link to a detail view or external demo. Use the research-card pattern from the reference.
3. **Project detail pages** (`/projects/[slug]`). Optional for launch. If built: problem, data, method, result with a screenshot or live demo, and limits of the analysis.

**Rules for cards:**
- Never publish a card for work that doesn't exist yet. Hide anything not built.
- Any project that uses a named organisation's public data carries this line: "Independent prototype built from [organisation]'s published data. Not produced for or endorsed by [organisation]."
- Store projects as typed data (an array or MDX files), so adding one doesn't require editing layout code.

## Contact (`/contact` and the overlay)

The form follows micro1's one-question-at-a-time pattern.

**Steps**

1. Contact details: name, email, and optional phone or company. Label: "How can we reach you?"
2. Project: a text area. Label: "Tell us about your project." Helper text: "A few sentences is enough: what you want to know and what data you have."
3. Source: single choice. Label: "How did you find us?" Options: LinkedIn, Google, Instagram, Event, Referral, Other.

**Behaviour**

- A Back control on steps 2 and 3. A Next button and an Enter-key shortcut, with the hint "Press enter".
- Validate each step before moving on. Show errors beside the field in plain words: "Enter an email address like name@example.com", not "Invalid input".
- A consent line under step 3: "We'll use these details only to reply to your message." with a link to the privacy policy, and a required checkbox.
- On submit, show a loading state on the button, then the thank-you screen.
- **Thank-you screen:** "Thanks, you're all set." followed by what happens next and when, with links to Projects and the email address.
- **Failure:** keep the user's answers, explain what went wrong, and offer the direct email address as a fallback.
- Close with the Escape key and an X button. Trap focus inside the overlay while open and return focus to the trigger on close.

**Back end**

- Submit to a server route (`/api/contact`). Send an email to `[CONTACT_EMAIL]` through a transactional email service, and optionally store the submission.
- Anti-spam: a hidden honeypot field, server-side validation, and rate limiting by IP. Add a CAPTCHA only if spam appears.
- Keep API keys in environment variables, never in the repo.
- Don't log full message bodies or email addresses in application logs.

## Privacy policy (`/privacy`)

A plain-language page covering what the form collects, why, who processes it (the email provider and host), how long it's kept, and how to ask for deletion. The owner must have a lawyer review the final text. Use clear headings and no marketing language.

## SEO and metadata

- Unique title and meta description per page (drafts in `CONTENT.md`).
- Open Graph and Twitter card tags, with a generated social image.
- `sitemap.xml` and `robots.txt`.
- JSON-LD `Organization` data with name, URL, and the Gaborone location.
- Canonical URLs.

## Analytics

Optional and privacy-friendly (for example Plausible). If used, track only: Get in touch clicks, form step reached, and form submitted. Do not collect the form contents in analytics.