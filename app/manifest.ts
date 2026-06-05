import { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo-constants';

/**
 * Next.js web app manifest — accessible at /manifest.json
 * Enables PWA install prompts and controls how the app appears on home screens.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.defaultDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: SITE.themeColor,
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['education', 'developer tools'],
    lang: 'en',
    dir: 'ltr',
    scope: '/',
  };
}
