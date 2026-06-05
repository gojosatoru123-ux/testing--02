/**
 * content-types.ts
 *
 * Shared types for articles, practice content, and mindmaps.
 * This file has NO Node.js or React imports — it is safe to use in both
 * Server Components and Client Components.
 */

// ─── Article types ────────────────────────────────────────────────────────────

export interface ArticleMeta {
  title: string;
  slug: string;
  description: string;
  category: string;
  order: number;
  hasPractice: boolean;
  hasMindmap: boolean;
}

export interface Article extends ArticleMeta {
  content: string;
}

// ─── Practice types ───────────────────────────────────────────────────────────

export interface PracticeQuestion {
  id: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  question: string;
  answer: string;
}

export interface PracticeMeta {
  title: string;
  articleSlug: string;
  difficulty: string;
  estimatedTime: string;
  totalQuestions: number;
}

export interface PracticeArticle extends PracticeMeta {
  questions: PracticeQuestion[];
}

// ─── Mindmap types ────────────────────────────────────────────────────────────

export interface MindNode {
  id: string;
  text: string;
  depth: number; // 0=root, 1=branch, 2=subbranch, 3+=detail
  children: MindNode[];
  parentId: string | null;
}

export interface MindmapData {
  title: string;
  articleSlug: string;
  root: MindNode;
}
