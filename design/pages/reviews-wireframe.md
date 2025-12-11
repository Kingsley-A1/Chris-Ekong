# Reviews Page Experience Blueprint

## Submission Banner

- Full-width intro block with gradient background and copy inviting visitors to share their experience.
- Contains primary CTA (`Share Your Story`) triggering feedback form modal and secondary link to Google Reviews profile.
- Include privacy note referencing anonymity option.

## Review Cards Layout

- Masonry grid (3 columns desktop, 2 tablet, 1 mobile) with consistent 24px gaps; cards auto-adjust height based on content length.
- Card elements: star rating, quote excerpt, reviewer identity (name or `Anonymous`), anonymity pill indicator, service tags, and `Read Full Review` link.
- Hover state: card elevation and highlight of anonymity pill; on mobile, add swipe gestures for horizontal scroll alternative.

## Filter and Sort Controls

- Sticky utility bar at top with dropdown filters (Service Type, Rating) and sort toggles (Recent, Highest Rated).
- Provide search input for keywords (e.g., "settlement").
- Controls accessible via keyboard with ARIA roles and `aria-live` region to announce result count updates.

## Trust Widgets

- Sidebar (or footer on mobile) featuring aggregated rating dial, Google Reviews badge, and accreditation seals.
- Each widget links to external verification where applicable.
- Add testimonial stats: number of reviews, average rating, response time acknowledgement.
