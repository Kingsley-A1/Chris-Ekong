# Barr Chris Portfolio Redesign Checklist

## 1. Strategy Alignment

- [x] Reconfirm project goals with stakeholders using the original site copy as the baseline (see design/brand-style-guide.md).
- [x] Map desired emotional tone (confident, empathetic advocate) to brand attributes and document in style guide.
- [x] Select final brand palette (navy gradients, coral accents, off-white neutrals) and log HEX/RGB values.
- [x] Approve typography stack (primary sans-serif, supporting serif) and define hierarchy scale.

## 2. Global System Foundations

- [x] Architect 12-column responsive grid and spacing system (see design/global-system-spec.md).
- [x] Design sticky navigation with scroll transform, navigation hover interactions, and highlighted contact CTA.
- [x] Prototype hero layout with gradient overlay, headline block, and metrics card to mirror reference inspiration.
- [x] Draft component inventory (buttons, cards, badges, stats) with interaction specs.
- [x] Define accessibility checklist (contrast, focus rings, ARIA usage, skip link) and bake into dev QA plan.
- [x] Plan performance budget: image compression workflow, lazy loading strategy, and script deferral guidelines.

## 3. Page Execution

### Home (`index.html`)

- [x] Build hero section with full-bleed visual, trust badge, and dual CTAs including metrics sidebar (see design/pages/home-wireframe.md).
- [x] Implement value proposition band with responsive cards/carousel behaviour.
- [x] Develop case highlights slider showcasing outcomes and service types.
- [x] Surface testimonial preview cards with anonymity support indicator.
- [x] Create gradient CTA footer featuring contact prompt and scheduling button.

### About (`about.html`)

- [x] Lay out mission intro with portrait, mission copy, and quick facts badges (see design/pages/about-wireframe.md).
- [x] Construct horizontal timeline with parallax effect and mobile scroll adjustments.
- [x] Assemble credentials grid with icons for certifications and associations.
- [x] Prepare modular team/partner cards for future scaling.

### Services and Results

- [x] Design service matrix cards including icons, summaries, and deep-link CTAs (see design/pages/services-results-wireframe.md).
- [x] Illustrate process infographic with numbered steps and micro-interactions.
- [x] Implement animated counters for key outcome statistics.

### Reviews (`testimonials.html`)

- [x] Add review submission banner encouraging feedback (see design/pages/reviews-wireframe.md).
- [x] Create masonry review layout with rating display and anonymity toggle handling.
- [x] Build filtering controls for rating, date, and service categories.
- [x] Embed trust widgets (Google badge, aggregated rating dial, awards list).

### Contact (`contact.html` and `thanks.html`)

- [x] Mirror hero info card style for contact introduction (see design/pages/contact-wireframe.md).
- [x] Develop multi-step contact form with validation and progress indicator.
- [x] Integrate interactive map with collapsible service area accordions.
- [x] Craft confirmation page messaging with response expectations and social proof.

### Additional Pages

- [x] Redesign 404 page with friendly copy, illustration, and quick navigation (see design/pages/additional-pages-wireframe.md).
- [x] Restyle sitemap/legal content for consistency with global typography and spacing.

## 4. Interaction and Motion

- [ ] Implement gradient button hover transitions with elevation shift and reduced motion fallback.
- [ ] Configure scroll-triggered section reveals respecting `prefers-reduced-motion`.
- [ ] Make review filter bar sticky with smooth anchor scrolling behaviour.
- [ ] Add contextual tooltips for complex form fields.

## 5. Responsive Execution

- [ ] Establish breakpoints at 375px, 768px, 1024px, and 1440px across stylesheets.
- [ ] Deliver full-screen overlay navigation for mobile with staggered link animation.
- [ ] Convert desktop grids to single-column stacks and swipeable carousels on small devices.
- [ ] Verify critical CTAs remain visible above the fold on mobile and tablet.

## 6. Review Anonymity Feature

- [ ] Update testimonials data model to include `isAnonymous` flag and anonymised name handling.
- [ ] Add "Display my name" toggle (default off) to review submission form with live preview.
- [ ] Show anonymity pill/tag on testimonial cards when names are hidden.
- [ ] Test anonymity flow end-to-end, including existing reviews migration.

## 7. Delivery Roadmap

- [ ] Phase 1 — Audit current markup, inventory components, and capture analytics baseline.
- [ ] Phase 2 — Build design system components in Figma (colors, typography, buttons, cards, overlays).
- [ ] Phase 3 — Rebuild global layout (header, footer, core sections) with semantic HTML and utility classes.
- [ ] Phase 4 — Integrate interactive components (sliders, timeline, filters, anonymity toggle) in `assets/js` modules.
- [ ] Phase 5 — Run automated and manual QA (Lighthouse, axe, cross-browser, device lab).
- [ ] Phase 6 — Deploy via Netlify, monitor performance and UX metrics, collect feedback.

## 8. Assets and Content

- [ ] Preserve original copy while highlighting key phrases through typographic emphasis.
- [ ] Curate or produce imagery aligned with legal services aesthetic and optimize for AVIF/WebP.
- [ ] Refresh favicon and web manifest to match new palette and gradients.
- [ ] Align `site.webmanifest` theme color with hero gradient selection.

## 9. Success Metrics Tracking

- [ ] Configure analytics goals for contact form submissions to target +25% uplift.
- [ ] Monitor mobile bounce rate aiming for 20% reduction post-launch.
- [ ] Achieve ≥ 90 scores on Lighthouse (Performance, Accessibility, Best Practices, SEO).
- [ ] Collect qualitative feedback from at least five clients via new feedback form.

## 10. Immediate Next Actions

- [ ] Circulate checklist to stakeholders for approval.
- [ ] Kick off high-fidelity wireframes for Home, Reviews, and Contact pages.
- [ ] Schedule design review to finalise global components before development sprint.
