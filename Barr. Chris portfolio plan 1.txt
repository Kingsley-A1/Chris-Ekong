# Lawyer portfolio website planning for a white, mature design



---

## Brand and visual system

- **Design intent:** A calm, authoritative white look with spacious layouts, restrained accents, and zero gimmicks.  
- **Color palette:**  
  - **Base:** White background (#FFFFFF).  
  - **Text:** Near-black (#0F172A) for body, cool gray for secondary (#475569).  
  - **Accents:** Navy (#1E3A8A) for primary CTA, subtle gold (#C9A042) for highlights.  
- **Typography:**  
  - **Headings:** A dignified serif (e.g., “Lora” or “Merriweather”).  
  - **Body:** A modern sans (e.g., “Inter” or “Source Sans 3”).  
  - **Hierarchy:** H1–H3 sparse and strong; body 16–18px; line-height 1.6+ for readability.  
- **Spacing:**  
  - **Scale:** 8px baseline; generous white space; max content width ~72ch.  
  - **Containers:** 1200px max-width, 24px side padding on mobile, 48–64px on desktop.  
- **Imagery:**  
  - **Portrait:** Real, professional photo; grayscale or low-saturation.  
  - **Backgrounds:** Soft, abstract geometry or courthouse texture at <5% opacity.

---

## Information architecture and pages

- **Primary navigation:** About, Practice areas, Case results, Testimonials, Insights, Contact.  
- **Homepage:**  
  - **Hero:** Name, title, one-line value proposition, portrait, primary CTA (Contact), secondary CTA (WhatsApp CV request).  
  - **Trust signals:** Bar admissions, years of experience, select logos/affiliations.  
  - **Practice summary grid:** 3–6 cards linking to detail.  
  - **Featured case results/testimonials:** 2–3 highlights with links.  
  - **Footer strip:** Contact links, WhatsApp CV request link, privacy note.  
- **About:**  
  - **Bio:** Short narrative, education, bar admissions, philosophy, approach.  
  - **Photo:** Clean portrait; optional timeline component.  
- **Practice areas:**  
  - **Grid layout:** Each area as a card with short overview, common scenarios, outcome expectations, CTA (Contact).  
  - **Detail pages (optional):** Specific FAQs and process outline.  
- **Case results:**  
  - **List:** Outcome-focused summaries with disclaimers; confidentiality respected.  
  - **Filters:** Area of law, year (optional).  
- **Testimonials:**  
  - **Quotes:** Verified, concise, initials if needed; no sensitive details.  
- **Insights (optional blog):**  
  - **Articles:** Explainers, guides; aids SEO and credibility.  
- **Contact:**  
  - **Direct links:** Phone (tel), Email (mailto), WhatsApp.  
  - **Form:** Name, email, message; light validation; consent checkbox.  
  - **Map:** Optional minimal embed; address and hours.

---

## Interaction details and CTAs

- **Primary CTA:** Contact (button, prominent in hero and header).  
- **Secondary CTA:** Request CV via WhatsApp.  
- **WhatsApp CV flow:**  
  - **Deep link format:**  
    - **Pattern:** https://wa.me/{phone}?text=Hello%20{lawyer%20name}%2C%20can%20I%20have%20your%20CV%3F  
  - **Behavior:** Opens WhatsApp chat with prefilled message.  
  - **Placement:** Header utility link, hero secondary button, footer.  
- **Microcopy:**  
  - **Form consent:** “By submitting, you agree to be contacted regarding your inquiry.”  
  - **Disclaimer:** “Past results do not guarantee future outcomes.”  
  - **Privacy note:** “No unsolicited sharing. We respond only to your inquiry.”

---

## Layout system using CSS Grid and Flexbox

- **Global wrapper:**  
  - **Container:** Max-width, centered; responsive gutters.  
- **Header:**  
  - **Top bar (Flex):** Logo left, navigation center/right, utility actions (WhatsApp CV, Contact).  
  - **Sticky on scroll:** Minimal shadow; reduces height for focus.  
- **Hero (Grid):**  
  - **Desktop:** Two-column grid (content left, portrait right).  
  - **Tablet:** Single column; portrait below content.  
  - **Mobile:** Single column; tightened spacing.  
- **Practice areas (Grid):**  
  - **Desktop:** 3–4 columns with equal-height cards.  
  - **Tablet:** 2 columns.  
  - **Mobile:** 1 column.  
- **Case results (Grid):**  
  - **Masonry-like rows:** Uniform cards; optional filters above (Flex).  
- **Testimonials (Flex/Carousel optional):**  
  - **Flex row with wrap:** Cards align center with consistent gutter.  
- **Insights list (Grid):**  
  - **2–3 columns:** Article cards with meta and read time.  
- **Contact (Grid + Flex):**  
  - **Two-column:** Form left (Grid for fields), details right (Flex stack).  
  - **Mobile:** Single column; sticky footer actions.  
- **Footer (Grid):**  
  - **Desktop:** 3–4 columns: About, Navigation, Contact, Legal.  
  - **Mobile:** Stacked sections with accordions if dense.

---

## Responsiveness, accessibility, and performance

- **Breakpoints:**  
  - **Mobile-first:** Base styles ≤480px.  
  - **Tablet:** ~768px.  
  - **Desktop:** ~1024–1280px.  
- **Accessibility:**  
  - **Contrast:** WCAG AA+ for text and buttons.  
  - **Semantics:** Landmarks (header, nav, main, footer), aria labels for controls.  
  - **Focus states:** Visible, keyboard navigable, reduced motion respected.  
- **Performance:**  
  - **Images:** Optimized, responsive srcset; lazy load below the fold.  
  - **CSS:** Single minified file; critical CSS inlined.  
  - **JS:** Minimal; defer non-critical; avoid heavy libraries.  
  - **Fonts:** Self-host or fast CDNs; font-display: swap.  
- **SEO:**  
  - **Meta:** Title, description per page; canonical tags.  
  - **Open Graph:** Title, description, image.  
  - **Schema:** Organization, LegalService, Person (lawyer), BreadcrumbList.  
  - **URLs:** Clean, descriptive slugs.

---

## Content model and components

- **Header:**  
  - **Elements:** Logo, nav links, utility buttons (Contact, WhatsApp CV).  
- **Hero:**  
  - **Fields:** Name, title, one-liner, portrait, primary and secondary CTAs.  
- **Practice card:**  
  - **Fields:** Title, short description, icon, link.  
- **Case result card:**  
  - **Fields:** Area, summary, outcome, year, disclaimer note.  
- **Testimonial card:**  
  - **Fields:** Quote, client initials/name, area of law (optional).  
- **Article card:**  
  - **Fields:** Title, excerpt, date, read time, link.  
- **Contact panel:**  
  - **Fields:** Phone (tel), email (mailto), WhatsApp deep link, office address.  
- **Form:**  
  - **Fields:** Name, email, message, consent checkbox; success/failure states.  
- **Footer:**  
  - **Sections:** About snippet, quick links, contact links, legal (privacy, terms).

---

## Technical details Copilot should implement

- **Stack:**  
  - **HTML5 + CSS (Grid/Flex) + minimal JS**; no frameworks required.  
- **Structure:**  
  - **Semantic tags:** Header, nav, main, section, article, aside, footer.  
  - **ARIA:** Descriptive labels on nav, buttons, form fields.  
- **CSS organization:**  
  - **Design tokens:** Colors, spacing, fonts, shadows.  
  - **Utilities:** Grid helpers (e.g., .grid-2, .grid-3), Flex stacks (.stack, .cluster).  
  - **Components:** Cards, buttons, inputs, nav, footer.  
- **Responsive utilities:**  
  - **Classes:** .container, .content, .grid, .col, .stack.  
  - **Media queries:** Mobile-first with min-width breakpoints.  
- **Links:**  
  - **Phone:** tel:+234XXXXXXXXXX  
  - **Email:** mailto:lawyer@example.com  
  - **WhatsApp CV:** https://wa.me/234XXXXXXXXXX?text=Hello%20Innocent%2C%20can%20I%20have%20your%20CV%3F  
- **Internationalization (optional):**  
  - **Copy:** Easily replaceable strings; avoid hard-coded names.  
- **Deployment notes:**  
  - **Static hosting:** GitHub Pages or similar; add sitemap.xml and robots.txt.  
  - **Analytics:** Lightweight (e.g., Plausible/GA), anonymized IP.  
  - **Favicons:** Generated set; dark/light modes supported if added later.

---

## Copy guidance and voice

- **Tone:** Calm, direct, respectful; human rather than corporate.  
- **Headlines:** Short, declarative; e.g., “Dedicated to Justice. Committed to You.”  
- **Body:** Plain language; explain processes and expectations clearly.  
- **Compliance:** Avoid promises; use disclaimers where needed; protect confidentiality.

---

## Success criteria

- **Trust:** Real photo, clear credentials, testimonials, case outcomes with disclaimers.  
- **Clarity:** Minimal pages, scannable sections, obvious CTAs.  
- **Usability:** Fast load, AA contrast, keyboard-friendly, mobile-first.  
- **Maintainability:** Clean CSS architecture, semantic HTML, minimal JS.  
- **Conversion:** Prominent Contact and WhatsApp CV links, easy navigation.

---
