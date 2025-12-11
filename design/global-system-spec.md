# Global System Specifications

## Layout Grid and Spacing

- 12-column grid with 80px gutters on ≥1440px, 64px gutters on 1024–1439px, 32px gutters on 768–1023px, and 16px gutters below 768px.
- Max content width: 1200px; side padding of 24px (desktop) and 16px (mobile).
- Vertical rhythm: 80px sections on desktop, 48px on tablet, 32px on mobile; maintain multiples of 16px for internal spacing.
- Establish CSS variables: `--container-width`, `--grid-gutter`, `--section-gap` responsive via media queries.

## Navigation and Hero Behavior

- Sticky header transitions from transparent to solid navy (`rgba(10,28,60,0.95)`) after 48px scroll.
- Primary navigation items include subtle underline animation and color shift to `#FF6B3D` on hover/focus.
- Contact CTA renders as pill button with gradient background and drop shadow on hover.
- Mobile breakpoint introduces full-screen overlay menu with staggered link fade-in (120ms delay increments).
- Hero layout pairs left-aligned text block with right metric card; maintain 40/60 split on desktop, stacking on mobile with card preceding CTA buttons.

## Component Inventory

- Buttons: primary gradient, secondary outline, tertiary text link; states defined for hover, focus, disabled.
- Cards: base card, stat card, testimonial card, case study slider card; each includes padding, elevation token, and image handling.
- Badges: trust badge, quick facts pill, anonymity pill for reviews.
- Form elements: text inputs, textareas, select dropdown, toggle switch for anonymity, multi-step progress indicator.
- Overlays: modal for scheduling, timeline tooltip, mobile nav overlay.

## Accessibility Checklist

- Minimum color contrast 4.5:1 for text; CTAs tested at 3:1 for large text.
- Define focus outlines using `outline: 2px solid #FFD166` with offset for clarity.
- Provide skip-to-content link visible on focus at top of page.
- Ensure all interactive elements keyboard operable and labelled with ARIA where necessary.
- Respect `prefers-reduced-motion` by disabling non-essential animations and providing fade-only alternatives.

## Performance Budget

- Target initial page load under 2.5s on 4G (Lighthouse throttling) and <150KB critical CSS/JS.
- Optimise hero and testimonial images to AVIF/WebP with responsive `srcset` and lazy loading for below-the-fold media.
- Defer non-critical scripts (testimonials carousel, analytics) and load critical CSS inline for above-the-fold content.
- Implement `font-display: swap` for webfonts and host fonts locally where possible.
