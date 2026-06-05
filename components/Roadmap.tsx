import { useProgress, resetAllQuizzes, ProgressStore } from '../lib/progress';
import { MANIFEST, CATEGORY_ORDER } from '../lib/manifest';
import { Network, Target, BookOpen, CheckCircle2, ArrowRight, Trophy, RotateCcw, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// ─── Per-category visual config ───────────────────────────────────────────────
const CATEGORY_CONFIG: Record<string, { short: string; color: string; gradient: string }> = {
  'Low Level Design':  { short: 'LLD', color: '#7c3aed', gradient: 'from-violet-600 to-indigo-700' },
  'High Level Design': { short: 'HLD', color: '#0d9488', gradient: 'from-teal-600 to-emerald-700' },
  'Backend Design':    { short: 'BE',  color: '#d97706', gradient: 'from-amber-500 to-orange-600' },
  'Web Security':      { short: 'SEC', color: '#dc2626', gradient: 'from-rose-600 to-red-700' },
  'SEO':               { short: 'SEO', color: '#059669', gradient: 'from-emerald-600 to-green-700' },
  'Networking':        { short: 'NET', color: '#0284c7', gradient: 'from-sky-600 to-cyan-700' },
  'Design':            { short: 'DSN', color: '#9333ea', gradient: 'from-purple-600 to-pink-700' },
  'General':           { short: 'GEN', color: '#6366f1', gradient: 'from-indigo-500 to-purple-600' },
};

function getCategoryConfig(name: string) {
  return CATEGORY_CONFIG[name] ?? {
    short: name.slice(0, 3).toUpperCase(),
    color: '#6366f1',
    gradient: 'from-indigo-500 to-purple-600',
  };
}

// ─── Build tracks dynamically from MANIFEST ───────────────────────────────────
function buildTracks() {
  const grouped: Record<string, typeof MANIFEST> = {};
  for (const article of MANIFEST) {
    if (!grouped[article.category]) grouped[article.category] = [];
    grouped[article.category].push(article);
  }

  const ordered = [
    ...CATEGORY_ORDER.filter((c) => grouped[c]),
    ...Object.keys(grouped).filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  return ordered.map((cat) => ({
    name: cat,
    articles: grouped[cat].sort((a, b) => a.order - b.order),
    ...getCategoryConfig(cat),
  }));
}

// ─── SVG progress ring ────────────────────────────────────────────────────────
function RingProgress({ pct, color, size = 44, done }: {
  pct: number; color: string; size?: number; done: boolean;
}) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={3} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={done ? '#10b981' : color}
        strokeWidth={3}
        strokeDasharray={`${pct * circ} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dasharray 0.7s cubic-bezier(0.4,0,0.2,1)' }}
      />
      {done && (
        <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="central" fontSize={12} fill="#10b981" fontWeight="700">✓</text>
      )}
      {!done && pct === 0 && <circle cx={size / 2} cy={size / 2} r={4} fill="#cbd5e1" />}
      {!done && pct > 0 && pct < 1 && <circle cx={size / 2} cy={size / 2} r={3} fill={color} />}
    </svg>
  );
}

// ─── Node progress helper ─────────────────────────────────────────────────────
function getProgress(slug: string, store: ProgressStore, hasPractice: boolean) {
  const read = store.articlesRead.includes(slug);
  const done = store.quizzesCompleted.includes(slug);
  const partialCount = store.quizzesRevealed[slug]?.length ?? 0;

  if (!hasPractice) return { pct: read ? 1 : 0, done: read, read, quizDone: false, partial: false };
  if (done)         return { pct: 1, done: true, read, quizDone: true, partial: false };
  if (read)         return { pct: partialCount > 0 ? 0.7 : 0.5, done: false, read, quizDone: false, partial: partialCount > 0 };
  return { pct: 0, done: false, read: false, quizDone: false, partial: false };
}

// ─── Overall ring ─────────────────────────────────────────────────────────────
function OverallRing({ pct }: { pct: number }) {
  const size = 96; const r = 40;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size}>
      <defs>
        <linearGradient id="overallGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={5} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="url(#overallGrad)" strokeWidth={5}
        strokeDasharray={`${pct * circ} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)' }}
      />
    </svg>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function Stat({ label, value, total, color, icon, suffix = '' }: {
  label: string; value: string; total?: number; color: string; icon: React.ReactNode; suffix?: string;
}) {
  const colorMap: Record<string, string> = {
    violet: 'bg-violet-50 text-violet-600',
    amber:  'bg-amber-50 text-amber-600',
    teal:   'bg-teal-50 text-teal-600',
    rose:   'bg-rose-50 text-rose-600',
  };
  return (
    <div className="flex items-center gap-3">
      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', colorMap[color] || colorMap.violet)}>
        {icon}
      </div>
      <div>
        <div className="font-black text-slate-900 text-lg leading-none">
          {value}{total !== undefined ? <span className="text-slate-400 text-sm font-semibold">/{total}</span> : suffix}
        </div>
        <div className="text-xs text-slate-400 mt-0.5">{label}</div>
      </div>
    </div>
  );
}

// ─── Main Roadmap component ───────────────────────────────────────────────────
export function Roadmap() {
  const store  = useProgress();
  const TRACKS = buildTracks();

  // Global stats across ALL manifest articles
  const allSlugs      = MANIFEST.map((a) => a.slug);
  const totalArticles = allSlugs.length;
  const articlesRead  = allSlugs.filter((s) => store.articlesRead.includes(s)).length;
  const totalQuizzes  = MANIFEST.filter((a) => a.hasPractice).length;
  const quizzesDone   = store.quizzesCompleted.length;
  const overallPct    =
    totalArticles + totalQuizzes > 0
      ? (articlesRead + quizzesDone * 1.5) / (totalArticles + totalQuizzes * 1.5)
      : 0;

  const tracksCompleted = TRACKS.filter((t) =>
    t.articles.every((a) => store.articlesRead.includes(a.slug))
  ).length;

  // Next unread article (in MANIFEST order)
  const nextUnread  = allSlugs.find((s) => !store.articlesRead.includes(s));
  const nextArticle = nextUnread ? MANIFEST.find((a) => a.slug === nextUnread) : null;
  const hasAnyProgress = articlesRead > 0 || quizzesDone > 0;

  return (
    <section className="py-10">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-600 uppercase tracking-widest bg-violet-50 px-3 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Learning Roadmap
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Your Progress Journey</h2>
          <p className="text-slate-500 mt-1.5 text-sm">Track every article, quiz, and mind map across all topics.</p>
        </div>
        {hasAnyProgress && (
          <button
            onClick={() => { if (confirm('Reset all quiz progress? Articles read will be preserved.')) resetAllQuizzes(); }}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 px-3 py-2 rounded-xl transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Quizzes
          </button>
        )}
      </div>

      {/* ── Overall progress card ── */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <OverallRing pct={overallPct} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black text-slate-900 leading-none">{Math.round(overallPct * 100)}%</span>
              <span className="text-xs text-slate-400 mt-0.5">done</span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            <Stat label="Articles Read" value={`${articlesRead}`}    total={totalArticles}  color="violet" icon={<BookOpen className="w-4 h-4" />} />
            <Stat label="Quizzes Done"  value={`${quizzesDone}`}     total={totalQuizzes}   color="amber"  icon={<Target className="w-4 h-4" />} />
            <Stat label="Tracks Done"   value={`${tracksCompleted}`} total={TRACKS.length}  color="teal"   icon={<Trophy className="w-4 h-4" />} />
            <Stat label="Points"        value={`${Math.floor(articlesRead * 10 + quizzesDone * 15)}`} color="rose" icon={<Sparkles className="w-4 h-4" />} suffix=" pts" />
          </div>

          {nextArticle && (
            <Link
              href={`/docs/${nextArticle.slug}`}
              className="shrink-0 flex items-center gap-3 bg-linear-to-r from-violet-600 to-indigo-600 text-white px-5 py-3 rounded-2xl hover:shadow-lg hover:shadow-violet-200 transition-all group"
            >
              <div>
                <div className="text-xs text-violet-200 font-medium">Continue</div>
                <div className="text-sm font-bold truncate max-w-30">{nextArticle.title}</div>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
          )}
        </div>
      </div>

      {/* ── Track columns — one per category, all from MANIFEST ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {TRACKS.map((track, trackIdx) => {
          const trackRead    = track.articles.filter((a) => store.articlesRead.includes(a.slug)).length;
          const trackDone    = track.articles.filter((a) => store.quizzesCompleted.includes(a.slug)).length;
          const withPractice = track.articles.filter((a) => a.hasPractice).length;
          const trackComplete =
            trackRead === track.articles.length &&
            (withPractice === 0 || trackDone === withPractice);

          return (
            <div
              key={track.name}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm"
              style={{ animationDelay: `${trackIdx * 60}ms` }}
            >
              {/* Track header */}
              <div className={`bg-linear-to-r ${track.gradient} p-5 text-white relative overflow-hidden`}>
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-0.5">{track.short}</div>
                    <div className="font-bold text-base">{track.name}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {trackComplete && (
                      <div className="flex items-center gap-1 bg-white/20 rounded-full px-2.5 py-1 text-xs font-bold">
                        <Trophy className="w-3 h-3" /> Complete!
                      </div>
                    )}
                    <div className="text-xs opacity-70">
                      {trackRead}/{track.articles.length} read
                      {withPractice > 0 && ` · ${trackDone}/${withPractice} quiz`}
                    </div>
                  </div>
                </div>

                {/* Track progress bar */}
                <div className="mt-3 bg-white/20 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-700"
                    style={{ width: `${track.articles.length > 0 ? (trackRead / track.articles.length) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Article nodes */}
              <div className="p-3">
                {track.articles.map((article, nodeIdx) => {
                  const prog   = getProgress(article.slug, store, article.hasPractice);
                  const isLast = nodeIdx === track.articles.length - 1;

                  return (
                    <div key={article.slug} className="relative">
                      {/* Connector line between nodes */}
                      {!isLast && (
                        <div className="absolute left-6.75 top-13 w-0.5 h-5 z-0">
                          <div className="w-full bg-slate-100 absolute inset-0 rounded-full" />
                          {prog.read && (
                            <div
                              className="w-full absolute top-0 rounded-full transition-all duration-700"
                              style={{ height: '100%', background: track.color }}
                            />
                          )}
                        </div>
                      )}

                      {/* Node card */}
                      <div
                        className={cn(
                          'relative z-10 flex items-start gap-3 p-3 rounded-2xl transition-all duration-200 mb-1',
                          prog.done
                            ? 'bg-emerald-50 border border-emerald-100'
                            : prog.read
                            ? 'bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-sm'
                            : 'border border-transparent hover:bg-slate-50 hover:border-slate-100'
                        )}
                        style={prog.done ? { boxShadow: '0 0 0 1px rgba(16,185,129,0.2), 0 2px 8px rgba(16,185,129,0.08)' } : {}}
                      >
                        <RingProgress pct={prog.pct} color={track.color} done={prog.done} />

                        <div className="flex-1 min-w-0 pt-0.5">
                          <Link
                            href={`/docs/${article.slug}`}
                            className={cn(
                              'font-semibold text-sm leading-tight block hover:underline transition-colors mb-2',
                              prog.done ? 'text-emerald-800' : prog.read ? 'text-slate-800' : 'text-slate-500'
                            )}
                          >
                            {article.title}
                          </Link>

                          <div className="flex items-center gap-1.5 flex-wrap">
                            {/* Status pill */}
                            {prog.done ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3" /> Done
                              </span>
                            ) : prog.read ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                                <BookOpen className="w-3 h-3" /> Reading
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                                Not started
                              </span>
                            )}

                            {/* Mind map + quiz buttons */}
                            <div className="flex items-center gap-1 ml-auto">
                              {article.hasMindmap && (
                                <Link
                                  href={`/mindmap/${article.slug}`}
                                  title="Mind Map"
                                  className="w-6 h-6 rounded-lg bg-sky-50 hover:bg-sky-100 flex items-center justify-center transition-colors"
                                >
                                  <Network className="w-3 h-3 text-sky-600" />
                                </Link>
                              )}
                              {article.hasPractice && (
                                <Link
                                  href={`/practice/${article.slug}`}
                                  title="Practice Quiz"
                                  className={cn(
                                    'w-6 h-6 rounded-lg flex items-center justify-center transition-colors',
                                    prog.quizDone ? 'bg-emerald-50 hover:bg-emerald-100'
                                    : prog.partial  ? 'bg-amber-50 hover:bg-amber-100'
                                    : 'bg-slate-50 hover:bg-slate-100'
                                  )}
                                >
                                  <Target className={cn(
                                    'w-3 h-3',
                                    prog.quizDone ? 'text-emerald-600' : prog.partial ? 'text-amber-600' : 'text-slate-400'
                                  )} />
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Track footer CTA */}
              <div className="px-3 pb-3">
                <Link
                  href={`/docs/${track.articles[0]?.slug}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border text-xs font-bold transition-all hover:shadow-sm"
                  style={{ borderColor: `${track.color}30`, color: track.color, background: `${track.color}08` }}
                >
                  {trackRead === 0 ? 'Start track' : trackComplete ? 'Review track' : 'Continue'}{' '}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile reset ── */}
      {hasAnyProgress && (
        <div className="mt-5 flex justify-center sm:hidden">
          <button
            onClick={() => { if (confirm('Reset all quiz progress?')) resetAllQuizzes(); }}
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-rose-600 px-4 py-2 rounded-xl border border-slate-200 transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Reset All Quizzes
          </button>
        </div>
      )}
    </section>
  );
}