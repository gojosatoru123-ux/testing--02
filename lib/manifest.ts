/**
 * manifest.ts
 *
 * Client-safe manifest access. Imports _manifest.json directly (webpack/turbopack
 * bundles JSON at build time — no Node.js fs needed, safe in Client Components).
 *
 * For file-reading functions (getArticleAsync, getPracticeArticle, etc.)
 * use lib/content.ts inside Server Components or API routes only.
 */

import _manifest from '../content/_manifest.json';
import type { ArticleMeta } from './content-types';

const MANIFEST: ArticleMeta[] = _manifest as ArticleMeta[];

export { MANIFEST };

export function getCategories(manifest: ArticleMeta[]): Record<string, ArticleMeta[]> {
  return manifest.reduce<Record<string, ArticleMeta[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

export const CATEGORIES = getCategories(MANIFEST);

export const CATEGORY_ORDER = [
  'Low Level Design',
  'High Level Design',
  'Networking',
  'Introduction',
  'Guides',
  'Reference',
  'Community',
];
