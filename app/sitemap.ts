import { MetadataRoute } from 'next';
import { MANIFEST } from '@/lib/content';
import { SITE } from '@/lib/seo-constants';

/**
 * Next.js dynamic sitemap — auto-updates whenever _manifest.json changes.
 * Accessible at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url,              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE.url}/home`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE.url}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE.url}/terms`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = MANIFEST.flatMap((item) => {
    const routes: MetadataRoute.Sitemap = [
      {
        url: `${SITE.url}/docs/${item.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ];

    if (item.hasPractice) {
      routes.push({
        url: `${SITE.url}/practice/${item.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    if (item.hasMindmap) {
      routes.push({
        url: `${SITE.url}/mindmap/${item.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    return routes;
  });

  return [...staticRoutes, ...articleRoutes];
}
