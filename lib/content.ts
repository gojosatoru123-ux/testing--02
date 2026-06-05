import 'server-only';
/**
 * content.ts  —  SERVER ONLY
 *
 * Uses Node.js `fs` to lazily read markdown files from disk.
 * Import this only in Server Components, generateStaticParams, or API routes.
 *
 * For Client Components that need manifest data (titles, slugs, categories),
 * import from lib/manifest.ts instead — it bundles the JSON at build time.
 */

import fs from 'fs';
import path from 'path';
import { mindmapSlugSet } from './mindmap';
import _manifest from '../content/_manifest.json';

// Re-export shared types so existing imports of these from 'lib/content' still work
export type { ArticleMeta, Article, PracticeQuestion, PracticeMeta, PracticeArticle } from './content-types';
import type { ArticleMeta, Article, PracticeArticle, PracticeQuestion } from './content-types';

// ─── In-memory cache — each file fetched at most once per session ─────────────

const cache: Record<string, string> = {};
const CONTENT_DIR = path.join(process.cwd(), 'content');

async function loadRawNext(subDir: string, slug: string): Promise<string | null> {
  try {
    const filePath = path.join(CONTENT_DIR, subDir, `${slug}.md`);
    if (cache[filePath] !== undefined) return cache[filePath];
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    cache[filePath] = raw;
    return raw;
  } catch (error) {
    console.error(`Error loading content file: ${slug}`, error);
    return null;
  }
}

// ─── Frontmatter parser ───────────────────────────────────────────────────────

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  match[1].split('\n').forEach((line) => {
    const i = line.indexOf(':');
    if (i === -1) return;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  });
  return { meta, body: match[2] };
}

// ─── Manifest ─────────────────────────────────────────────────────────────────

const manifestData = (_manifest as ArticleMeta[]).map((item) => ({
  ...item,
  hasMindmap: item.hasMindmap || mindmapSlugSet.has(item.slug),
}));

export function getManifest(): ArticleMeta[] {
  return manifestData;
}

export function getArticle(slug: string): ArticleMeta | null {
  return manifestData.find((m) => m.slug === slug) ?? null;
}

export function getCategories(manifest: ArticleMeta[]): Record<string, ArticleMeta[]> {
  return manifest.reduce<Record<string, ArticleMeta[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

export const MANIFEST       = getManifest();
export const CATEGORIES     = getCategories(MANIFEST);
export const CATEGORY_ORDER = [
  'Low Level Design',
  'High Level Design',
  'Networking',
  'Introduction',
  'Guides',
  'Reference',
  'Community',
];

// ─── Async article loaders ────────────────────────────────────────────────────

export async function getArticleAsync(slug: string): Promise<Article | null> {
  const raw = await loadRawNext('', slug);
  if (!raw) return null;
  const { meta, body } = parseFrontmatter(raw);
  const meta2 = manifestData.find((m) => m.slug === slug);
  return {
    slug,
    title:       meta2?.title       ?? meta.title       ?? slug,
    description: meta2?.description ?? meta.description ?? '',
    category:    meta2?.category    ?? meta.category    ?? 'General',
    order:       meta2?.order       ?? parseInt(meta.order || '99', 10),
    hasPractice: meta2?.hasPractice ?? false,
    hasMindmap:  meta2?.hasMindmap  ?? false,
    content: body.trim(),
  };
}

function parsePracticeQuestions(body: string): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  const blocks = body.split('<!-- QUESTION -->').slice(1);
  blocks.forEach((block, idx) => {
    const [questionPart, rest] = block.split('<!-- ANSWER -->');
    if (!questionPart || !rest) return;
    const [answerPart] = rest.split('<!-- END -->');
    if (!answerPart) return;
    const lines = questionPart.trim().split('\n');
    let difficulty: PracticeQuestion['difficulty'] = 'Medium';
    const tags: string[] = [];
    let questionStart = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('difficulty:')) {
        const d = line.replace('difficulty:', '').trim();
        if (d === 'Easy' || d === 'Medium' || d === 'Hard') difficulty = d;
        questionStart = i + 1;
      } else if (line.startsWith('tags:')) {
        tags.push(...line.replace('tags:', '').trim().split(',').map((t) => t.trim()));
        questionStart = i + 1;
      } else if (line !== '') {
        break;
      }
    }
    const questionText = lines.slice(questionStart).join('\n').trim();
    const answerText   = answerPart.trim();
    if (questionText) {
      questions.push({ id: idx + 1, difficulty, tags, question: questionText, answer: answerText });
    }
  });
  return questions;
}

export async function getPracticeArticle(slug: string): Promise<PracticeArticle | null> {
  const raw = await loadRawNext('practice', slug);
  if (!raw) return null;
  const { meta, body } = parseFrontmatter(raw);
  const questions = parsePracticeQuestions(body) ?? [];
  return {
    title:          meta.title         || `${slug} — Practice`,
    articleSlug:    meta.articleSlug   || slug,
    difficulty:     meta.difficulty    || 'Intermediate',
    estimatedTime:  meta.estimatedTime || '20 mins',
    totalQuestions: questions.length,
    questions,
  };
}

export async function getMindmapRaw(slug: string): Promise<string | null> {
  return loadRawNext('mindmap', slug);
}
