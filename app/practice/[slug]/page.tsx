import { Metadata } from 'next';
import { getPracticeArticle, getArticle, MANIFEST } from '@/lib/content';
import { SITE } from '@/lib/seo-constants';
import { PracticeClient } from './PracticeClient';

// ─── Static paths ──────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return MANIFEST.filter((a) => a.hasPractice).map((a) => ({ slug: a.slug }));
}

// ─── Server-side metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [practice, article] = await Promise.all([
    getPracticeArticle(slug),
    Promise.resolve(getArticle(slug)),
  ]);

  const title = practice ? `${practice.title} — Practice Quiz` : (article ? `${article.title} — Practice Quiz` : 'Practice Quiz');
  const description = practice
    ? `Practice quiz for "${practice.title}" — ${practice.totalQuestions} questions, ${practice.difficulty} difficulty. Test your knowledge and track your progress.`
    : `Practice your knowledge on ${slug}.`;
  const canonical = `${SITE.url}/practice/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'article', images: [{ url: SITE.defaultOgImage, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description },
  };
}

// ─── Page (server component) ──────────────────────────────────────────────────
export default async function PracticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [practice, article] = await Promise.all([
    getPracticeArticle(slug),
    Promise.resolve(getArticle(slug)),
  ]);

  return <PracticeClient practice={practice} article={article} slug={slug} />;
}
