import { Metadata } from 'next';
import { getArticleAsync, MANIFEST } from '@/lib/content';
import { SITE } from '@/lib/seo-constants';
import { DocsClient } from './DocsClient';

// ─── Static paths ──────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return MANIFEST.map((a) => ({ slug: a.slug }));
}

// ─── Server-side metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleAsync(slug);
  if (!article) return { title: 'Not Found' };

  const description =
    article.description ||
    `Learn ${article.title} — in-depth guide covering concepts, patterns, and real-world examples.`;
  const canonical = `${SITE.url}/docs/${slug}`;

  return {
    title: article.title,
    description,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description,
      url: canonical,
      type: 'article',
      images: [{ url: SITE.defaultOgImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
    },
  };
}

// ─── Page (server component — fetches data, passes to client shell) ────────────
export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleAsync(slug);

  const idx = MANIFEST.findIndex((a) => a.slug === slug);
  const prev = idx > 0 ? MANIFEST[idx - 1] : null;
  const next = idx < MANIFEST.length - 1 ? MANIFEST[idx + 1] : null;

  return <DocsClient article={article} slug={slug} prev={prev} next={next} />;
}
