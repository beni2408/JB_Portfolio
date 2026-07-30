// Measures every parallax layer and reports its travel.
// Each layer is sampled at two scroll positions INSIDE its own section's
// scroll window, otherwise the value is saturated at an end of its range and
// falsely reads as "not moving".
//
// Usage:
//   npm i -D playwright && npx playwright install chromium   (one-time)
//   npm run build && npm start                               (in another shell)
//   node scripts/verify-parallax.mjs
//
// Expected: every layer shows non-zero travel under NORMAL MOTION, and
// exactly 0 travel under prefers-reduced-motion.
import { chromium } from "playwright";

const URL = "http://localhost:3000";

function ty(t) {
  if (!t || t === "none") return 0;
  const m = t.match(/matrix\(([^)]+)\)/);
  return m ? Math.round(parseFloat(m[1].split(",")[5])) : 0;
}
function sy(t) {
  if (!t || t === "none") return 1;
  const m = t.match(/matrix\(([^)]+)\)/);
  return m ? +parseFloat(m[1].split(",")[3]).toFixed(3) : 1;
}

// section id -> { label -> selector-expression returning an element }
const LAYERS = {
  about: {
    "backdrop orb — near layer": `document.querySelectorAll('#about div[aria-hidden] div')[0]`,
    "backdrop orb — far layer": `document.querySelectorAll('#about div[aria-hidden] div')[1]`,
    "portrait": `document.querySelector('#about img').closest('div').parentElement`,
  },
  skills: {
    "backdrop orb — near layer": `document.querySelectorAll('#skills div[aria-hidden] div')[0]`,
    "3D shard": `[...document.querySelectorAll('#skills .pointer-events-none.absolute')].find(el => el.querySelector('canvas')).firstElementChild`,
  },
  experience: {
    "backdrop orb — near layer": `document.querySelectorAll('#experience div[aria-hidden] div')[0]`,
    "3D shard": `[...document.querySelectorAll('#experience .pointer-events-none.absolute')].find(el => el.querySelector('canvas')).firstElementChild`,
  },
  projects: {
    "backdrop orb — near layer": `document.querySelectorAll('#projects div[aria-hidden] div')[0]`,
    "3D shard": `[...document.querySelectorAll('#projects .pointer-events-none.absolute')].find(el => el.querySelector('canvas')).firstElementChild`,
    "flagship stack column": `document.querySelector('#projects article > div:last-child > div')`,
  },
  education: {
    "backdrop orb — near layer": `document.querySelectorAll('#education div[aria-hidden] div')[0]`,
    "3D shard": `[...document.querySelectorAll('#education .pointer-events-none.absolute')].find(el => el.querySelector('canvas')).firstElementChild`,
  },
  contact: {
    "backdrop orb — near layer": `document.querySelectorAll('#contact div[aria-hidden] div')[0]`,
    "3D shard": `[...document.querySelectorAll('#contact .pointer-events-none.absolute')].find(el => el.querySelector('canvas')).firstElementChild`,
  },
};

async function readLayers(page, sectionId, offset) {
  await page.evaluate(
    ([id, off]) => {
      const el = document.getElementById(id);
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + off);
    },
    [sectionId, offset]
  );
  await page.waitForTimeout(650);
  return page.evaluate((sels) => {
    const out = {};
    for (const [label, expr] of Object.entries(sels)) {
      try {
        out[label] = getComputedStyle(eval(expr)).transform;
      } catch {
        out[label] = "MISSING";
      }
    }
    return out;
  }, LAYERS[sectionId]);
}

const browser = await chromium.launch({ args: ["--no-sandbox"] });

for (const reduced of [false, true]) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 25000 });
  await page.waitForSelector("text=Jascar Benish P", { timeout: 15000 });
  await page.waitForTimeout(900);

  console.log(`\n${"=".repeat(72)}`);
  console.log(reduced ? "prefers-reduced-motion: REDUCE  (all travel must be 0)" : "NORMAL MOTION");
  console.log("=".repeat(72));
  console.log("section".padEnd(12), "layer".padEnd(28), "early".padStart(7), "late".padStart(7), "travel".padStart(8));

  for (const sectionId of Object.keys(LAYERS)) {
    // -700 = section entering viewport, +500 = section well past centre
    const early = await readLayers(page, sectionId, -700);
    const late = await readLayers(page, sectionId, 500);
    for (const label of Object.keys(LAYERS[sectionId])) {
      const a = ty(early[label]);
      const b = ty(late[label]);
      console.log(
        sectionId.padEnd(12),
        label.padEnd(28),
        String(a).padStart(7),
        String(b).padStart(7),
        String(b - a).padStart(8)
      );
    }
  }

  // Timeline spine draws via scaleY rather than translate
  const spineSel = `document.querySelector('#experience ol span > span:nth-child(2)')`;
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
  const s0 = sy(await page.evaluate((s) => getComputedStyle(eval(s)).transform, spineSel));
  await page.evaluate(() => {
    const e = document.getElementById("experience");
    window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY + 700);
  });
  await page.waitForTimeout(900);
  const s1 = sy(await page.evaluate((s) => getComputedStyle(eval(s)).transform, spineSel));
  console.log(
    "experience".padEnd(12),
    "timeline spine (scaleY draw)".padEnd(28),
    String(s0).padStart(7),
    String(s1).padStart(7),
    String(+(s1 - s0).toFixed(3)).padStart(8)
  );

  await ctx.close();
}

await browser.close();
