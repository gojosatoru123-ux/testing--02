import { Metadata } from 'next';
import { MANIFEST, getArticle } from '@/lib/content';
import { getMindmapData } from '@/lib/mindmap';
import { SITE } from '@/lib/seo-constants';
import { MindMapClient } from './MindMapClient';

// ─── Static paths ──────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return MANIFEST.filter((a) => a.hasMindmap).map((a) => ({ slug: a.slug }));
}

// ─── Server-side metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Mind Map Not Found' };

  const title = `${article.title} — Mind Map`;
  const description = `Interactive mind-map for "${article.title}" — visualise key concepts, relationships, and patterns at a glance.`;
  const canonical = `${SITE.url}/mindmap/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'article', images: [{ url: SITE.defaultOgImage, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description },
  };
}

// ─── Page (server component) ──────────────────────────────────────────────────
export default async function MindMapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [mindmapData, article] = await Promise.all([
    getMindmapData(slug),
    Promise.resolve(getArticle(slug)),
  ]);

  return <MindMapClient mindmapData={mindmapData} article={article} slug={slug} />;
}
