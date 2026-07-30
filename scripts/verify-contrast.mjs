// Measures REAL rendered contrast for text that the 3D backdrop drifts behind.
//
// axe/Lighthouse cannot do this: they read CSS colours from the DOM and have no
// idea a WebGL canvas is compositing crystals underneath. So instead we hide the
// text, screenshot the exact pixels behind it (crystals included), average that
// background, and compute the real contrast ratio against the text colour.
//
// Usage: npm run build && npm start, then: node scripts/verify-contrast.mjs
import { chromium } from "playwright";
import sharp from "sharp";

const URL = "http://localhost:3000";

function relLum([r, g, b]) {
  const f = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(a, b) {
  const [hi, lo] = relLum(a) > relLum(b) ? [relLum(a), relLum(b)] : [relLum(b), relLum(a)];
  return (hi + 0.05) / (lo + 0.05);
}

// Text we care about. The paint colour is read from the live DOM rather than
// hardcoded — hardcoding it silently reports stale results after a palette change.
const TARGETS = [
  ["#about p.text-lg", "About body copy"],
  ["#about dt", "About stat value"],
  ["#about dd", "About stat label"],
  ["#skills h2", "Skills heading"],
  ["#skills .eyebrow", "Skills eyebrow"],
  ["#experience h2", "Experience heading"],
  ["#experience h3", "Experience role"],
  ["#projects h2", "Projects heading"],
  ["#projects article p", "Project summary"],
  ["#education h3", "Education column head"],
  ["#contact h2", "Contact heading"],
  ["#contact p", "Contact body copy"],
];

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForSelector("text=Jascar Benish P", { timeout: 15000 });
await page.waitForTimeout(1500);

console.log("target".padEnd(26), "ratio".padStart(7), "  AA(4.5)  worst-bg");
let failures = 0;

for (const [sel, label] of TARGETS) {
  await page.evaluate((s) => {
    document.querySelector(s)?.scrollIntoView({ block: "center" });
  }, sel);
  await page.waitForTimeout(700);

  const probe = await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return null;
    const m = getComputedStyle(el).color.match(/\d+/g);
    return {
      colour: m ? [+m[0], +m[1], +m[2]] : [0, 0, 0],
      rect: {
        x: Math.max(0, r.x),
        y: Math.max(0, r.y),
        width: Math.min(r.width, 1400),
        height: Math.min(r.height, 400),
      },
    };
  }, sel);
  if (!probe) {
    console.log(label.padEnd(26), "   n/a   (element not found)");
    continue;
  }
  const { colour, rect } = probe;

  // Hide just this text so the screenshot captures only what is behind it.
  await page.evaluate((s) => {
    document.querySelector(s).style.visibility = "hidden";
  }, sel);
  await page.waitForTimeout(250);
  const buf = await page.screenshot({ clip: rect });
  await page.evaluate((s) => {
    document.querySelector(s).style.visibility = "";
  }, sel);

  // Darkest region of the background is the worst case for dark text.
  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  let worst = null;
  let worstLum = Infinity;
  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch * 7) {
    const px = [data[i], data[i + 1], data[i + 2]];
    const l = relLum(px);
    if (l < worstLum) {
      worstLum = l;
      worst = px;
    }
  }

  const ratio = contrast(colour, worst);
  const pass = ratio >= 4.5;
  if (!pass) failures++;
  console.log(
    label.padEnd(26),
    ratio.toFixed(2).padStart(7),
    (pass ? "   PASS  " : "   FAIL  ").padEnd(10),
    `rgb(${worst.join(",")})`
  );
}

console.log(`\n${failures === 0 ? "All targets meet AA (4.5:1)." : failures + " target(s) BELOW AA."}`);
await browser.close();
process.exit(failures === 0 ? 0 : 1);
