# Update 1 — Redesign on the Colorlib "South" template

Status: implemented on `template-update` (see section 13). Plan reviewed by codex (section 12).
Branch: `template-update`
Template source: `templates/south-master/` (Colorlib "South", Bootstrap 4, CC BY 3.0)

## 1. Goal

Replace the HTML5 UP "Read Only" look (fixed left sidebar + single column) of
`index.html` and `bn.html` with a layout built from the South template:
top contact bar, sticky horizontal nav, full-width hero, card grids,
parallax call-to-action band, split "editor" block and a four-column footer.

What stays the same:

- Two static pages (English `index.html`, Bengali `bn.html`), no build step,
  opened straight from disk or served from GitHub Pages.
- Same eight sections in the same order, ids `#one`–`#eight`, nav targets
  unchanged.
- All copy, figures, names, disclaimers and bank details carried over
  verbatim from the current pages (which already match `project_plan/`).
  The only new words are UI labels the layout needs ("Skip to content",
  "Pause slideshow", "Back to top", gallery caption, CTA strapline) — each
  written in both languages and built only from facts already on the page.
- `npm test`, `npm run lint`, `npm run typecheck` all pass after every
  commit.

The site must also use every real image in the repo (section 5).

### 1.1 Head changes (the complete list — nothing else in `<head>` changes)

On both pages:

1. `<html lang=".." class="no-js">` plus a one-line inline script as the
   first thing in `<head>`:
   `document.documentElement.className = document.documentElement.className.replace('no-js', 'js');`
2. `<meta name="theme-color">`: `#4acaa8` (old teal) → `#4f6f35` (site green).
3. Favicon links: `<link rel="icon" href="images/favicon-32.png">` and
   `<link rel="apple-touch-icon" href="images/apple-touch-icon.png">`.
4. Font link: one Google Fonts `<link>` for Open Sans (400/600/700) +
   Noto Sans Bengali (400/700), `display=swap`. Replaces the current
   Noto-only link.
5. Stylesheets: `assets/css/fontawesome-all.min.css`,
   `assets/south/style.css`, `assets/css/site.css` (in that order).
   `assets/css/main.css` is dropped.
6. JSON-LD: the `NGO` node's `logo` points at `images/logo-wordmark.png`
   (web-sized, see 5). Everything else in the `@graph` unchanged.

Title, description, keywords, Open Graph, Twitter card, canonical and
hreflang are untouched.

## 2. What we take from the template, and what we leave behind

### Taken

| Template piece | Classes / files | Used for |
|---|---|---|
| Top header bar | `.top-header-area` | Email, phone, language switch |
| Sticky main header + Classy Nav **CSS** | `.main-header-area`, `.classy-navbar`, `.classynav`, `.classy-menu`, `classy-nav.min.css`, `fonts/classy.*` | Logo + the 8 section links; mobile slide-in menu (behaviour in our own JS, see 7) |
| Hero | `.hero-area`, `.single-hero-slide`, Owl Carousel | Proposal renderings behind a static title block |
| Floating search panel | `.south-search-area` / `.advanced-search-form` (visual shell only) | Key-figures panel overlapping the hero |
| Section heading | `.section-heading` | Every section title + sub-line |
| About block | `.about-content-wrapper`, `.about-content` | `#one` About |
| Property cards | `.single-featured-property`, `.property-thumb`, `.property-content`, `.tag` | Design renderings (`#three`), donation options (`#six`) |
| Call-to-action band | `.call-to-action-area.bg-fixed.bg-overlay-black` | Appeal band between Budget and Support Us |
| Testimonial card | `.single-testimonial-slide` (static, no carousel) | Chair's message in `#eight` |
| Editor split block | `.south-editor-area`, `.editor-content-area`, `.editor-thumbnail` | Trust profile in `#seven` |
| Weekly-hours list | `.weekly-office-hours` | Key-value rows ("At a glance", contact/bank details) |
| Footer | `.footer-area`, `.footer-widget-area`, `.useful-links-nav` | About / Contact / Quick links / image strip |
| Buttons | `.south-btn` | All CTAs |
| Animations | `animate.css` classes | Section reveal, driven by our own IntersectionObserver (7) |

### Left behind

- **All template stock photos and icons** (`img/bg-img/`, `img/blog-img/`,
  `img/icons/`, `img/core-img/` incl. logo, signature, favicon). Real-estate
  stock art with unclear licensing; the site's rule is "no third-party
  content". Icons come from the Font Awesome 5 set the site already ships.
- **`js/plugins.js` as a bundle.** It contains Owl, sticky, WOW, Magnific
  Popup, Nice Select, easing, scrollUp, Waypoints and counterUp —
  **counterUp is GPL v2**, which does not fit a proprietary site. We
  extract **only Owl Carousel 2** (MIT) from it into
  `assets/south/js/owl.carousel.min.js`, keeping its licence header comment
  intact. Everything else is either not needed or replaced by a few lines
  in `site.js`:
  - sticky header → CSS `position: sticky`
  - WOW → IntersectionObserver adding `animate.css` classes
  - scrollUp → a plain `<a href="#top">` button shown by our JS
  - counterUp, Waypoints, Magnific, Nice Select, easing → dropped
- **`classy-nav.min.js`** → replaced by ~30 lines of our own menu code
  (open/close, `aria-expanded`, Escape, focus return, breakpoint class),
  because the plugin toggles only visual classes. The Classy **CSS** is
  kept.
- **Every form** (header search, advanced search, contact form). The site
  has no backend and a form was deliberately removed in commit `51915d1`.
- **Google Maps** (`map-active.js` + hard-coded API key). The existing
  `images/site_location.png` stays, plus a plain "Open in Google Maps" link.
- **Preloader** (`#preloader`) — hides the page until JS runs.
- Mega-menu, dropdowns, jQuery UI, Bootstrap JS, Popper.
- **Font Awesome 4.7 and Themify** icon fonts — replaced by existing FA5.
- **Template jQuery 2.2.4** (known XSS advisories). The site's own
  `assets/js/jquery.min.js` is **v3.6.0**; Owl 2 runs on it.
- The template's `document.write(new Date().getFullYear())` copyright.
- Template pages other than `index.html`.

### Licences

- South is CC BY 3.0: a visible footer credit **"Template by Colorlib"**
  linking to `https://colorlib.com` on both pages (not only an HTML
  comment). Test enforces it (section 8).
- Vendored third-party files keep their original licence header comments:
  Bootstrap 4 (MIT), Owl Carousel 2 (MIT), animate.css (MIT), Classy Nav
  CSS (as shipped), Font Awesome (already present). No GPL code is shipped.
- `README.md` gets a short "Third-party components" list naming each with
  its licence, next to the existing proprietary-content notice. No
  top-level licence file is added (CLAUDE.md rule).

## 3. File layout after the change

```
assets/
  south/                        # vendored, trimmed copy of the template
    css/bootstrap.min.css
    css/classy-nav.min.css
    css/owl.carousel.css
    css/animate.css
    fonts/classy.{eot,svg,ttf,woff}
    js/owl.carousel.min.js      # extracted from plugins.js, licence header kept
    style.css                   # template master CSS, see 4.1
  css/site.css                  # rewritten: theme tokens, overrides, Bengali typography
  css/fontawesome-all.min.css   # kept
  webfonts/                     # kept
  js/jquery.min.js              # kept (v3.6.0)
  js/site.js                    # new, replaces template active.js and old main.js
images/
  pp/                           # unchanged, proposal figures
  concept/                      # new, web-sized JPEGs of the early artwork (5)
  logo-wordmark.png             # new, web-sized shesher_kobita_logo.png
  favicon-32.png, apple-touch-icon.png   # new, from logo_small2.png
```

Check during vendoring: every `url()` inside the kept CSS files resolves
(Classy fonts, `owl.video.play.png` if referenced — copy it or strip the
video rules).

Removed once both pages are switched over and tests pass (separate commit,
revertible alone): `assets/css/main.css`, `assets/sass/`,
`assets/js/{main,util,browser.min,breakpoints.min,jquery.scrollex.min,jquery.scrolly.min}.js`.

`templates/south-master/` itself is **not** committed (6.6 MB, mostly
stock photos): add it to `.gitignore`. Only this plan lives under
`templates/`.

## 4. Styling

### 4.1 Vendored `assets/south/style.css`

Copy `templates/south-master/style.css`, then edit only:

1. `@import` list: keep `bootstrap`, `animate`, `owl.carousel`,
   `classy-nav`; drop `magnific-popup`, `font-awesome`, `themify-icons`,
   `nice-select`, `jquery-ui`, and the Open Sans Google-Fonts `@import`
   (moved to the head `<link>`, 1.1).
2. Replace the brown accent `#947054` (49 occurrences) with `#4f6f35`.
3. Remove `.south-load` / `#preloader` rules.

No regeneration from `templates/south-master/scss/` — Sass and CSS stay
decoupled, as with the old template.

### 4.2 `assets/css/site.css` (hand-written, loaded last)

- Tokens on `:root`, from the SK logo:
  - `--sk-green: #4f6f35` (accent, buttons, links) — ≥ 4.5:1 on white
  - `--sk-green-dark: #3a5226` (hover, footer overlay)
  - `--sk-green-tint: #eef3e8` (alternate section background)
  - `--sk-charcoal: #2b2b2b` (headings)
  - `--sk-text: #555` (body; template's `#7d7d7d` fails WCAG AA on white)
  - `--sk-white: #fff`
- Footer: template's brown `.gradient-background-overlay` re-coloured
  green → charcoal.
- Tables (`.sk-table`): port the current `table.alt` look (bordered, zebra
  rows, right-aligned `.amount`, bold `tfoot`); wrap in Bootstrap's
  `.table-responsive`.
- Facilities list: 2/3-column grid of FA5 icon + text (`.sk-facilities`).
- `figure` / `figcaption`, `.note`, chair-quote card.
- Hero: slides are real `<img>` with `object-fit: cover` (keeps alt text
  and indexability), dark overlay for text contrast. The title block sits
  **outside** the carousel (6.2).
- Header: `.main-header-area { position: sticky; top: 0; z-index: 100 }`;
  `scroll-margin-top` on sections = header height so anchor jumps are not
  hidden behind it (works without JS).
- **No-JS rules (`html.no-js`)**:
  - `.classy-menu` shown inline as a normal horizontal/wrapped list (not
    the off-canvas panel), toggler hidden — nav works at every width.
  - Owl already ships `.no-js .owl-carousel { display:block }`; add
    `.no-js .hero-slides > :not(:first-child) { display:none }` so only
    the first rendering shows.
  - Reveal animations never hide content (elements start visible; JS adds
    the hidden state only when it will also animate them in).
- `bg-fixed` parallax off below 992 px and on touch devices
  (`@media (hover: none)`): `background-attachment: scroll`.
- `@media (prefers-reduced-motion: reduce)`: no animations, no parallax,
  no smooth scroll.
- Visible `:focus-visible` outline on nav links, buttons, carousel
  controls; `.skip-link` visible on focus.

### 4.3 Fonts and Bengali

- Both pages load Open Sans + Noto Sans Bengali (1.1).
- Port every `html[lang="bn"]` rule from the current `site.css`: Noto Sans
  Bengali first in the stack, line-height ~1.8.
- South sets `text-transform: uppercase` on 17 selectors (plus
  `letter-spacing` in places): headings, nav links, buttons, `.tag`,
  `.widget-title`, `.section-heading`, footer titles, etc. Neutralise each
  under `html[lang="bn"]` (`text-transform:none; letter-spacing:normal`),
  and do the same for `.bn` spans on the English page.
- Every Bengali fragment on `index.html` is marked `lang="bn"` (not just
  `class="bn"`) so screen readers switch voice; `verify-site` checks it (8).
- Bengali numerals stay in `bn.html` content, including the key-figure
  panel. No counter animation anywhere (counterUp is dropped).

## 5. Images — every real image gets a place

Early-concept images show an earlier single-storey courtyard scheme with a
library and guest rooms. That is **not** the building in the current
proposal (two storeys, 11,000 sq ft, 60 residents; the Smriti 71 Library
is separate and not part of this building). They appear only in a clearly
labelled gallery.

| File | Size now | Web asset | Where it appears |
|---|---|---|---|
| `pp/aerial-rendering.jpg` | 201 KB | as is | Hero slide 1; `#one` About image; og:image (unchanged) |
| `pp/front-elevation.jpg` | 44 KB | as is | Hero slide 2; `#three` card "Arrival and entrance" |
| `pp/courtyard.jpg` | 54 KB | as is | Hero slide 3; `#three` card "Landscaped courtyard" |
| `pp/residential-room.jpg` | 33 KB | as is | `#three` card |
| `pp/dining-community.jpg` | 45 KB | as is | `#three` card |
| `pp/room-corridor.jpg` | 24 KB | as is | `#three` card |
| `pp/site-plan.jpg` | 38 KB | as is | `#three` Plans and drawings |
| `pp/first-floor-plan.jpg` | 88 KB | as is | `#three` Plans and drawings |
| `pp/family-separation.jpg` | 72 KB | as is | `#two` The Need |
| `pp/social-isolation.jpg` | 65 KB | as is | `#two` The Need |
| `pp/inaugural-meeting.jpg` | 36 KB | as is | `#seven` editor-block image |
| `pp/trust-event.jpg` | 50 KB | as is | `#seven` figure |
| `site_location.png` | 479 KB | as is | `#four` Location |
| `logo_small.png` | 373 KB | as is | Header logo (`.nav-brand`) |
| `shesher_kobita_logo.png` | 3.x MB | `images/logo-wordmark.png` (≤ 800 px wide, ≤ 150 KB) | Footer "About" widget; JSON-LD `logo`; sitemap entry repointed |
| `logo_small1.png` | 153 KB | as is | `#one` sidebar brand card |
| `logo_small2.png` | 44 KB | `favicon-32.png`, `apple-touch-icon.png` (180 px) | Head icon links |
| `breaking_ground.png` | 4.9 MB | `concept/breaking-ground.jpg` (1600 px, ≤ 300 KB) | CTA band after `#five` **and** the concept gallery (so it is a page-level `<img>` too, not only a CSS background) |
| `concept_design1.png` | 3.0 MB | `concept/courtyard-aerial.jpg` | Concept gallery |
| `concept_design2.png` | 2.8 MB | `concept/courtyard-garden.jpg` | Concept gallery |
| `Screenshot 2026-04-10 at 10.39.44 AM.png` (library interior render) | 2.6 MB | `concept/library-interior.jpg` | Concept gallery |
| `library_sketch.png` | 1.1 MB | `concept/courtyard-library-sketch.jpg` | Concept gallery |
| `sketch1.png` | 2.6 MB | `concept/concept-sketch-aerial.jpg` | Concept gallery |
| `sketch2.png` | 1.7 MB | `concept/concept-sketch-sections.jpg` | Concept gallery |
| `sketch3.png` | 2.3 MB | `concept/concept-sketch-plan.jpg` | Concept gallery |
| `shesher_kobita_design1.png` | 3.6 MB | `concept/concept-board-colour.jpg` | Concept gallery |
| `shesher_kobita_design2.png` | 3.8 MB | `concept/concept-board-sketch.jpg` | Concept gallery |
| `shesher_kobita_banner.png` | 3.4 MB | `concept/concept-board-sepia.jpg` | Concept gallery |

**Not used, on purpose:** `banner.jpg`, `avatar.jpg`, `pic01.jpg`,
`pic02.jpg`, `pic03.jpg` — blank gradient placeholders from the HTML5 UP
template, not content. Deleted in the cleanup commit.

**Screenshot filename:** it contains a narrow no-break space (U+202F)
before `AM`. First step of the image commit: `git mv` it (via a glob,
`images/Screenshot*`) to `images/library_interior_render.png`, so every
later command uses an ASCII path.

Conversion (macOS `sips`, no new dependency), originals kept:

```sh
sips -s format jpeg -s formatOptions 72 -Z 1600 images/sketch1.png --out images/concept/concept-sketch-aerial.jpg
```

Done from a small manifest (source → destination) in a scratch shell
script; afterwards assert every destination exists and is ≤ 300 KB.
`npm run lint` enforces the 1.5 MB ceiling as a backstop.

**Early concept gallery** (end of `#three`, after Plans and drawings):
heading "Early concept studies" / "প্রাথমিক ধারণা-চিত্র". Caption:
"Earlier artwork exploring the site. The design in the current proposal
is the two-storey building shown above; the library pictured here is not
part of this project. All designs and renderings are conceptual and
subject to final design approval." (Bengali equivalent, reusing the
wording of the existing Bengali disclaimer for the last sentence.)
Grid of 11 thumbnails (3 per row desktop, 2 tablet, 1 phone), each an
`<a href>` to the full JPEG wrapping `<img loading="lazy">` with specific
alt text. No lightbox.

All below-the-fold images get `loading="lazy"` and explicit
`width`/`height`. Hero slide 1 is eager.

## 6. Page structure (both pages identical; English labels shown)

### 6.1 Header

```
<a class="skip-link" href="#main">Skip to content</a>
<header class="header-area">
  <div class="top-header-area">   email link · phone link · ul.lang-switch (English | বাংলা, aria-current="page" on the active one)
  <div class="main-header-area">
    <div class="classy-nav-container breakpoint-off">
      <nav id="nav" class="classy-navbar justify-content-between" aria-label="Sections">
        a.nav-brand → logo_small.png + "Shesher Kobita" text
        <button type="button" class="classy-navbar-toggler" aria-controls="site-menu" aria-expanded="false" aria-label="Menu">
        <div class="classy-menu" id="site-menu"> close button · div.classynav > ul > 8 × <li><a href="#one">About</a> …
```

- `id="nav"` is on the `<nav>` itself. `verify-site.mjs` matches
  `<nav id="nav">` literally today; the regex becomes
  `/<nav id="nav"[^>]*>([\s\S]*?)<\/nav>/`, and the check **fails** if
  either page yields zero section ids (today two empty matches pass).
- Lang switch lives in the top bar, outside `#nav`.

### 6.2 Hero (first thing inside `<main id="main">`)

```
<main id="main">
  <section class="hero-area" aria-label="Project renderings">
    <div class="hero-slides owl-carousel">   3 × <div class="single-hero-slide"><img …></div>
    <div class="hero-caption">                static, outside the carousel
      <h1>Shesher Kobita Ananda Ashram</h1>  (bn: শেষের কবিতা আনন্দ আশ্রম)
      <p>A dignified residential care and service centre for older persons</p>
      <a class="btn south-btn" href="#six">Support Us</a> <a … href="#one">Read the proposal</a>
    <div class="hero-controls">               real <button type="button">s: Previous, Next, Pause/Play (aria-pressed)
  </section>
  <div class="south-search-area"> key-figures panel (4 stats from current ul.stats)
  <section id="one"> …
```

- The single `<h1>` and the CTAs are never inside Owl, so clones cannot
  duplicate them.
- Owl options: `loop:false` (no clones at all), `nav:false, dots:false`
  (Owl's `<div>` controls are not keyboard-operable — our own buttons call
  `trigger('prev.owl.carousel')` / `trigger('next.owl.carousel')`, and
  wrap to the first/last slide with `trigger('to.owl.carousel', [i])`),
  `autoplay:false`. The bundled Owl is a 2.0 beta with no `rewind`
  option, so autoplay is our own 6 s timer in `site.js` that advances
  with wrap-around; it pauses on `mouseenter`/`focusin` and resumes on
  `mouseleave`/`focusout` (unless the user pressed Pause). Pause/Play
  button satisfies WCAG 2.2.2.
- Non-visible slides get `aria-hidden="true"` and are updated on Owl's
  `changed.owl.carousel` event; slide images carry alt text.
- Reduced motion: Owl **is** initialised (all slides stay reachable via
  the buttons) with `smartSpeed:0`, and our timer never starts.

### 6.3 Sections

Sections alternate white / `--sk-green-tint`, `section-padding-100`.

| id | Layout | Content (all carried over) |
|---|---|---|
| `#one` About | `.about-content-wrapper`: col-lg-8 = section-heading (h2), aerial image, "Purpose of this appeal", "Executive summary" (3 paragraphs); col-lg-4 = brand card (`logo_small1.png`, Bengali name with `lang="bn"`) + "At a glance" `.weekly-office-hours` list | current `#one` |
| `#two` The Need | section-heading; lead paragraph; two figures (col-md-6); remaining 4 paragraphs; **"Source note" `.note` verbatim** | current `#two` |
| `#three` Design & Facilities | intro; 5 `.single-featured-property` cards (col-md-6 col-xl-4) — image, `.tag`, `h4` title, text; "Facilities and services" 11-item icon grid; "Plans and drawings" two figures with captions; Early concept gallery (5) | current `#three` + gallery |
| `#four` The Project | Location text + `site_location.png` + "Open in Google Maps" link (`https://www.google.com/maps/search/?api=1&query=Panchgaon+Araihazar+Narayanganj`); building-plan table; ground/first-floor paragraph; staffing table + "Staff salaries…" paragraph; implementation-schedule table | current `#four` |
| `#five` Budget | intro line; budget table (11 rows + total); total sentence; "Sustainability of operating costs" (2 paragraphs) | current `#five` |
| CTA band (no id, not in nav) | `.call-to-action-area.bg-fixed`, background `concept/breaking-ground.jpg`, green overlay: "Help us break ground" / "BDT 27,982,500 one-time construction appeal", button → `#six` | new strapline from existing facts |
| `#six` Support Us | intro; three cards with FA5 icon header (`fa-key`, `fa-hand-holding-heart`, `fa-donate`) and all their paragraphs; Policy on the use of funds; Transparency and accountability; CTA → `#eight` | current `#six` |
| `#seven` The Trust | `.south-editor-area`: left = heading, Trust paragraph, objectives list (5 items), land/deed paragraph; right = `inaugural-meeting.jpg`; below: `trust-event.jpg` figure + Board of Trustees table | current `#seven` |
| `#eight` Contact | Chair's message (3 paragraphs + name/title) in a `.single-testimonial-slide` card; contact + bank details list with `tel:` / `mailto:` / website links; email button; **proposal-source and design-status disclaimer `.note` verbatim** (EN: "This English page is a translation … subject to final design approval."; BN: "এই পৃষ্ঠার তথ্য … পরিবর্তনযোগ্য।") | current `#eight` |

Heading levels: `h1` hero, `h2` section titles, `h3` sub-headings,
`h4` card titles — no skips.

### 6.4 Footer (`.footer-area`, outside `<main>`)

1. **About** — `logo-wordmark.png`, hero sub-line.
2. **Contact** — phone, email, "Panchgaon Mouza, Duptara Union,
   Araihazar, Narayanganj", bank line.
3. **Quick links** — the 8 section links + the other-language link
   ("বাংলা সংস্করণ" / "English version").
4. **Images** — a static strip of 4 `pp/` thumbnails linking to `#three`
   (no second carousel: fewer a11y problems, nothing to pause).

Copyright line: "© 2026 Shesher Kobita Ananda Ashram · Mitali Mojammel
Trust. All rights reserved. · Template by
<a href="https://colorlib.com">Colorlib</a>" (Bengali text + same credit
on `bn.html`).

## 7. JavaScript — `assets/js/site.js`

Load order at end of `<body>`: `assets/js/jquery.min.js`,
`assets/south/js/owl.carousel.min.js`, `assets/js/site.js`. All local.

`site.js` (~120 lines), every block guarded so a failure in one never
breaks the page; content is fully usable with JS off:

- **Menu** (replaces classy-nav.js): `matchMedia('(max-width: 991px)')`
  toggles `.breakpoint-on` / `.breakpoint-off` on
  `.classy-nav-container`. Toggler and close button toggle `.menu-on` on
  `#site-menu`, keep `aria-expanded` in sync, move focus into the menu on
  open, return it to the toggler on close; Escape and outside click
  close; following a link closes the menu.
- **Smooth scroll** for `a[href^="#"]` (skipped under reduced motion);
  moves focus to the target (`tabindex="-1"`), updates the hash with
  `history.replaceState`. Offset is handled by CSS `scroll-margin-top`.
- **Scroll-spy**: IntersectionObserver sets `.active` +
  `aria-current="true"` on the matching `#nav a`.
- **Hero carousel**: options and controls from 6.2.
- **Reveal**: IntersectionObserver adds `animated fadeInUp` to
  `.reveal` elements (section headings, cards) when width > 767 and
  motion allowed; no-op otherwise.
- **Back-to-top** link: shown after one viewport of scroll.

## 8. Tests and tooling changes

`scripts/verify-site.mjs`:

- Nav regex tolerant of attributes; fail on empty nav (6.1).
- No template leftovers on either page: fail on `southtemplate`, `Lorem`,
  `Suspendisse`, `Los Angeles`, `img/bg-img`, `img/core-img`,
  `maps.googleapis.com`, `preloader`, `plugins.js`, `classy-nav.min.js`.
- Colorlib credit: visible `<a href="https://colorlib.com"` present on
  both pages.
- **All images used**: collect live references — `src` / `href` / `srcset`
  attributes in each page, plus `url()` in every local stylesheet the page
  links (recursively through `@import`, resolved relative to the CSS
  file). Every file in `images/pp/` and `images/concept/` must appear in
  that set for **both** pages. Comments are stripped before scanning.
- **JSON-LD local URLs**: every `https://shesherkobita.com/...` URL in the
  JSON-LD (`logo`, `image`, etc.) resolves to a file in the repo.
- **Bengali on the English page**: every element with class `bn` on
  `index.html` also has `lang="bn"`.
- **Disclaimers present**: both `.note` texts from 6.3 exist on each page
  (match a stable phrase, e.g. "subject to final design approval" /
  "অনুমোদন সাপেক্ষে").

`scripts/lint-static.mjs`:

- Add `header`, `footer`, `main` to `BALANCED_TAGS`.
- Asset scan follows linked stylesheets recursively (`@import` and
  `url()`), resolving paths relative to each CSS file, so vendored fonts,
  the CTA background and anything Owl/Classy CSS references are
  existence- and size-checked.

`sitemap.xml`: add `image:image` entries for `concept/` images on the
English URL, repoint `shesher_kobita_logo.png` to `logo-wordmark.png`,
bump both `<lastmod>`.

`CLAUDE.md`: replace the "Read Only" template paragraph with South, new
asset paths, the header/`lang-switch` note, the image paragraph, the `#nav`
regex note, and the third-party licence list.
`docs/review-checklist.md`: add "Early concept gallery is clearly
labelled", "Carousel can be paused", "Page works with JS off".

## 9. Implementation order (one commit each)

1. Vendor trimmed template into `assets/south/` (4.1, Owl extraction with
   licence header), `.gitignore` entry. Pages untouched; tests pass.
2. Rename screenshot, convert images into `images/concept/`, favicons,
   `logo-wordmark.png` (5).
3. Test/tool updates (8) — written first against the current pages where
   possible; checks that need the new markup (credit, image coverage) are
   added in step 4/5 alongside the markup.
4. Rebuild `index.html` (1.1, 6), new `site.css` (4.2–4.3), `site.js` (7).
5. Rebuild `bn.html` with identical structure and the Bengali copy from
   the current `bn.html`.
6. Sitemap, README third-party list.
7. Remove dead HTML5 UP assets and placeholder images; update `CLAUDE.md`
   and the review checklist.

## 10. Verification

- `npm test && npm run lint && npm run typecheck` green after every commit.
- **Content manifest check** (scratch script, not committed): for each of
  `#one`–`#eight` on the old page (`git show 0a9d0eb:index.html`) and the
  new page, extract normalised text units — paragraphs, list items, table
  cells, figcaptions, headings — and assert every old unit appears in the
  same section of the new page. Run for `index.html` and `bn.html`. Then
  grep both new pages for the must-match figures from `CLAUDE.md`
  (27,982,500 / 60 / 11,000 / 22 / 17 / 32 / 6 and Bengali equivalents),
  every Board member name, and the bank account number.
- Open both pages from disk (`file://`) and via `python3 -m http.server`;
  check at 360, 768, 1024, 1440 px: no horizontal scroll, mobile menu
  opens/closes, tables scroll inside their wrapper, hero text readable.
- JS disabled: all content visible, nav visible and working at mobile
  width, hero shows the first rendering.
- Reduced motion: no autoplay, no reveal animation, carousel still
  operable by buttons.
- Keyboard only: skip link → main; menu toggler opens, Escape closes and
  focus returns; carousel buttons incl. Pause; every link reachable with
  visible focus.
- Screen reader spot-check (VoiceOver): one `h1`, landmarks
  header/nav/main/footer, hidden slides not announced, Bengali fragments
  read in Bengali.
- Contrast: body text, buttons, hero overlay text ≥ 4.5:1.
- Bengali page: no uppercase/letter-spacing artefacts, Bengali numerals
  intact, Noto Sans Bengali rendering.
- Page weight: first load under ~1.5 MB (hero image eager, rest lazy).

## 11. Risks and open questions

- **Early concept artwork vs. the proposal.** Showing a different scheme
  could confuse donors; mitigated by the labelled gallery and disclaimer.
  If the Trust prefers, drop the gallery (keep `breaking-ground.jpg` and
  logos) and narrow the "all images used" test to `images/pp/`.
- **Owl extraction.** `plugins.js` is a concatenation holding an old Owl
  2.0 beta (no `rewind`, no version string); the Owl block must be cut
  cleanly with its header. If that proves fragile or buggy under jQuery
  3.6, vendor the official Owl Carousel 2.3.4 release (MIT) instead —
  same class names and events.
- **Replacing classy-nav.js.** Classy CSS expects specific classes
  (`breakpoint-on/off`, `menu-on`, `navbarToggler.active`); our JS must
  set the same ones. Verify at 991/992 px.
- **Bootstrap 4 CSS weight** (~155 KB) — acceptable; a custom build is
  out of scope.

## 12. Review log (codex, 2026-09-22)

Codex reviewed the first draft; every finding was checked against the repo
before acceptance. All 15 accepted.

| # | Sev | Finding | Verified | Resolution |
|---|---|---|---|---|
| 1 | high | No-JS mobile nav hidden (`.classy-menu` at `left:-310px` until JS) | yes, `classy-nav.min.css` | `no-js` class + static menu CSS (1.1, 4.2) |
| 2 | high | `plugins.js` bundles Magnific, Nice Select, and GPL v2 counterUp | yes, headers in `plugins.js` | Extract only Owl (MIT); drop the rest; licence list (2) |
| 3 | high | Owl nav/dots are `<div>`s, not keyboard-operable | yes, `navElement:"div"` | Own `<button>` controls, Owl nav/dots off (6.2) |
| 4 | high | Owl clones not `aria-hidden`; loop duplicates content | yes, no `aria-hidden` in bundle | `loop:false, rewind:true`; h1/CTAs outside carousel; hidden slides `aria-hidden` (6.2) |
| 5 | med | Reduced motion made other slides unreachable | plan logic | Init Owl without autoplay/animation (6.2) |
| 6 | med | Hero `h1` + key figures outside `<main>` | plan logic | Hero inside `<main>` (6.2) |
| 7 | med | Lint would miss assets referenced from vendored CSS | `lint-static.mjs` scans HTML only | Recursive CSS scan (8) |
| 8 | med | "All images referenced" check vs. CSS-only CTA image | plan logic | Coverage includes linked CSS; CTA image also in gallery (5, 8) |
| 9 | med | "Final design" wording contradicts design-approval disclaimer | yes, `index.html:555` | Caption reworded, disclaimer sentence repeated (5) |
| 10 | med | Disclaimer mislabelled, could be dropped | yes, `bn.html:555` | Both notes preserved verbatim and tested (6.3, 8) |
| 11 | med | "Head unchanged" conflicted with head edits; stale `theme-color #4acaa8` | yes, line 20 both pages | Enumerated head changes incl. theme-color; JSON-LD URL test (1.1, 8) |
| 12 | med | Screenshot filename contains U+202F | yes | `git mv` to ASCII name first (5) |
| 13 | med | Mobile menu ARIA incomplete | plugin toggles classes only | Own menu JS with full ARIA contract (7) |
| 14 | med | Owl autoplay does not pause on focus | yes, `focusin` only in Magnific | Explicit focus handlers + Pause button (6.2) |
| 15 | med | `.bn` spans lack `lang`; whole-page text diff unreliable | plan logic | `lang="bn"` + test; per-section content manifest (4.3, 8, 10) |

Own checks during review: bundled Owl is a 2.0 beta without `rewind`
(autoplay moved to our own timer, 6.2); local jQuery is v3.6.0 (no template jQuery
needed); Owl CSS already has a `.no-js .owl-carousel` rule; South has 17
`text-transform: uppercase` rules to neutralise for Bengali.

## 13. Implementation notes (2026-09-22)

Deviations from the plan, and why:

- **Owl Carousel** is the official 2.3.4 release (MIT, from the npm
  tarball), not an extraction from `plugins.js`: the bundled copy is an
  unversioned 2.0 beta with no licence header. The fallback in section 11
  was taken.
- **Smooth scrolling** is CSS `scroll-behavior` (off under reduced
  motion) with `scroll-margin-top`; `site.js` only moves focus to the
  target section.
- **Contact and bank details** stay in the original table in `#eight`
  (verbatim content) rather than a `.weekly-office-hours` list; the
  "At a glance" sidebar in `#one` became a brand card with the donate
  button and contact links, reusing existing wording only.
- **Section eyebrows** (small nav-label line above each `<h2>`) are
  omitted where the heading already starts with the nav label.
- **Pages are generated** by a one-off script that lifts every content
  block from the previous commit's pages, so wording could not drift.
  Verified with a per-section content manifest: 245 text units per page
  (paragraphs, list items, table cells, captions, headings, alt text) all
  present in the same section, plus all key figures in both languages.
- **Browser checks** (headless Chromium via Brave) at 1440/1024/768/375 px
  on both pages: no console errors, no failed requests, no horizontal
  overflow, one `h1`; mobile menu opens with focus on the first link,
  Escape closes it and returns focus; carousel buttons, pause and
  `aria-hidden` on off-screen slides work; scroll-spy marks the current
  section; with JavaScript off all eight nav links are visible and the
  first hero image shows; reduced motion disables autoplay and reveal.
