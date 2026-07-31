/** Canonical origin for metadata, sitemap, robots and OG tags.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — set this once you have a final custom domain.
 *   2. URL — injected by Netlify at build time (the site's production URL),
 *      so deploys are correct before a custom domain exists.
 *   3. localhost — local development.
 *
 * Read at build time only (metadata/sitemap/robots), so no client exposure is
 * required for it to work.
 */
const raw =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  "http://localhost:3000";

export const siteUrl = raw.replace(/\/+$/, "");
