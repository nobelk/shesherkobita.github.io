# Shesher Kobita Ananda Ashram

A bilingual static site for **Shesher Kobita Ananda Ashram** (শেষের কবিতা আনন্দ আশ্রম) — a dignified
residential care and service centre for older persons being built by Mitali Mozammel Trust in
Panchgaon, Araihazar, Narayanganj, Bangladesh.

- `index.html` — English
- `bn.html` — বাংলা

## Open locally

Open `index.html` or `bn.html` directly in any modern browser. No build step is required.

## Checks

```sh
npm test        # structural checks: assets, anchors, alt text, JSON-LD, page parity, sitemap
npm run lint    # hygiene: tag balance, metadata length, insecure refs, asset size
```

Both scripts use only Node built-ins — there are no dependencies to install.

## Content source

All copy, figures, and imagery come from the project proposal in `project_plan/`
(`PP/PP.html` in Bengali, `PP_en.pdf` in English).

## Third-party components

The layout is based on the **South** template by [Colorlib](https://colorlib.com),
licensed under CC BY 3.0; the visible "Template by Colorlib" credit in each page
footer satisfies its attribution requirement. Vendored copies keep their own
licence headers:

- Bootstrap 4.1 CSS — MIT (`assets/south/css/bootstrap.min.css`)
- Owl Carousel 2.3.4 — MIT (`assets/south/js/owl.carousel.min.js`, licence in `owl.carousel.LICENSE.txt`)
- Animate.css — MIT (`assets/south/css/animate.css`)
- Classy Nav CSS and icon font — part of the South template (`assets/south/css/classy-nav.min.css`, `assets/south/fonts/`)
- Font Awesome Free 5.15 — icons CC BY 4.0, fonts SIL OFL 1.1, code MIT (`assets/css/fontawesome-all.min.css`, `assets/webfonts/`)
- jQuery 3.6 — MIT (`assets/js/jquery.min.js`)

These licences cover the layout and code only, not the site's content.

## Copyright

Copyright (c) 2026 Shesher Kobita Ananda Ashram · Mitali Mozammel Trust. All rights reserved.

All content, images, copy, and design assets on this site are proprietary
and may not be reproduced, redistributed, or used in derivative works
without prior written permission.
