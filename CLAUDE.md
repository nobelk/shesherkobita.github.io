# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A bilingual static fundraising site for **Shesher Kobita Ananda Ashram** (শেষের কবিতা আনন্দ আশ্রম), a dignified residential care centre for older persons being built by **Mitali Mojammel Trust** in Panchgaon Mouza, Duptara Union, Araihazar Upazila, Narayanganj District, Bangladesh. Hosted on GitHub Pages under the custom domain `shesherkobita.com` (see `CNAME`). The site is content-only — there is no backend, no build step in deployment, and no JavaScript framework.

The layout is built on the Colorlib **"South"** template (CC BY 3.0 — the visible "Template by Colorlib" footer credit is required and `npm test` enforces it). A trimmed copy lives in `assets/south/`: `style.css` (the template master CSS, recoloured from brown `#947054` to the site green `#4f6f35`, preloader removed, `@import`s cut to Bootstrap 4, animate.css, Owl Carousel and Classy Nav), plus Classy Nav's icon font and the official Owl Carousel 2.3.4 release (MIT). The template's bundled `plugins.js` is deliberately **not** used — it includes a GPL v2 counter plugin. The upstream template directory `templates/south-master/` is git-ignored; `templates/update1.md` is the reviewed redesign plan. Project-specific styling lives in `assets/css/site.css`; behaviour in `assets/js/site.js` (mobile menu with ARIA, hero carousel with pause/prev/next buttons, scroll-spy, reveal animation, back-to-top); content in `index.html` and `bn.html`.

## Content source of truth

All site copy, figures, and imagery come from the project proposal in `project_plan/`:

- `project_plan/PP/PP.html` — the Bengali proposal (Word export). Source for `bn.html`.
- `project_plan/PP_en.pdf` — the English translation and donor-facing reformatting. Source for `index.html`.
- `project_plan/PP/images/` — the original figures. Copies live in `images/pp/` under descriptive names.

If a number, name, or claim on the site is questioned, check it against these two documents. Notable figures that must stay consistent everywhere: **BDT 27,982,500** total construction cost, **60** initial residents, **11,000 sq ft** (5,500 + 5,500), **22 decimals** of donated land (Deed No. 6016, ~BDT 14,000,000 market value), **17** staff, **32** homes for older persons nationwide of which **6** are government-owned.

Extract the Bengali proposal text with a strip-tags pass over `PP.html`; extract the English with `pdftotext -layout PP_en.pdf`.

## Commands

- **View locally:** open `index.html` (or `bn.html`) directly in a browser. No server or build step is required.
- **`npm test`** runs `scripts/verify-site.mjs` — checks that local asset references resolve (including files named by linked stylesheets, recursively), in-page anchors resolve, every `<img>` has alt text, JSON-LD parses and its site URLs point at real files, the two pages stay in sync (non-empty nav sections, hreflang, canonical, contact address), every file in `images/pp/` and `images/concept/` is used on **both** pages, no template demo content survives (`Lorem`, `southtemplate`, `plugins.js`, …), the Colorlib credit and both disclaimers are present, `.bn` fragments on the English page carry `lang="bn"`, and `sitemap.xml` points only at real files.
- **`npm run lint`** runs `scripts/lint-static.mjs` — block-tag balance (incl. `header`/`main`/`footer`), `<title>` / meta-description length, insecure `http://` references, and a 1.5 MB ceiling on any referenced asset, CSS-referenced ones included.
- **`npm run typecheck`** is just `node --check` over the three scripts (`scripts/asset-refs.mjs` is the shared reference collector). All are dependency-free Node built-ins; there is no `node_modules/` and nothing to install.
- **No Sass toolchain.** The template's SCSS is not vendored; edit `assets/south/style.css` only for template-wide recolours and put bespoke rules in `assets/css/site.css` (loaded last).

## Architecture notes

- **Two full pages, not a JS toggle.** `index.html` is English (`lang="en"`, canonical `https://shesherkobita.com/`); `bn.html` is Bengali (`lang="bn"`, canonical `https://shesherkobita.com/bn.html`). They are linked by `rel="alternate" hreflang` in both directions plus `x-default` pointing at the English page, and by a `ul.lang-switch` in the top contact bar (outside `<nav id="nav">`, which holds only the eight section links that the scroll-spy manages). Keep both pages structurally identical — `npm test` fails if their nav section ids diverge or either is empty.
- **Section ids run `#one` through `#eight`** in both pages, all eight of them nav targets: About/পরিচিতি, The Need/প্রেক্ষাপট, Design & Facilities/নকশা ও সুবিধা, The Project/প্রকল্প, Budget/ব্যয় বিবরণী, Support Us/সহযোগিতা, The Trust/ট্রাস্ট, Contact/যোগাযোগ. Page order: skip link → sticky header (top bar + nav) → `<main>` with the hero (the page's only `<h1>`, outside the carousel), the key-figures panel, `#one`–`#five`, a call-to-action band, `#six`–`#eight` → footer. Section titles are `<h2>`, sub-heads `<h3>`.
- **Works without JavaScript.** `<html class="no-js">` is swapped to `js` by an inline head script; `site.css` shows the nav as a plain wrapped list and only the first hero slide under `.no-js`. Reduced-motion users get no autoplay, parallax or reveal animation.
- **Bengali typography** is handled in `assets/css/site.css` under `html[lang="bn"]` — a Noto Sans Bengali stack, looser line height, and `text-transform`/`letter-spacing` forced off for every element (South uppercases headings, nav, buttons, tags and widget titles, which mangles Bengali). Both pages load Open Sans + Noto Sans Bengali from Google Fonts; Bengali fragments on the English page use `class="bn" lang="bn"`. Bengali numerals are used throughout `bn.html`, Western numerals throughout `index.html`.
- **Authoritative contact details:** email `shesherkobita38@gmail.com`, mobile `01994380730` (`tel:+8801994380730`), Sonali Bank Dhuptara Branch account `3606102000763` in the name of Mitali Mojammel Trust. These appear in the top contact bar, the About sidebar card, the footer, the JSON-LD, and the contact table on both pages, and in `docs/`. The older `shesherkobita.contact@gmail.com` is retired; `npm test` fails if it reappears.
- **SEO surface is non-trivial and self-consistent.** Editing any of {`<title>`, meta description, canonical URL, hero image} means updating, in tandem: the head `<meta>` block, the Open Graph block, the Twitter card block, the JSON-LD `@graph` (an `NGO` for the Trust plus a `LodgingBusiness`/`Project` for the ashram, cross-linked by `@id`; its `logo` is `images/logo-wordmark.png`) — on **both** pages — and `sitemap.xml`, which lists both URLs with `xhtml:link` alternates, pins the `images/pp/` figures and (English URL) the `images/concept/` images, and carries a `<lastmod>` that should bump when content changes meaningfully. Titles, descriptions, and keywords deliberately mix Bengali and English terms on both pages. `robots.txt` is a static `Allow: /` and rarely needs edits.
- **Image assets.** Every real image is used. `images/pp/` holds the proposal figures (hero slides, design cards, plans, need/trust photos). `images/concept/` holds web-sized JPEGs (≤ 320 KB, max 1200 px, made with `sips`) of the earlier concept artwork — the single-storey courtyard scheme with a library, which is **not** the proposal design — shown only in the captioned "Early concept studies" gallery at the end of `#three` (and `breaking-ground.jpg` as the call-to-action background). Logos: `logo_small.png` (header), `logo_small1.png` (About card), `logo-wordmark.png` (footer, JSON-LD), `favicon-32.png` / `apple-touch-icon.png` (from `logo_small2.png`). The multi-megabyte PNG originals in `images/` stay as source artwork and must not be linked directly — `npm run lint` rejects anything over 1.5 MB.

## Design intent (from `docs/`)

`docs/review-checklist.md` is the current review target and is written against the project proposal. `docs/concept-webpage-brief.md` is marked superseded; only its visual direction (green / white / charcoal palette, calm and uncrowded layout, generous imagery) still applies. Design tokens (`--sk-green`, `--sk-forest`, `--sk-green-tint`, …) are defined at the top of `assets/css/site.css`. The page must remain a ready-to-open static deliverable with no build step required for viewing.

## Licensing

All site content, images, and copy are proprietary (see `README.md`). Do not pull in third-party content under incompatible licenses (no GPL code, no template stock photos), and do not add an open-source license file. Third-party code and its licences are listed in `README.md`.
