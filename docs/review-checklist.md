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

- [ ] Brand/logo is visible near the top of the page
- [ ] The page clearly introduces the Shesher Kobita concept
- [ ] Facilities are described
- [ ] Village serenity is described
- [ ] Proximity to Dhaka and modern healthcare is described
- [ ] Organic food offering is described
- [ ] Activities are described
- [ ] Worship access near the mosque is described
- [ ] Reservation contact `shesherkobita@gmail.com` is present and easy to find
- [ ] Both concept design images are prominently featured

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
