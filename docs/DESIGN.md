# DESIGN.md

## Direction

The site follows the design language of https://www.micro1.ai: its colours, fonts, backgrounds, spacing and entire layout rhythm. The owner wants these matched exactly, so where this file and your own taste disagree, micro1.ai wins.

Match the language, not the assets. See "What not to copy" at the end.

## Rule one: don't guess

The exact values are **unverified**. Nobody has yet read micro1.ai's computed styles into this brief. You must extract them before writing any UI code. If you cannot, stop and ask the owner for screenshots. Never fill a token with a plausible‑looking value and move on.

## Extraction protocol

micro1.ai is built on Webflow (its images load from `cdn.prod.website-files.com`), so most styling sits in one or two Webflow‑generated stylesheets. Find them in the Network tab or in the page's `<link rel="stylesheet">` tags.

Use Playwright, Chrome DevTools, or whatever browser tool you have. Load https://www.micro1.ai at 1440px wide, then:

1. **Colours.** Read `getComputedStyle` for `body`, the nav, the hero section, each full‑width section, cards, buttons (default, hover, focus), links, the footer, and the form overlay. Record `background‑color`, `background‑image`, `color`, `border‑color`, and `box‑shadow`. Note every gradient in full.
2. **Fonts.** List the families from `document.fonts` and the stylesheet's `@font‑face` rules. Record the family name, weights used, and where each file comes from. For `h1`, `h2`, `h3`, `p`, nav links, buttons, and small labels, record `font‑family`, `font‑size`, `font‑weight`, `line‑height`, `letter‑spacing`, and `text‑transform`.
3. **Type scale at three widths.** Repeat step 2 at 1440, 768 and 390 pixels. Webflow sites often change sizes at fixed breakpoints, so capture each one.
4. **Spacing and layout.** Record section padding (top and bottom), the container max‑width and side padding, grid gaps in the card rows, and the nav height.
5. **Shape.** Record `border‑radius` for buttons, cards, images, and inputs. Record border widths and colours.
6. **Backgrounds and textures.** The page loads a noise and texture image layer. Find the element that carries it, and record its position, size, `opacity`, `mix‑blend‑mode`, and `pointer‑events`. Record where the page uses flat colour, gradients, or imagery behind content.
7. **Motion.** Note the nav behaviour on scroll (sticky, transparent to solid, hide on scroll). Note hover states on buttons and cards, and any entrance animations. Record durations and easing curves. Reproduce only what you actually observe.
8. **Screenshots.** Save full‑page and viewport screenshots at 1440, 1024, 768 and 390 pixels to `/design/reference/`. These are for internal comparison. Keep them out of the production build and out of the public repo if it is public.

Write the results to `/design/tokens.json`, one entry per token, with the source selector and the width at which you measured it. Then generate `/src/styles/tokens.css` from it. Mark each token `verified` (read from computed style) or `estimated` (judged from a screenshot). Show the owner the table before building.

## Token template

Fill these in from extraction. Delete nothing; if micro1.ai has no equivalent, write `n/a` and say why.

```css
:root {
  /* colour */
  --color-bg-page:        /* TODO */;
  --color-bg-section-alt: /* TODO */;
  --color-bg-card:        /* TODO */;
  --color-text-primary:   /* TODO */;
  --color-text-secondary: /* TODO */;
  --color-border:         /* TODO */;
  --color-accent:         /* TODO */;
  --color-button-bg:      /* TODO */;
  --color-button-text:    /* TODO */;

  /* type */
  --font-display:  /* TODO family + fallback stack */;
  --font-body:     /* TODO family + fallback stack */;
  --text-h1:       /* TODO clamp() from the three measured widths */;
  --text-h2:       /* TODO */;
  --text-h3:       /* TODO */;
  --text-body:     /* TODO */;
  --text-small:    /* TODO */;

  /* layout */
  --container-max: /* TODO */;
  --section-pad-y: /* TODO */;
  --nav-height:    /* TODO */;
  --radius-card:   /* TODO */;
  --radius-button: /* TODO */;
}
```

## What the page structure looks like

Observed from micro1.ai's content. Recreate the arrangement, using Blanc Data content.

- **Navigation.** Wordmark on the left. A dropdown for the main offering, with each item showing a name and a one‑line description. A few plain links beside it. A single call‑to‑action button on the right ("Get in touch"). A mobile menu repeats the same items.
- **Hero.** One large headline, a short supporting sentence, and a large image or illustration. No stack of badges or stats.
- **Offerings section.** A short heading and intro, then a row of three cards. Each card has a title, a one‑line description, and an image.
- **Statement section.** A single bold heading that frames the company's focus, with supporting imagery.
- **Research section.** A heading, a short line, then linked cards for individual pieces, ending with a "View all" link. Blanc Data uses this pattern for the Projects section.
- **Closing statement.** A large closing heading above the footer.
- **Footer.** Wordmark, social links, several columns of links grouped under short headings, a contact column, a copyright line, and legal links.
- **Contact flow.** Clicking "Get in touch" opens a full‑screen, one‑question‑at‑a‑time form with a Back control, "Press enter" and "Next" cues, a final "Submit" and a thank‑you screen. Details are in `PAGES.md`.

## Backgrounds

Backgrounds are part of the look the owner asked for. Use the colours, gradients, and the grain overlay you extracted. Rebuild the grain with CSS or an inline SVG filter, or generate your own PNG. Don't hotlink or copy micro1's file. Keep the overlay non‑interactive (`pointer-events: none`) and check that it does not hurt text contrast or scroll performance on a mid‑range phone.

## Motion

Use only the motion you observed, and keep it to a short list. Animate in response to the user's actions (menu open, form step change, button hover). Respect `prefers-reduced-motion` by turning off any entrance animation and any parallax.

## Responsive behaviour

Design at 1440px, then check 1024, 768 and 390. Cards go from a row of three to a single column. The nav collapses into a menu. The contact form stays full‑screen on mobile. No horizontal scrolling at any width.

## Accessibility floor

- Body text contrast of at least 4.5:1, and 3:1 for large text and UI borders. If a colour measured from micro1.ai fails, adjust it by the smallest amount that passes, and list each adjustment for the owner.
- Visible keyboard focus on every interactive element.
- Semantic landmarks, one `h1` per page, labelled form fields, and error messages announced to screen readers.
- Images have alt text, or empty alt if purely decorative.

## What not to copy

- micro1's logo, name, copy, illustrations, photographs, icons, or SVGs.
- Their noise and texture image file, or any other image file. Rebuild or replace.
- Font files whose licence you can't confirm. If a family is proprietary, use the closest open‑licensed family (check Google Fonts or Fontsource) and say which one you picked and why.
- Their page code, wholesale. Extracted values are fine; pasted source is not.
- Any mention of micro1 on the public site.

## Self‑critique before showing the owner

Compare your build to the reference screenshots at all four widths. Fix mismatches in colour, type size, spacing and background before showing it. Then take one pass for generic tells: identical cards everywhere, a label above every heading, decorative gradients that micro1 doesn't use, stat blocks, and scattered fade‑in effects. Remove them if they aren't in the reference.
