# Home Page Experience Blueprint

## Hero Section

- Layout: 12-column grid; text block spans columns 1-6, metrics card spans 8-12 with 1-column gutter buffer.
- Background: full-bleed hero image with `linear-gradient(135deg, rgba(10,28,60,0.85), rgba(18,59,104,0.85))` overlay.
- Content stack: eyebrow text ("Personal Injury Advocate"), H1 headline, supporting paragraph, trust badge (20+ years emblem), CTA buttons (`Primary: Book Consultation`, `Secondary: Why Hire Us`).
- Metrics card: glassmorphism style (background blur, border), includes three stat rows (Years in Practice, Cases Won, 5.0 Rating) with iconography.
- Responsive behaviour: below 1024px metrics card drops beneath text but above CTAs; below 768px hero height auto with background image repositioned to keep subject centered.

## Value Proposition Band

- Three feature cards aligned horizontally (columns 1-4, 5-8, 9-12) on desktop; convert to horizontal scroll carousel under 768px.
- Each card contains icon, title, short blurb, and subtle link (`Learn how we advocate`).
- Background: soft mist (`#F5F7FA`) with angled divider connecting to hero.

## Case Highlights Slider

- Carousel with three visible cards on desktop; each card includes case outcome headline, settlement amount, short description, and `View Case Result` link.
- Navigation: arrow buttons outside card group and pagination dots on mobile.
- Dataset hook: use JSON feed for maintainability; lazy load secondary slides.

## Testimonial Preview Strip

- Masonry-inspired two-row layout with three testimonials; each card displays quote excerpt, star rating, reviewer name or `Anonymous`, and toggle badge.
- Include `See All Reviews` button linking to testimonials page.
- On mobile, stack cards vertically with swipeable carousel fallback.

## CTA Footer Banner

- Gradient ribbon using primary palette; copy reads "Ready for a Dedicated Legal Team?" followed by succinct supporting line.
- Elements: inline contact CTA button, secondary link to phone number, minimal form teaser icon.
- Ensure buttons maintain 48px minimum height for touch targets.
