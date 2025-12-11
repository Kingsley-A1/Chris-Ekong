# Step-by-step prompts for Copilot to build a multi-page lawyer portfolio

Use these prompts one-by-one. Paste each into Copilot, wait for code, review, then proceed to the next. The site must be multi-page: Home, About, Case Studies, Contact. All styling should strictly use CSS tokens.

---

## Project setup and scaffolding

- **Create structure:** Generate a multipage project with files: index.html (Home), about.html, cases.html, contact.html, styles.css, scripts.js, /assets (images, icons), /favicon.
- **Global meta:** Add language to html, viewport meta, charset, canonical links, Open Graph placeholders per page.
- **Link assets:** Reference styles.css and scripts.js in all pages.
- **Semantics:** Use header, nav, main, section, article, aside, footer landmarks consistently.
- **Routing:** Ensure header nav links correctly point to each page.

> Deliverables: Four HTML pages with linked CSS/JS, consistent head metadata, and working navigation.

---

## Global CSS tokens and utilities

- **Implement tokens:** Add a :root token system in styles.css for colors, gradients, typography, spacing, layout, shadows, transitions, and breakpoints. Use the previously defined variables; do not introduce ad-hoc values.
- **Reset and base:** Apply box-sizing reset, body base styles, and scroll-behavior: smooth.
- **Containers:** Create .container with max-width and responsive gutters.
- **Helpers:** Add .grid-2/.grid-3/.grid-4, .grid, .stack, .cluster utilities using CSS Grid and Flexbox.
- **Components:** Define .button variants (primary, outline, gold), .card, .section/.section-alt, .header/.header-inner, .hero, .footer.

> Deliverables: styles.css with tokens and utilities; all pages reference these classes exclusively.

---

## Shared header, nav, and footer

- **Header (sticky):** Build a sticky header using Flex (.header-inner). Left: logo + text “Innocent [Surname], Attorney-at-Law”. Right: nav links (Home, About, Case Studies, Contact) + utility buttons.
- **WhatsApp CV:** Add a “Request CV on WhatsApp” button using the deep link:
  ```
  https://wa.me/234XXXXXXXXXX?text=Hello%20Innocent%2C%20can%20I%20have%20your%20CV%3F
  ```
- **Accessibility:** aria-label on nav, indicate current page with aria-current=”page”, visible focus states.
- **Footer (grid):** 3–4 columns: About snippet, Quick links, Contact details (tel:, mailto:, WhatsApp CV), Legal (privacy, disclaimer). Include the disclaimer: “Past results do not guarantee future outcomes.”

> Deliverables: Header and footer implemented identically across all pages; active link states per page.

---

## Home page layout and content

- **Hero (Grid):** Two-column grid on desktop, single column on mobile. Left: H1 headline (e.g., “Dedicated to Justice. Committed to You.”), lead paragraph, two buttons (Contact primary, Request CV outline). Right: lawyer portrait in a tasteful card frame.
- **Background:** Apply --gradient-primary to .hero; ensure text contrast meets WCAG AA.
- **Trust strip:** Add a .cluster row of grayscale affiliation/bar logos with alt text.
- **Practice areas (Grid):** H2 “Practice areas”. Use .grid-3 of .card items: icon (justice symbol), title, short description, “Learn more” link to About or individual sections.
- **Featured case results (Grid):** H2 “Case results”. Add disclaimer text below heading. Use .grid-3 of .card summaries: area, short description, outcome, year, “View details” link to Case Studies page.
- **Testimonials:** H2 “Testimonials”. Use .cluster of .card quotes with initials/name and brief testimonial.
- **CTA footer strip:** Compact section with Contact and WhatsApp CV buttons.

> Deliverables: Complete index.html with hero, trust strip, practice areas, case highlights, testimonials, and clear CTAs.

---

## About page layout and content

- **Intro section:** H1 “About Innocent [Surname]”. Lead paragraph with professional summary.
- **Bio (Grid):** Two-column layout: Left = narrative bio (education, bar admissions, years of practice, philosophy). Right = portrait, key credentials list, affiliations.
- **Timeline:** Add a vertical timeline component for career milestones using Flex/stack; keep minimal and readable.
- **Values:** Section with H2 “Approach & values” and 3–4 .card items (Integrity, Advocacy, Client focus, Clarity).

> Deliverables: about.html with structured bio, credentials, timeline, and values section.

---

## Case studies page layout and content

- **Intro and filters:** H1 “Case studies”. Add a Flex row of filter pills (All, Criminal, Family, Corporate) for visual filtering (non-functional JS optional).
- **Grid of cases:** Use .grid-3 with equal-height .card items. Each card: area of law (label), case title, 2–3 line summary, outcome, year, and “Read more” link (to a modal or an anchor detail section).
- **Disclaimer:** Persistent disclaimer at top or bottom: “Past results do not guarantee future outcomes.”
- **Optional details:** Add expandable details (details/summary) inside cards to show process and legal considerations without revealing confidential info.

> Deliverables: cases.html with filter UI and a clean grid of case summaries, all tokens-driven.

---

## Contact page layout and content

- **Two-column grid:** Left column = contact form; Right column = contact panel.
- **Form:** Fields: Name (required), Email (required, type=email), Message (required, textarea), Consent checkbox (“By submitting, you agree to be contacted regarding your inquiry.”). Add basic HTML validation and success/failure messages (no frameworks).
- **Panel:** Contact methods: tel:+234XXXXXXXXXX, mailto:lawyer@example.com, WhatsApp CV deep link, office address, hours. Optional embedded map (lightweight).
- **Accessibility:** Associate labels and inputs, include aria-live for form status, maintain visible focus states.

> Deliverables: contact.html with working form UI (client-side validation), direct links, and clear privacy note.

---

## Responsiveness and accessibility pass

- **Mobile-first:** Ensure base styles target mobile first; enhance at 768px and 1024px via min-width queries.
- **Grid responsive:** Practice areas, case studies, insights/blog (if present) adapt 1 → 2 → 3 columns per breakpoints using .grid-2/.grid-3.
- **Header behavior:** Sticky header reduces padding on scroll (optional), maintains readable touch targets.
- **Accessibility:** Semantic landmarks, alt text for all images, aria-current on active nav item, keyboard navigability, :focus-visible styles, respects prefers-reduced-motion.

> Deliverables: Verified layouts on mobile, tablet, desktop; keyboard-only navigation works; contrast meets WCAG AA.

---

## Assets, imagery, and UI polish

- **Logos:** Place firm logo in header; justice icon near headings of Practice Areas and Case Results (SVG, accessible).
- **Portraits:** Use desaturated lawyer portrait in hero and About; size responsively; lazy-load non-hero images.
- **Affiliations:** Grayscale logos in trust strip; maintain consistent height and spacing.
- **Icons:** Prefer inline SVG; ensure sufficient contrast and descriptive aria-labels if interactive.
- **Microcopy:** Review CTAs and disclaimers; avoid promises; keep copy professional and human.

> Deliverables: /assets populated with SVG logos/icons and optimized images; alt text and filenames are descriptive.

---

## SEO and performance essentials

- **Per-page meta:** Unique title and meta description for each page; canonical links; Open Graph image/title/description.
- **Schema:** Add JSON-LD for Organization, LegalService, and Person (lawyer) where relevant.
- **Fonts:** Use font-display: swap; limit weights; self-host or reliable CDN.
- **Images:** Use responsive sizes and lazy-loading; compress assets; avoid render-blocking.
- **JS:** Defer non-critical scripts; keep bundle minimal.

> Deliverables: Valid meta tags on all pages, JSON-LD schema added, Lighthouse-friendly performance setup.

--