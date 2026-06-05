'use client';
import { useEffect, useState } from 'react';
import { PracticeArticle, PracticeQuestion, ArticleMeta } from '@/lib/content-types';
import { loadProgress, setRevealedQuestions, markQuizCompleted, resetQuiz } from '@/lib/progress';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, Clock, BookOpen, Trophy, RotateCcw, Sparkles, Target, Network } from 'lucide-react';
import { cn } from '@/lib/utils';
import Footer from '@/components/Footer';
import Link from 'next/link';

const DIFFICULTY_STYLES = {
  Easy:   { badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', label: 'Easy' },
  Medium: { badge: 'bg-amber-100 text-amber-700 border-amber-200',       dot: 'bg-amber-500',   label: 'Medium' },
  Hard:   { badge: 'bg-rose-100 text-rose-700 border-rose-200',          dot: 'bg-rose-500',    label: 'Hard' },
};

function QuestionCard({ question, index, revealed, onReveal }: { question: PracticeQuestion; index: number; revealed: boolean; onReveal: () => void }) {
  const diff = DIFFICULTY_STYLES[question.difficulty];
  return (
    <div className={cn('rounded-2xl border transition-all duration-300', revealed ? 'border-violet-200 bg-violet-50/30 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-md')}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0', revealed ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-500')}>{index + 1}</div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn('inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border', diff.badge)}>
                <span className={cn('w-1.5 h-1.5 rounded-full', diff.dot)} />{diff.label}
              </span>
              {question.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full font-medium">{tag}</span>
              ))}
            </div>
          </div>
          {revealed && <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0" />}
        </div>
        <div className="prose prose-slate prose-sm max-w-none"><MarkdownRenderer content={question.question} /></div>
      </div>
      <div className="px-6 pb-6">
        <button onClick={onReveal} className={cn('w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200', revealed ? 'bg-violet-100 text-violet-700 hover:bg-violet-200' : 'bg-slate-900 text-white hover:bg-slate-800')}>
          {revealed ? <><ChevronUp className="w-4 h-4" /> Hide Answer</> : <><ChevronDown className="w-4 h-4" /> Reveal Answer</>}
        </button>
      </div>
      {revealed && (
        <div className="border-t border-violet-100 mx-6 mb-6">
          <div className="pt-5">
            <div className="flex items-center gap-2 mb-3"><Sparkles className="w-4 h-4 text-violet-500" /><span className="text-sm font-bold text-violet-700">Answer</span></div>
            <div className="prose prose-slate prose-sm max-w-none bg-white rounded-xl p-4 border border-violet-100"><MarkdownRenderer content={question.answer} /></div>
          </div>
        </div>
      )}
    </div>
  );
}

interface Props {
  practice: PracticeArticle | null;
  article: ArticleMeta | null;
  slug: string;
}

export function PracticeClient({ practice, article, slug }: Props) {
  const [revealed, setRevealedState] = useState<Set<number>>(new Set());
  const [activeStateSlug, setActiveStateSlug] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useEffect(() => {
    if (!practice) return;
    const stored = loadProgress().quizzesRevealed[slug];
    setRevealedState(stored ? new Set(stored) : new Set());
    setActiveStateSlug(slug);
  }, [practice, slug]);

  useEffect(() => {
    if (!practice || activeStateSlug !== slug) return;
    const qs = practice.questions ?? [];
    const arr = Array.from(revealed);
    setRevealedQuestions(slug, arr);
    if (qs.length > 0 && arr.length === qs.length) markQuizCompleted(slug);
  }, [revealed, slug, practice, activeStateSlug]);

  if (!practice) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 text-2xl">📝</div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">No practice page found</h1>
        <p className="text-slate-500 mb-6">
          Practice questions for <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">{slug}</code> don&apos;t exist yet.
        </p>
        <Link href={`/docs/${slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700">
          <ArrowLeft className="w-4 h-4" /> Back to the article
        </Link>
      </div>
    );
  }

  const questions     = practice.questions ?? [];
  const answeredCount = revealed.size;
  const totalCount    = questions.length;
  const progressPct   = totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0;
  const allAnswered   = totalCount > 0 && answeredCount === totalCount;

  const toggleReveal = (id: number) => setRevealedState((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const revealAll   = () => setRevealedState(new Set(questions.map(q => q.id)));
  const handleReset = () => { setRevealedState(new Set()); resetQuiz(slug); };

  const difficultyBreakdown = {
    Easy:   questions.filter(q => q.difficulty === 'Easy').length,
    Medium: questions.filter(q => q.difficulty === 'Medium').length,
    Hard:   questions.filter(q => q.difficulty === 'Hard').length,
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-8">
        <Link href={`/docs/${slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to {article?.title || 'article'}
        </Link>
      </div>

      <div className="bg-linear-to-br from-violet-600 to-indigo-700 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full" />
        <div className="absolute right-8 -bottom-6 w-24 h-24 bg-white/5 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full"><Target className="w-3.5 h-3.5" /> Practice Quiz</span>
            <span className="text-violet-200 text-sm">{practice.difficulty}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">{practice.title}</h1>
          <p className="text-violet-200 text-sm mb-6">Test your understanding of the material with these practice questions.</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-violet-100"><BookOpen className="w-4 h-4" /> {totalCount} questions</div>
            <div className="flex items-center gap-1.5 text-violet-100"><Clock className="w-4 h-4" /> {practice.estimatedTime}</div>
            {difficultyBreakdown.Easy   > 0 && <span className="bg-emerald-400/20 text-emerald-200 px-2 py-0.5 rounded-full text-xs font-semibold">{difficultyBreakdown.Easy} Easy</span>}
            {difficultyBreakdown.Medium > 0 && <span className="bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded-full text-xs font-semibold">{difficultyBreakdown.Medium} Medium</span>}
            {difficultyBreakdown.Hard   > 0 && <span className="bg-rose-400/20 text-rose-200 px-2 py-0.5 rounded-full text-xs font-semibold">{difficultyBreakdown.Hard} Hard</span>}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {allAnswered ? <Trophy className="w-5 h-5 text-amber-500" /> : <Target className="w-5 h-5 text-slate-400" />}
            <span className="font-bold text-slate-900 text-sm">{allAnswered ? 'All questions revealed!' : 'Progress'}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">{answeredCount}/{totalCount} revealed</span>
            <div className="flex gap-2">
              <button onClick={handleReset} className="flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors px-2.5 py-1.5 rounded-lg border border-rose-100 hover:border-rose-200"><RotateCcw className="w-3 h-3" /> Reset Quiz</button>
              <button onClick={revealAll} className={cn('text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors', allAnswered ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-violet-100 text-violet-700 hover:bg-violet-200')}>Reveal All</button>
            </div>
          </div>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div className={cn('h-2.5 rounded-full transition-all duration-500', allAnswered ? 'bg-amber-400' : 'bg-violet-500')} style={{ width: `${progressPct}%` }} />
        </div>
        {allAnswered && <p className="text-sm text-amber-600 font-medium mt-2 text-center">🎉 Great work! Progress saved to your roadmap.</p>}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50">
          {article?.hasMindmap && (
            <Link href={`/mindmap/${slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-2.5 py-1.5 rounded-lg transition-colors">
              <Network className="w-3.5 h-3.5" /> Mind Map
            </Link>
          )}
          <Link href={`/docs/${slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition-colors">
            <BookOpen className="w-3.5 h-3.5" /> Read Article
          </Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-500 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-2.5 py-1.5 rounded-lg transition-colors ml-auto">View Roadmap →</Link>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question, idx) => (
          <QuestionCard key={question.id} question={question} index={idx} revealed={revealed.has(question.id)} onReveal={() => toggleReveal(question.id)} />
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
        <Link href={`/docs/${slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-violet-700 transition-colors"><ArrowLeft className="w-4 h-4" /> Back to article</Link>
        <button onClick={handleReset} className="inline-flex items-center gap-2 text-sm font-semibold text-rose-500 hover:text-rose-700 transition-colors"><RotateCcw className="w-4 h-4" /> Start over</button>
      </div>
    </div>
  );
}
