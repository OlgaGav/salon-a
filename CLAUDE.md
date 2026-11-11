# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for Hair Studio A (Pleasant Hill, CA). Plain HTML/CSS/vanilla JS — no framework, no package manager, no build step, no tests or linter. Deployed via GitHub Pages from `main` (live at https://olgagav.github.io/salon-a/).

## Running locally

Open `index.html` directly, or serve the directory so relative paths behave like production:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000/
```

## Architecture

- **Two parallel pages, one per language:** `index.html` (English) and `ru.html` (Russian) are full, hand-maintained copies of the same page. There is no i18n system — any structural, markup, or content change must be applied to **both** files, keeping element IDs and classes identical (they share `style.css` and `script.js`). Language switching is just links between the two files (`#langSwitch` on desktop, `#mobileLang` `<select>` on mobile), plus `hreflang` alternates in `<head>`.
- **`script.js` depends on fixed element IDs/classes** present in both pages: `gallery`, `galleryPrev/Next`, `lightbox*`, `mobileBook`, `mobileLang`, `langSwitch`, `.service-toggle`/`.service-item` (services accordion), `.reviews-track`/`.review`/`.prev`/`.next` (reviews slider). Renaming any of these in HTML breaks the JS.
- **Portfolio gallery is generated in JS**, not in HTML: `script.js` loops `1..totalImages` and loads `assets/portfolio/portfolio{N}.jpg`. To add/remove images, keep the files sequentially numbered with no gaps and update `totalImages`. Display order is the file number, so reordering means renaming files.
- **Mobile breakpoint at 520px** is enforced in both CSS media queries and `adaptMobile()` in JS (which toggles inline `display` on the mobile Book button / language select vs. desktop switch). Keep the two in sync.
- **Booking** is an external Square Appointments link (appears in multiple places in each HTML file); there is no on-site booking logic.
- **Google reviews** in `#reviews` are static cards hand-copied from the Google Business Profile (rating, count and review text are hardcoded). Review text stays in English on `ru.html` (marked `lang="en"`). Update both pages when refreshing.
- **SEO:** each page has meta tags and a `schema.org` `HairSalon` JSON-LD block near the end of `<body>` — update both pages if business info (address, URL, socials) changes.
- **Styling:** design tokens (colors, max width, radius, shadow) are CSS custom properties on `:root` in `style.css`; base styles are mobile-first with `min-width` breakpoints, plus several `max-width` overrides.
