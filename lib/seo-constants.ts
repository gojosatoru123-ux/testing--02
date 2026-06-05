/**
 * seo-constants.ts — server-safe SEO exports
 *
 * Import SITE (and generateSitemap / generateRobotsTxt) from here inside
 * Server Components, layouts, and route handlers.
 *
 * The React hooks (useDocSEO, usePracticeSEO, …) live in lib/seo.ts which
 * is marked "use client" — do NOT import that file into a Server Component.
 */

import { ArticleMeta } from './content-types';

// ─── Site-wide constants ──────────────────────────────────────────────────────

export const SITE = {
  name: 'CacheU',
  tagline: 'Master System Design — LLD, HLD, Backend & Web Security',
  url: 'https://cacheu.dev',
  logoUrl: 'https://cacheu.dev/cacheu_logo.webp',
  twitterHandle: '@cacheu_dev',
  defaultDescription:
    'CacheU is the fastest way to learn Low-Level Design, High-Level Design, Backend Architecture, and Web Security — with interactive mind-maps and practice quizzes.',
  defaultOgImage: 'https://cacheu.dev/og-image.webp',
  themeColor: '#7c3aed',
} as const;

// ─── Sitemap generator ────────────────────────────────────────────────────────

export function generateSitemap(manifest: ArticleMeta[]): string {
  const now = new Date().toISOString().slice(0, 10);

  const staticUrls = [
    { loc: SITE.url, priority: '1.0', changefreq: 'weekly' },
    { loc: `${SITE.url}/home`, priority: '0.9', changefreq: 'weekly' },
  ];

  const articleUrls = manifest.flatMap((item) => {
    const urls = [
      { loc: `${SITE.url}/docs/${item.slug}`, priority: '0.8', changefreq: 'monthly' },
    ];
    if (item.hasPractice)
      urls.push({ loc: `${SITE.url}/practice/${item.slug}`, priority: '0.7', changefreq: 'monthly' });
    if (item.hasMindmap)
      urls.push({ loc: `${SITE.url}/mindmap/${item.slug}`, priority: '0.7', changefreq: 'monthly' });
    return urls;
  });

  const allUrls = [...staticUrls, ...articleUrls];

  const urlEntries = allUrls
    .map(
      ({ loc, priority, changefreq }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// ─── robots.txt helper ────────────────────────────────────────────────────────

export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`;
}
