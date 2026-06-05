import 'server-only';
/**
 * mindmap.ts  —  SERVER ONLY
 *
 * Uses Node.js `fs` to read mindmap markdown files from disk.
 * Import this only in Server Components or API routes.
 */

import fs from 'fs';
import path from 'path';

// Re-export types so existing imports from 'lib/mindmap' still work
export type { MindNode, MindmapData } from './content-types';
import type { MindNode, MindmapData } from './content-types';

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

let _idCounter = 0;
function uid(prefix: string) {
  return `${prefix}-${++_idCounter}`;
}

export function parseMindmap(raw: string): MindmapData | null {
  _idCounter = 0;
  const { meta, body } = parseFrontmatter(raw);
  if (!meta.title) return null;

  const lines = body.split('\n').filter((l) => l.trim());
  const stack: Array<{ node: MindNode; headingDepth: number }> = [];
  let root: MindNode | null = null;

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const hDepth = headingMatch[1].length - 1;
      const text = headingMatch[2].trim();
      const node: MindNode = {
        id: uid(text.toLowerCase().replace(/\W+/g, '-').slice(0, 20)),
        text,
        depth: hDepth,
        children: [],
        parentId: null,
      };
      if (hDepth === 0) {
        root = node;
        stack.length = 0;
        stack.push({ node, headingDepth: 0 });
      } else {
        while (stack.length > 1 && stack[stack.length - 1].headingDepth >= hDepth) {
          stack.pop();
        }
        const parent = stack[stack.length - 1].node;
        node.parentId = parent.id;
        node.depth = hDepth;
        parent.children.push(node);
        stack.push({ node, headingDepth: hDepth });
      }
      continue;
    }
    const listMatch = line.match(/^\s*[-*]\s+(.+)$/);
    if (listMatch && stack.length > 0) {
      const text = listMatch[1].trim();
      const parentNode = stack[stack.length - 1].node;
      const node: MindNode = {
        id: uid(text.toLowerCase().replace(/\W+/g, '-').slice(0, 20)),
        text,
        depth: parentNode.depth + 1,
        children: [],
        parentId: parentNode.id,
      };
      parentNode.children.push(node);
    }
  }

  if (!root) return null;
  return { title: meta.title, articleSlug: meta.articleSlug || '', root };
}

// ─── Slug set (read at server startup / build time) ──────────────────────────

const MINDMAP_DIR = path.join(process.cwd(), 'content/mindmap');

export const mindmapSlugSet = new Set<string>(
  fs.existsSync(MINDMAP_DIR)
    ? fs.readdirSync(MINDMAP_DIR)
        .filter((file) => file.endsWith('.md'))
        .map((file) => file.replace('.md', ''))
    : []
);

// ─── Async loader ─────────────────────────────────────────────────────────────

const cache: Record<string, string> = {};

async function loadRaw(slug: string): Promise<string | null> {
  try {
    const filePath = path.join(MINDMAP_DIR, `${slug}.md`);
    if (cache[filePath] !== undefined) return cache[filePath];
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    cache[filePath] = raw;
    return raw;
  } catch (error) {
    console.error(`Error loading mindmap file: ${slug}`, error);
    return null;
  }
}

export async function getMindmapData(slug: string): Promise<MindmapData | null> {
  const raw = await loadRaw(slug);
  if (!raw) return null;
  return parseMindmap(raw);
}
