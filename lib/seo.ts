'use client';
/**
 * seo.ts  –  lib/seo.ts
 *
 * CLIENT-ONLY: React hooks that inject SEO meta tags into <head> at runtime.
 * Import SITE / generateSitemap / generateRobotsTxt from lib/seo-constants.ts
 * in Server Components, layouts, and route handlers.
 *
 *   • useDocSEO()      – call inside DocsPage to inject meta tags for an article
 *   • usePracticeSEO() – call inside PracticePage
 *   • useMindmapSEO()  – call inside MindMapPage
 *   • useHomeSEO()     – call inside HomePage / LandingPage
 */

import { useEffect } from 'react';
import type { Article, PracticeArticle, ArticleMeta } from './content-types';
import type { MindmapData } from './content-types';
import { SITE } from './seo-constants';

// Re-export SITE so existing imports of SITE from 'lib/seo' keep working
// in Client Components. For Server Components use lib/seo-constants.ts directly.
export { SITE };
export { generateSitemap, generateRobotsTxt } from './seo-constants';

// ─── Low-level helpers ────────────────────────────────────────────────────────

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

function applySEO({
  title,
  description,
  canonical,
  ogType = 'article',
  ogImage = SITE.defaultOgImage,
  ogImageAlt,
  jsonLd,
  noIndex = false,
  keywords,
}: {
  title: string;
  description: string;
  canonical: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  ogImageAlt?: string;
  jsonLd?: object | null;
  noIndex?: boolean;
  keywords?: string;
}) {
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;

  document.title = fullTitle;
  setMeta('description', description);
  if (keywords) setMeta('keywords', keywords);
  setMeta('robots', noIndex ? 'noindex,nofollow' : 'index,follow');
  setMeta('theme-color', SITE.themeColor);
  setLink('canonical', canonical);
  setMeta('google-adsense-account', 'ca-pub-3562454050276075');

  setMeta('og:type', ogType, 'property');
  setMeta('og:site_name', SITE.name, 'property');
  setMeta('og:title', fullTitle, 'property');
  setMeta('og:description', description, 'property');
  setMeta('og:url', canonical, 'property');
  setMeta('og:image', ogImage, 'property');
  setMeta('og:image:width', '1200', 'property');
  setMeta('og:image:height', '630', 'property');
  if (ogImageAlt) setMeta('og:image:alt', ogImageAlt, 'property');

  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:site', SITE.twitterHandle);
  setMeta('twitter:title', fullTitle);
  setMeta('twitter:description', description);
  setMeta('twitter:image', ogImage);

  if (jsonLd) {
    setJsonLd('page-jsonld', jsonLd);
  } else {
    removeJsonLd('page-jsonld');
  }
}

// ─── Category → breadcrumb label ─────────────────────────────────────────────

const CATEGORY_BREADCRUMB: Record<string, string> = {
  'Low Level Design': 'LLD',
  'High Level Design': 'HLD',
  'Backend Design': 'Backend',
  'Web Security': 'Security',
  'Design': 'Design',
  SEO: 'SEO',
};

// ─── Public hooks ─────────────────────────────────────────────────────────────

export function useDocSEO(article: Article | null) {
  useEffect(() => {
    if (!article) return;

    const canonical = `${SITE.url}/docs/${article.slug}`;
    const catLabel = CATEGORY_BREADCRUMB[article.category] ?? article.category;
    const description =
      article.description ||
      `Learn ${article.title} — in-depth guide covering concepts, patterns, and real-world examples.`;
    const keywords = buildKeywords(article.title, article.category);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: article.title,
      description,
      url: canonical,
      image: SITE.defaultOgImage,
      author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
        logo: { '@type': 'ImageObject', url: SITE.logoUrl },
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          listItem(1, SITE.name, SITE.url),
          listItem(2, catLabel, `${SITE.url}/docs/${article.slug}`),
          listItem(3, article.title, canonical),
        ],
      },
    };

    applySEO({
      title: article.title,
      description,
      canonical,
      ogType: 'article',
      ogImageAlt: `${article.title} — ${SITE.name}`,
      keywords,
      jsonLd,
    });

    return () => applyHomeSEO();
  }, [article?.slug]);
}

export function usePracticeSEO(practice: PracticeArticle | null, slug: string) {
  useEffect(() => {
    if (!practice) return;

    const canonical = `${SITE.url}/practice/${slug}`;
    const description = `Practice quiz for "${practice.title}" — ${practice.totalQuestions} questions, ${practice.difficulty} difficulty. Test your knowledge and track your progress.`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      name: `${practice.title} — Practice Quiz`,
      description,
      url: canonical,
      educationalLevel: practice.difficulty,
      author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    };

    applySEO({
      title: `${practice.title} — Practice Quiz`,
      description,
      canonical,
      ogType: 'article',
      keywords: `${practice.title} quiz, system design practice, interview questions`,
      jsonLd,
    });

    return () => applyHomeSEO();
  }, [slug]);
}

export function useMindmapSEO(mindmap: MindmapData | null, slug: string) {
  useEffect(() => {
    if (!mindmap) return;

    const canonical = `${SITE.url}/mindmap/${slug}`;
    const description = `Interactive mind-map for "${mindmap.title}" — visualise key concepts, relationships, and patterns at a glance.`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: `${mindmap.title} — Mind Map`,
      description,
      url: canonical,
      author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    };

    applySEO({
      title: `${mindmap.title} — Mind Map`,
      description,
      canonical,
      ogType: 'article',
      keywords: `${mindmap.title} mind map, system design diagram, visual learning`,
      jsonLd,
    });

    return () => applyHomeSEO();
  }, [slug]);
}

export function useHomeSEO() {
  useEffect(() => {
    applyHomeSEO();
  }, []);
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function applyHomeSEO() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/docs/{search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };

  applySEO({
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.defaultDescription,
    canonical: SITE.url,
    ogType: 'website',
    keywords:
      'low level design, high level design, system design, backend architecture, web security, LLD, HLD, software engineering interview',
    jsonLd,
  });
}

function listItem(position: number, name: string, id: string) {
  return { '@type': 'ListItem', position, name, item: id };
}

function buildKeywords(title: string, category: string): string {
  const base = [title, category, 'system design', 'software engineering', 'interview prep'];
  if (category === 'Low Level Design')
    base.push('LLD', 'design patterns', 'object oriented design', 'SOLID principles');
  if (category === 'High Level Design')
    base.push('HLD', 'distributed systems', 'scalability', 'microservices', 'architecture');
  if (category === 'Backend Design')
    base.push('backend', 'API design', 'databases', 'REST', 'GraphQL');
  if (category === 'Web Security')
    base.push('CORS', 'XSS', 'CSRF', 'OAuth', 'JWT', 'web security', 'cybersecurity');
  if (category === 'SEO') base.push('search engine optimisation', 'technical SEO', 'on-page SEO');
  return base.join(', ');
}
