# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A bilingual static fundraising site for **Shesher Kobita Ananda Ashram** (শেষের কবিতা আনন্দ আশ্রম), a dignified residential care centre for older persons being built by **Mitali Hossain Trust** in Panchgaon Mouza, Duptara Union, Araihazar Upazila, Narayanganj District, Bangladesh. Hosted on GitHub Pages under the custom domain `shesherkobita.com` (see `CNAME`). The site is content-only — there is no backend, no build step in deployment, and no JavaScript framework.

The site is built on top of the **HTML5 UP "Read Only"** template. Most of the bulk in `assets/css/main.css` (~3.3k lines), `assets/sass/`, and `assets/js/` (jQuery + `breakpoints.min.js` + `browser.min.js` + `jquery.scrolly` + `jquery.scrollex`) is template scaffolding, not bespoke code. Project-specific styling lives in `assets/css/site.css`; project-specific content lives in `index.html` and `bn.html`.

## Content source of truth

All site copy, figures, and imagery come from the project proposal in `project_plan/`:

- `project_plan/PP/PP.html` — the Bengali proposal (Word export). Source for `bn.html`.
- `project_plan/PP_en.pdf` — the English translation and donor-facing reformatting. Source for `index.html`.
- `project_plan/PP/images/` — the original figures. Copies live in `images/pp/` under descriptive names.

If a number, name, or claim on the site is questioned, check it against these two documents. Notable figures that must stay consistent everywhere: **BDT 27,982,500** total construction cost, **60** initial residents, **11,000 sq ft** (5,500 + 5,500), **22 decimals** of donated land (Deed No. 6016, ~BDT 14,000,000 market value), **17** staff, **32** homes for older persons nationwide of which **6** are government-owned.

Extract the Bengali proposal text with a strip-tags pass over `PP.html`; extract the English with `pdftotext -layout PP_en.pdf`.

## Commands

- **View locally:** open `index.html` (or `bn.html`) directly in a browser. No server or build step is required.
- **`npm test`** runs `scripts/verify-site.mjs` — checks that local asset references resolve, in-page anchors resolve, every `<img>` has alt text, JSON-LD parses, the two pages stay in sync (nav sections, hreflang, canonical, contact address), and `sitemap.xml` points only at real files.
- **`npm run lint`** runs `scripts/lint-static.mjs` — block-tag balance, `<title>` / meta-description length, insecure `http://` references, and a 1.5 MB ceiling on any referenced asset.
- **`npm run typecheck`** is just `node --check` over both scripts. All three are dependency-free Node built-ins; there is no `node_modules/` and nothing to install.
- **Sass and compiled CSS are decoupled.** `assets/sass/main.scss` is the source for `assets/css/main.css`, but no project script regenerates the CSS and there is no Sass dependency in `package.json`. Editing only the `.scss` will not change anything the browser sees. Prefer adding bespoke rules to `assets/css/site.css`, which is hand-written and not generated from Sass.

## Architecture notes

- **Two full pages, not a JS toggle.** `index.html` is English (`lang="en"`, canonical `https://shesherkobita.com/`); `bn.html` is Bengali (`lang="bn"`, canonical `https://shesherkobita.com/bn.html`). They are linked by `rel="alternate" hreflang` in both directions plus `x-default` pointing at the English page, and by a `ul.lang-switch` in the sidebar (deliberately **outside** `#nav`, because `assets/js/main.js` attaches Scrolly to every `#nav a`). Keep both pages structurally identical — `npm test` fails if their nav section ids diverge.
- **Section ids run `#one` through `#eight`** in both pages, all eight of them nav targets: About/পরিচিতি, The Need/প্রেক্ষাপট, Design & Facilities/নকশা ও সুবিধা, The Project/প্রকল্প, Budget/ব্যয় বিবরণী, Support Us/সহযোগিতা, The Trust/ট্রাস্ট, Contact/যোগাযোগ.
- **Bengali typography** is handled in `assets/css/site.css` under `html[lang="bn"]` — a Noto Sans Bengali stack, looser line height, and letter-spacing/uppercase suppressed on headings, nav, and buttons (the template's Lato styling mangles Bengali otherwise). Both pages load Noto Sans Bengali from Google Fonts; the English page uses it for the Bengali brand name via the `.bn` class. Bengali numerals are used throughout `bn.html`, Western numerals throughout `index.html`.
- **Authoritative contact details:** email `shesherkobita38@gmail.com`, mobile `01994380730` (`tel:+8801994380730`), Sonali Bank Dhuptara Branch account `3606102000763` in the name of Mitali Hossain Trust. These appear in the sidebar footer icons, the JSON-LD, and the contact table on both pages, and in `docs/`. The older `shesherkobita.contact@gmail.com` is retired; `npm test` fails if it reappears.
- **SEO surface is non-trivial and self-consistent.** Editing any of {`<title>`, meta description, canonical URL, hero image} means updating, in tandem: the head `<meta>` block, the Open Graph block, the Twitter card block, the JSON-LD `@graph` (an `NGO` for the Trust plus a `LodgingBusiness`/`Project` for the ashram, cross-linked by `@id`) — on **both** pages — and `sitemap.xml`, which lists both URLs with `xhtml:link` alternates, pins the `images/pp/` figures, and carries a `<lastmod>` that should bump when content changes meaningfully. Titles, descriptions, and keywords deliberately mix Bengali and English terms on both pages. `robots.txt` is a static `Allow: /` and rarely needs edits.
- **Image assets.** In-page imagery comes from `images/pp/` (JPEGs, 24–201 KB each, converted from the proposal figures) plus `images/site_location.png` and `images/logo_small.png`. The older sketches and multi-megabyte originals in `images/` (`shesher_kobita_*.png`, `sketch*.png`, `concept_design*.png`, `breaking_ground.png`) are retained as source artwork but are no longer referenced by the pages — `npm run lint` will reject any that get linked in at their current size.

## Design intent (from `docs/`)

`docs/review-checklist.md` is the current review target and is written against the project proposal. `docs/concept-webpage-brief.md` is marked superseded; only its visual direction (green / white / charcoal palette, calm and uncrowded layout, generous imagery) still applies. The page must remain a ready-to-open static deliverable with no build step required for viewing.

## Licensing

All site content, images, and copy are proprietary (see `README.md`). Do not pull in third-party content under incompatible licenses, and do not add an open-source license file.
