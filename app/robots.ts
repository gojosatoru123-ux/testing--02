import { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo-constants';

/**
 * Next.js robots.txt — accessible at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
