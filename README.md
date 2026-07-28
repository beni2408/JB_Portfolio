# Jascar Benish P — Portfolio

A production 3D portfolio for a MERN-stack developer who is also a trained
composer and audio engineer. The signature hero element is a faceted "resonant
core" gem — royal-indigo glass, a champagne rim ring, orbiting a slow pulse —
built from raw Three.js geometry, expressing the code + music duality the
rest of the site is organized around.

## Stack — and why

**Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + React Three Fiber.**

This was the primary recommendation in the brief, chosen over the SvelteKit +
Threlte alternative because the R3F/Three.js ecosystem is the most reliable
path to a polished WebGL hero, and Next.js rounds out a project list that's
already SvelteKit-heavy — it demonstrates range rather than duplicating what
the flagship projects already show.

- `next@15`, React 19, TypeScript strict mode, App Router
- Tailwind CSS v4 (CSS-based `@theme` tokens in `app/globals.css` — no
  `tailwind.config.js`)
- `three` + `@react-three/fiber` for the hero centerpiece — **no
  `@react-three/drei`**: it was in the initial dependency set but got pulled
  once profiling showed it was responsible for ~800ms of blocking main-thread
  JS on load (see [Performance](#performance) below). The scene only ever
  needed two primitive geometries and `useThree`, so it was rewritten with
  raw `<icosahedronGeometry>` / `<torusGeometry>` JSX instead.
- `framer-motion` for the orchestrated hero reveal and scroll-triggered
  section reveals (`components/ui/Reveal.tsx`)
- `lenis` for smooth scroll, disabled under `prefers-reduced-motion`
- `lucide-react` for icons (its GitHub mark was dropped from the library in
  this version, so `components/ui/icons.tsx` ships a small inline SVG
  replacement)
- Fonts via `next/font`: **Fraunces** (display serif), **Geist** (body),
  **Geist Mono** (tags, dates, receipt-style details) — all self-hosted, zero
  layout shift

No backend, database, or CMS — this is a static/SSG marketing site. All copy
lives in typed data files under `/data`.

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run start     # serve the production build
npm run lint      # eslint
```

Requires Node 18.18+ or 20+ (Next.js 15 requirement).

## Editing content

Every section reads from typed data files — no copy is hardcoded in
components:

| File | Section(s) |
|---|---|
| `data/profile.ts` | Name, role line, About paragraphs, contact links, stat strip |
| `data/skills.ts` | Skills grid, grouped by category |
| `data/experience.ts` | Experience timeline |
| `data/projects.ts` | Featured projects — set `flagship: true` for the large editorial treatment, `false` for the card grid |
| `data/education.ts` | Education + certifications |

Edit these files and the site updates everywhere that content is used.

## Swapping the résumé PDF

`public/resume.pdf` is a **placeholder**, generated from the same ground-truth
content as `/data` via `scripts/generate-resume.mjs` (plain text on a royal
background, built with `pdf-lib`). The Nav, Hero, and mobile menu all link to
`/resume.pdf`, so replacing that file with a professionally designed export
is a drop-in swap — no code changes needed.

To regenerate the placeholder after editing `scripts/generate-resume.mjs`:

```bash
npm run generate:resume
```

## The 3D signature — "Resonant core"

`components/three/`:

- `Centerpiece.tsx` — the gem: an icosahedron (`meshPhysicalMaterial` with
  transmission, for the glass look) plus a small emissive-colored inner core
  that stays visible regardless of lighting, two thin orbiting rings, and a
  cursor-parallax tilt clamped to ±8°. Position is computed from
  `useThree().viewport` so it sits in the right column at any viewport width
  and never overlaps the hero text.
- `HeroScene.tsx` — the `<Canvas>`: `dpr={[1, 1.5]}`, `frameloop` toggles
  between `"always"` and `"never"` via an `IntersectionObserver` so the
  render loop pauses the instant the hero scrolls offscreen.
- `HeroCanvasGate.tsx` — decides whether to render the Canvas at all: skips
  it under `prefers-reduced-motion`, on viewports under 768px, and on devices
  reporting `navigator.hardwareConcurrency <= 4`.
- `fallback.tsx` — the static fallback: a CSS radial-gradient orb, shown
  while the Canvas chunk is loading (`next/dynamic(..., { ssr: false })`) and
  permanently on any device that fails the gate above.

## Performance

Audited with Lighthouse against a local production build (`npm run build &&
npm run start`) on 2026-07-28:

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | **99** | **100** | **100** | **100** |
| Mobile (simulated throttling) | **91** | **100** | **100** | **100** |

Desktop CLS 0, LCP 1.0s, TBT 0ms. Mobile CLS 0, LCP 3.3s, TBT 100ms.

The one real regression during the audit: an early version used
`@react-three/drei`'s `<Environment>` HDR loader plus
`@react-three/postprocessing` (Bloom + Vignette) for the gem's glow. Both
were measurable performance cliffs (bootup-time score of 0, ~1.3s of total
blocking time) for a visual improvement that a simple emissive inner-core
mesh mostly replicated. Both were removed; the numbers above are with them
gone.

## Accessibility

- Skip-to-content link, one `<h1>`, logical heading order, semantic
  `<nav>`/`<section aria-label>` throughout
- Visible champagne focus ring on every interactive element
  (`:focus-visible` in `globals.css`)
- The hero `<canvas>` is `aria-hidden` with a `sr-only` text description
  alongside it — no information lives only in the 3D scene
- `prefers-reduced-motion` disables the Lenis smooth scroll, the hero's
  orchestrated intro animation, all scroll-reveals, and the 3D canvas itself
  (falls back to the static gradient)
- Verified with `@axe-core/playwright` against the rendered homepage: 0
  violations

## SEO

- `app/opengraph-image.tsx` — OG/Twitter card generated at build time via
  `next/og` (no static image asset to keep in sync)
- `app/icon.svg` — JB monogram favicon
- `app/robots.ts` / `app/sitemap.ts` — Next's typed metadata routes
- JSON-LD `Person` schema in `app/layout.tsx` (name, jobTitle, sameAs,
  knowsAbout pulled from `data/skills.ts`)

## Deployment

Deploy-ready for Vercel as-is (`vercel deploy` or connect the repo). Update
`siteUrl` in `app/layout.tsx`, `app/robots.ts`, and `app/sitemap.ts` to the
real production domain before deploying.

## A note on `npm audit`

`npm audit` reports 12 high-severity advisories, all inherited transitively
through Next.js 15.5's own pinned tooling (the `eslint` config chain,
`postcss`, `sharp`) — nothing in application code. `npm audit fix --force`
"fixes" these by downgrading `next` to a 9.x release, which is not a real
fix. Left alone pending upstream patches.
