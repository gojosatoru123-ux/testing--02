'use client';
import { useState } from 'react';
import { MindmapData } from '@/lib/content-types';
import { ArticleMeta } from '@/lib/content-types';
import { MindMap } from '@/components/MindMap';
import { ArrowLeft, BookOpen, Target, Network } from 'lucide-react';
import Link from 'next/link';

function Skeleton() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      <div className="shrink-0 px-6 py-4 border-b border-slate-100 bg-white flex items-center gap-4">
        <div className="h-4 bg-slate-100 rounded w-24" />
        <div className="w-px h-5 bg-slate-200" />
        <div className="h-5 bg-slate-100 rounded w-48" />
      </div>
      <div className="flex-1 bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-300">
          <Network className="w-10 h-10" />
          <div className="h-3 bg-slate-100 rounded w-32" />
        </div>
      </div>
      <div className="shrink-0 px-6 py-3 border-t border-slate-100 bg-white flex gap-6">
        {[...Array(4)].map((_, i) => <div key={i} className="h-3 bg-slate-100 rounded w-20" />)}
      </div>
    </div>
  );
}

function countNodes(node: { children: typeof node[] }): number {
  return 1 + node.children.reduce((s, c) => s + countNodes(c), 0);
}

interface Props {
  mindmapData: MindmapData | null;
  article: ArticleMeta | null;
  slug: string;
}

export function MindMapClient({ mindmapData, article, slug }: Props) {
  const [fullscreen, setFullscreen] = useState(false);

  if (!mindmapData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <Network className="w-7 h-7 text-slate-400" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">No mind map found</h1>
        <p className="text-slate-500 mb-6">
          Mind map for <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">{slug}</code> doesn&apos;t exist yet.
        </p>
        <Link href={`/docs/${slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700">
          <ArrowLeft className="w-4 h-4" /> Back to article
        </Link>
      </div>
    );
  }

  const nodeCount = countNodes(mindmapData.root);
  const branchCount = mindmapData.root.children.length;

  return (
    <div className={fullscreen ? 'fixed inset-0 z-50 bg-white flex flex-col' : 'flex flex-col h-full'}>
      <div className="shrink-0 px-6 py-4 border-b border-slate-100 bg-white flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/docs/${slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {article?.title || 'Article'}
          </Link>
          <div className="w-px h-5 bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
              <Network className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-base leading-tight">{mindmapData.title}</h1>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>{branchCount} branches</span><span>·</span><span>{nodeCount} nodes</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {article?.hasPractice && (
            <Link href={`/practice/${slug}`} className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 hover:border-amber-300 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-colors">
              <Target className="w-3.5 h-3.5" /> Practice Quiz
            </Link>
          )}
          <Link href={`/docs/${slug}`} className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 px-3 py-1.5 rounded-xl transition-colors">
            <BookOpen className="w-3.5 h-3.5" /> Read Article
          </Link>
          <button onClick={() => setFullscreen((f) => !f)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 px-3 py-1.5 rounded-xl transition-colors">
            {fullscreen ? '↙ Exit' : '↗ Full'}
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0" style={{ minHeight: fullscreen ? undefined : '600px' }}>
        <MindMap data={mindmapData} key={slug} />
      </div>

      <div className="shrink-0 px-6 py-3 border-t border-slate-100 bg-white flex items-center gap-6 overflow-x-auto">
        <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0"><div className="w-4 h-4 rounded-sm bg-slate-900" /><span>Root topic</span></div>
        <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0"><div className="w-4 h-4 rounded-sm bg-violet-600" /><span>Branch</span></div>
        <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0"><div className="w-4 h-4 rounded-sm bg-violet-100 border border-violet-300" /><span>Sub-topic</span></div>
        <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0"><div className="w-4 h-4 rounded-sm bg-white border border-slate-200" /><span>Detail</span></div>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
          <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center"><span className="text-[8px] font-bold text-slate-500">−</span></div>
          <span>Click to collapse · Click again to expand</span>
        </div>
      </div>
    </div>
  );
}
