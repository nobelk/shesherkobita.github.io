# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A single-page static marketing site for **Shesher Kobita**, an elderly-living retreat concept near Dhaka, Bangladesh. Hosted on GitHub Pages under the custom domain `shesherkobita.com` (see `CNAME`). The site is content-only — there is no backend, no build step in deployment, and no JavaScript framework.

The site is built on top of the **HTML5 UP "Read Only"** template. Most of the bulk in `assets/css/main.css` (~3.3k lines), `assets/sass/`, and `assets/js/` (jQuery + `breakpoints.min.js` + `browser.min.js` + `jquery.scrolly` + `jquery.scrollex`) is template scaffolding, not bespoke code. Project-specific content lives almost entirely in `index.html`.

## Commands

- **View locally:** open `index.html` directly in a browser. No server or build step is required — GitHub Pages serves the file as-is.
- **`npm test` / `npm run lint` / `npm run typecheck` do not work and have never been wired up.** `package.json` points at `scripts/verify-site.mjs` and `scripts/lint-static.mjs`, but there is no `scripts/` directory, no `node_modules/`, no lockfile, and no declared dependencies. Running `npm install` will not fix this — the scripts themselves are missing. If you need verification, write the scripts before invoking them.
- **Sass and compiled CSS are decoupled.** `assets/sass/main.scss` is the source for `assets/css/main.css`, but no project script regenerates the CSS and there is no Sass dependency in `package.json`. Editing only the `.scss` will not change anything the browser sees. Prefer editing `assets/css/main.css` directly for small tweaks; if you do touch `.scss`, recompile with whatever Dart Sass you have available and commit both files together.

## Architecture notes

- **Single source of truth for content:** `index.html`. Sections use numeric IDs `#one` through `#five`. The top nav links to four of them — `#one` (About), `#three` (Concept Design), `#four` (Project Timeline), `#five` (Contact). `#two` ("Why Shesher Kobita?") exists in document flow but is intentionally not a nav target.
- **Dormant template content:** `index.html` contains a large commented-out `<section id="five">…Elements…</section>` block (the HTML5 UP "Elements" demo page, roughly lines 226–559). It is inside `<!-- … -->` so it does not render and the duplicate `id` does not conflict — a grep for `id="five"` returns two hits but only one is live. Leave it alone unless you are deliberately cleaning up the template.
- **Authoritative contact email:** `shesherkobita.contact@gmail.com`. It appears in `index.html` (nav icon at line 103, and the Contact CTA at line 221 — where the address is both the `mailto:` target and the visible link text) and once each in `docs/concept-webpage-brief.md` and `docs/review-checklist.md`. Keep every reference in sync if it ever changes.
- **SEO surface is non-trivial and self-consistent.** Editing any of {`<title>`, meta description, canonical URL, hero image} means updating, in tandem: the head `<meta>` block, the Open Graph block, the Twitter card block, the JSON-LD `LodgingBusiness` block (all in `index.html`), and `sitemap.xml` — which pins three specific image URLs (`shesher_kobita_banner.png`, `shesher_kobita_logo.png`, `site_location.png`) and a `<lastmod>` date that should bump when content changes meaningfully. `robots.txt` is a static `Allow: /` and rarely needs edits.
- **Image assets are large** (several PNGs in `images/` are 2–5 MB). Prefer the already-downsized variants like `logo_small.png` and `shesher_kobita_banner.png` over the raw `shesher_kobita_*.png` originals for in-page use; the originals are kept as source artwork.

## Design intent (from `docs/`)

`docs/concept-webpage-brief.md` and `docs/review-checklist.md` are the authoritative design and content brief. When making content or layout changes, cross-check against the required sections (concept, facilities, village serenity, proximity to Dhaka, organic food, activities, worship access, reservation contact) and the green / white / charcoal palette direction. The page must remain a single-page, ready-to-open static deliverable with no build step required for viewing.

## Licensing

All site content, images, and copy are proprietary (see `README.md`). Do not pull in third-party content under incompatible licenses, and do not add an open-source license file.
