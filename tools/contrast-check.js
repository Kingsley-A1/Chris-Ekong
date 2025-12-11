// Small Node script to read key color tokens from STYLE.CSS and check WCAG contrast ratios.
// Usage: node tools/contrast-check.js

const fs = require("fs");
const path = require("path");

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function luminance(r, g, b) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrast(hex1, hex2) {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const L1 = luminance(r1, g1, b1);
  const L2 = luminance(r2, g2, b2);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function readTokens(cssPath) {
  const raw = fs.readFileSync(cssPath, "utf8");
  const rootMatch = raw.match(/:root\s*\{([\s\S]*?)\}/);
  if (!rootMatch) throw new Error("No :root found in STYLE.CSS");
  const body = rootMatch[1];
  const toks = {};
  const re = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let m;
  while ((m = re.exec(body))) {
    toks[m[1].trim()] = m[2].trim();
  }
  return toks;
}

(function main() {
  const cssPath = path.join(__dirname, "..", "STYLE.CSS");
  if (!fs.existsSync(cssPath)) {
    console.error("STYLE.CSS not found at", cssPath);
    process.exit(2);
  }

  const toks = readTokens(cssPath);
  // Colors to check
  const checks = [
    { name: "Primary on white", fg: toks["color-primary"], bg: "#ffffff" },
    { name: "Accent on white", fg: toks["color-accent"], bg: "#ffffff" },
    {
      name: "Primary contrast on primary (hero text)",
      fg: toks["color-primary-contrast"],
      bg: toks["color-primary"],
    },
    {
      name: "Hero button accent on navy",
      fg: "#101010",
      bg: toks["color-accent"],
    },
  ];

  console.log("Running contrast checks (WCAG ratios)");
  checks.forEach((c) => {
    const fg = c.fg.replace(/\s*!important|\s*/g, "");
    const bg = c.bg.replace(/\s*/g, "");
    try {
      const ratio = contrast(fg, bg);
      const passAA = ratio >= 4.5;
      const passLarge = ratio >= 3.0;
      console.log(
        `${c.name}: ${ratio.toFixed(2)} — AA:${
          passAA ? "PASS" : "FAIL"
        } (large:${passLarge ? "PASS" : "FAIL"})`
      );
    } catch (err) {
      console.warn(`Couldn't calculate contrast for ${c.name}:`, err.message);
    }
  });
})();
