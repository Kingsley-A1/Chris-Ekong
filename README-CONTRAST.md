Contrast audit helper

Run the contrast check locally:

1. Install Node (>=14). In PowerShell:
   npm install

2. Run the check:
   npm run contrast-check

What it does:

- Reads `STYLE.CSS` for the most important color tokens.
- Calculates WCAG contrast ratios for key combinations used on the site.

Notes:

- This is a simple local helper. For a full audit use tools like Lighthouse, axe, or the WCAG Contrast Checker browser extensions.
- If a token fails AA, tweak `STYLE.CSS` color tokens and re-run the check.
