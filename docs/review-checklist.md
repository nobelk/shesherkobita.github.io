# Shesher Kobita Responsive Webpage Review Checklist

## Baseline Assessment (2026-04-10)

Current repository state reviewed in this worker lane:

- Present: static `index.html`, `styles.css`, verification scripts, logo
  asset, and concept design images
- Review focus: content accuracy, single-column responsiveness, visual
  hierarchy, and QA evidence

Implementation-dependent checks are now passable in principle. The
checklist below defines the review target for the refined final static
page.

## Content Completeness

Content is checked against the project proposal
(`project_plan/PP/PP.html`, `project_plan/PP_en.pdf`), which supersedes
the retreat-concept brief. Every item below applies to **both**
`index.html` (English) and `bn.html` (Bengali).

- [ ] Brand/logo is visible near the top of the page
- [ ] The purpose of the appeal (one-time construction cost) is stated up front
- [ ] Key figures match the proposal: BDT 27,982,500 / 60 residents / 11,000 sq ft / 22 decimals
- [ ] The need (demographics, isolation, service gap) is described
- [ ] Design, facilities, and services are described
- [ ] Location, building plan, staffing, and implementation schedule are described
- [ ] The construction budget table totals 27,982,500
- [ ] All three donation mechanisms are described (lifetime residence, Sadaqah Jariyah, general)
- [ ] Trust profile, objectives, and Board of Trustees are listed
- [ ] Contact `shesherkobita38@gmail.com`, mobile, and bank details are present and easy to find
- [ ] Proposal renderings and plans are prominently featured

## Bilingual Delivery

- [ ] English and Bengali pages carry the same sections in the same order
- [ ] Language switcher is visible on both pages and marks the current one
- [ ] `<html lang>`, canonical, and `hreflang` alternates are correct on both pages
- [ ] `sitemap.xml` lists both URLs with `xhtml:link` alternates
- [ ] Figures, budget numbers, and names agree between the two pages

## Visual / Design Quality

- [ ] Overall palette follows a green / white / black direction inspired by the logo
- [ ] Layout feels calm, clean, and artistic rather than crowded
- [ ] Imagery is given sufficient prominence and breathing room
- [ ] Typography is readable and consistent
- [ ] Sections are visually distinct without excessive decoration

## Responsive Behavior

### Mobile checks

- [ ] No horizontal scrolling at small viewport widths
- [ ] Sections stack cleanly in a single column where needed
- [ ] Image sizing remains legible and unclipped
- [ ] Buttons/links remain easy to tap
- [ ] Contact information is readable without zooming

### Desktop checks

- [ ] Layout expands gracefully with balanced whitespace
- [ ] Galleries/cards/feature rows align cleanly
- [ ] Long line lengths are controlled for readability
- [ ] Hero and featured imagery retain visual impact

## Accessibility / Quality Checks

- [ ] Semantic landmarks are used (`header`, `main`, `section`, `footer`)
- [ ] Images include meaningful alt text
- [ ] Color contrast is sufficient for body text and CTA text
- [ ] Heading hierarchy is logical
- [ ] Email contact is keyboard accessible

## Ready-to-Open Static Delivery

- [ ] Page works by opening the HTML file directly in a browser
- [ ] Asset paths resolve locally
- [ ] No build step is required for viewing core content
- [ ] No placeholder lorem ipsum remains
- [ ] No debug/test-only content is visible in the final page

## Suggested Verification Evidence to Capture

When implementation lands, capture at minimum:

1. Desktop screenshot or visual inspection summary
2. Mobile-width screenshot or inspection summary
3. Browser-open verification for local static usage
4. Any lint/validation output available for the changed files

## Reviewer Notes

To keep implementation and review aligned, treat this checklist and
`docs/concept-webpage-brief.md` as the documentation baseline for the
final deliverable.
