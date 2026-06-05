'use client';
import {
  ArrowRight, Code, Zap, Shield, Globe,
  ChevronRight, Sparkles, Target, LayoutGrid,
  Network, BookOpen, Brain, Hash, Trophy,
} from 'lucide-react';
import { MANIFEST, CATEGORIES, CATEGORY_ORDER } from '@/lib/manifest';
import { useProgress } from '@/lib/progress';
import { Roadmap } from '@/components/Roadmap';
import { cn } from '@/lib/utils';
import Footer from '@/components/Footer';
import Link from 'next/link';

// ─── Per-category visual config (same palette as Roadmap/Sidebar) ─────────────
const CATEGORY_CONFIG: Record<string, {
  short: string; color: string; lightColor: string;
  gradient: string; textAccent: string; icon: React.ReactNode;
  border: string; badgeBg: string; badgeText: string;
}> = {
  'Low Level Design': {
    short: 'LLD', color: '#7c3aed', lightColor: '#ede9fe',
    gradient: 'from-violet-600 to-indigo-700', textAccent: 'text-violet-200',
    icon: <Code className="w-6 h-6 text-white" />,
    border: 'border-violet-200', badgeBg: 'bg-violet-100', badgeText: 'text-violet-700',
  },
  'High Level Design': {
    short: 'HLD', color: '#0d9488', lightColor: '#ccfbf1',
    gradient: 'from-teal-600 to-emerald-700', textAccent: 'text-teal-200',
    icon: <LayoutGrid className="w-6 h-6 text-white" />,
    border: 'border-teal-200', badgeBg: 'bg-teal-100', badgeText: 'text-teal-700',
  },
  'Backend Design': {
    short: 'BE', color: '#d97706', lightColor: '#fef3c7',
    gradient: 'from-amber-500 to-orange-600', textAccent: 'text-amber-200',
    icon: <Zap className="w-6 h-6 text-white" />,
    border: 'border-amber-200', badgeBg: 'bg-amber-100', badgeText: 'text-amber-700',
  },
  'Web Security': {
    short: 'SEC', color: '#dc2626', lightColor: '#fee2e2',
    gradient: 'from-rose-600 to-red-700', textAccent: 'text-rose-200',
    icon: <Shield className="w-6 h-6 text-white" />,
    border: 'border-rose-200', badgeBg: 'bg-rose-100', badgeText: 'text-rose-700',
  },
  'SEO': {
    short: 'SEO', color: '#059669', lightColor: '#d1fae5',
    gradient: 'from-emerald-600 to-green-700', textAccent: 'text-emerald-200',
    icon: <Globe className="w-6 h-6 text-white" />,
    border: 'border-emerald-200', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700',
  },
  'Networking': {
    short: 'NET', color: '#0284c7', lightColor: '#e0f2fe',
    gradient: 'from-sky-600 to-cyan-700', textAccent: 'text-sky-200',
    icon: <Network className="w-6 h-6 text-white" />,
    border: 'border-sky-200', badgeBg: 'bg-sky-100', badgeText: 'text-sky-700',
  },
  'Design': {
    short: 'DES', color: '#0891b2', lightColor: '#e0f7fa',
    gradient: 'from-cyan-600 to-teal-700', textAccent: 'text-cyan-200',
    icon: <LayoutGrid className="w-6 h-6 text-white" />,
    border: 'border-cyan-200', badgeBg: 'bg-cyan-100', badgeText: 'text-cyan-700',
  }
};

const FALLBACK_CONFIG = {
  short: 'GEN', color: '#6366f1', lightColor: '#e0e7ff',
  gradient: 'from-indigo-500 to-purple-600', textAccent: 'text-indigo-200',
  icon: <BookOpen className="w-6 h-6 text-white" />,
  border: 'border-indigo-200', badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-700',
};

function getCfg(cat: string) {
  return CATEGORY_CONFIG[cat] ?? FALLBACK_CONFIG;
}

// ─── Build ordered category list dynamically ──────────────────────────────────
function buildCategoryList() {
  const cats = Object.keys(CATEGORIES);
  return [
    ...CATEGORY_ORDER.filter((c) => cats.includes(c)),
    ...cats.filter((c) => !CATEGORY_ORDER.includes(c)),
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const store        = useProgress();
  const orderedCats  = buildCategoryList();

  // Dynamic global stats
  const totalArticles  = MANIFEST.length;
  const totalPractice  = MANIFEST.filter((a) => a.hasPractice).length;
  const totalMindmaps  = MANIFEST.filter((a) => a.hasMindmap).length;
  const totalCats      = orderedCats.length;

  // User progress
  const articlesRead   = MANIFEST.filter((a) => store.articlesRead.includes(a.slug)).length;
  const quizzesDone    = store.quizzesCompleted.length;
  const hasProgress    = articlesRead > 0 || quizzesDone > 0;

  // First article not yet read → CTA target
  const firstUnread    = MANIFEST.find((a) => !store.articlesRead.includes(a.slug));
  const ctaSlug        = firstUnread?.slug ?? MANIFEST[0]?.slug ?? 'lld-design-patterns';
  const ctaLabel       = hasProgress ? 'Continue Learning' : 'Start Learning';

  // First practice-enabled article for the quiz CTA
  const firstPractice  = MANIFEST.find((a) => a.hasPractice);

  // Quick links: first 2 articles per ordered category (up to 8 total)
  const quickLinks = orderedCats.flatMap((cat) =>
    (CATEGORIES[cat] ?? []).slice(0, 2).map((a) => ({ ...a, cat }))
  ).slice(0, 8);

  return (
    <div className="min-h-screen">

      {/* ══════════════════════════════════════════════════════════════
          HERO BENTO
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20">

        {/* Main bento row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

          {/* ── Main hero card ── */}
          <div className="md:col-span-2 bg-linear-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-56 h-56 bg-violet-500/10 rounded-full" />
            <div className="absolute right-8 -bottom-8 w-32 h-32 bg-teal-500/10 rounded-full" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                {totalCats} subjects · Always growing
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4">
                Learn. Build.{' '}
                <span className="bg-linear-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent">
                  Practice.
                </span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
                Deep technical documentation for LLD, HLD, Backend, Web Security & more — each with interactive practice quizzes and visual mind maps.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/docs/${ctaSlug}`}
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                >
                  {ctaLabel} <ArrowRight className="w-4 h-4" />
                </Link>
                {firstPractice && (
                  <Link
                    href={`/practice/${firstPractice.slug}`}
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                  >
                    <Target className="w-4 h-4" /> Try a Quiz
                  </Link>
                )}
              </div>

              {/* Mini progress bar if user has started */}
              {hasProgress && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Your progress</span>
                    <span className="text-white font-semibold">{articlesRead}/{totalArticles} articles</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-violet-400 to-teal-400 rounded-full transition-all duration-700"
                      style={{ width: `${(articlesRead / totalArticles) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Stats column ── */}
          <div className="grid grid-rows-3 gap-4">
            <div className="bg-violet-600 rounded-3xl p-5 text-white flex flex-col justify-between">
              <div className="text-violet-200 text-xs font-semibold uppercase tracking-wider">Articles</div>
              <div>
                <div className="text-4xl font-black">{totalArticles}</div>
                <div className="text-violet-200 text-xs mt-1">across {totalCats} subjects</div>
              </div>
            </div>
            <div className="bg-amber-500 rounded-3xl p-5 text-white flex flex-col justify-between">
              <div className="text-amber-100 text-xs font-semibold uppercase tracking-wider">Practice Quizzes</div>
              <div>
                <div className="text-4xl font-black">{totalPractice}</div>
                <div className="text-amber-100 text-xs mt-1">interactive question sets</div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-3xl p-5 text-white flex flex-col justify-between">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Mind Maps</div>
              <div>
                <div className="text-4xl font-black">{totalMindmaps}</div>
                <div className="text-slate-400 text-xs mt-1">visual concept maps</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Subject hero cards — one per category, fully dynamic ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {orderedCats.map((cat) => {
            const cfg       = getCfg(cat);
            const articles  = CATEGORIES[cat] ?? [];
            const withMap   = articles.filter((a) => a.hasMindmap).length;
            const withQuiz  = articles.filter((a) => a.hasPractice).length;
            const firstSlug = articles[0]?.slug;
            const firstMap  = articles.find((a) => a.hasMindmap)?.slug;
            const firstQuiz = articles.find((a) => a.hasPractice)?.slug;

            return (
              <div
                key={cat}
                className={`bg-linear-to-br ${cfg.gradient} rounded-2xl p-6 text-white relative overflow-hidden group`}
              >
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full" />
                <div className="relative">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
                      {cfg.icon}
                    </div>
                    <span className={`text-xs font-bold ${cfg.textAccent} bg-white/10 px-2.5 py-1 rounded-full`}>
                      {articles.length} article{articles.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Title */}
                  <div className={`text-xs font-bold uppercase tracking-widest ${cfg.textAccent} mb-1`}>
                    {cfg.short}
                  </div>
                  <h3 className="text-lg font-black mb-2">{cat}</h3>
                  <p className={`text-sm ${cfg.textAccent} leading-relaxed mb-5 line-clamp-2`}>
                    {articles.slice(0, 3).map((a) => a.title).join(' · ')}
                  </p>

                  {/* Mini stats row */}
                  {(withMap > 0 || withQuiz > 0) && (
                    <div className="flex items-center gap-3 mb-4">
                      {withMap > 0 && (
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold ${cfg.textAccent}`}>
                          <Network className="w-3 h-3" /> {withMap} map{withMap !== 1 ? 's' : ''}
                        </span>
                      )}
                      {withQuiz > 0 && (
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold ${cfg.textAccent}`}>
                          <Target className="w-3 h-3" /> {withQuiz} quiz{withQuiz !== 1 ? 'zes' : ''}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-2 flex-wrap">
                    {firstSlug && (
                      <Link
                        href={`/docs/${firstSlug}`}
                        className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                      >
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    {firstMap && (
                      <Link
                        href={`/mindmap/${firstMap}`}
                        className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors border border-white/20"
                      >
                        <Network className="w-3.5 h-3.5" /> Map
                      </Link>
                    )}
                    {firstQuiz && (
                      <Link
                        href={`/practice/${firstQuiz}`}
                        className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors border border-white/20"
                      >
                        <Target className="w-3.5 h-3.5" /> Quiz
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

            {/* ══════════════════════════════════════════════════════════════
          NEWSLETTER CARD
      ══════════════════════════════════════════════════════════════ */}
      <section className="pb-12">
        <div className="bg-linear-to-r from-violet-600 to-indigo-700 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-52 h-52 bg-white/10 rounded-full" />
          <div className="absolute left-1/2 -bottom-16 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Coming Soon
              </div>

              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.15] mb-3">
                Newsletter Service<br />
                coming soon for free.
              </h2>

              <p className="text-violet-100 leading-relaxed text-sm md:text-base max-w-xl">
                Get curated system design insights, newly added articles, interview prep notes,
                and engineering deep-dives delivered straight to your inbox.
              </p>
            </div>

            <div className="shrink-0">
              <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl px-5 py-4">
                <div className="text-2xl font-black">100% Free</div>
                <div className="text-violet-100 text-sm mt-1">
                  No spam. Only high-quality engineering content.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ROADMAP
      ══════════════════════════════════════════════════════════════ */}
      <div className="border-t border-slate-100 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 bg-slate-50/50">
        <Roadmap />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          QUICK LINKS — dynamic from MANIFEST
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Quick Links</h2>
          <span className="text-sm text-slate-400">Jump to any topic</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map((article) => {
            const cfg  = getCfg(article.cat);
            const read = store.articlesRead.includes(article.slug);
            return (
              <Link
                key={article.slug}
                href={`/docs/${article.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-2xl border border-slate-100 bg-white hover:border-violet-200 hover:shadow-md hover:shadow-violet-50 transition-all duration-200 relative"
              >
                {read && (
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-400" title="Read" />
                )}
                <div className="flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5 shrink-0" style={{ color: cfg.color }} />
                  <span className="font-semibold text-slate-800 text-sm group-hover:text-violet-700 transition-colors truncate">
                    {article.title}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 ml-auto group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                <p className="text-xs pl-5 truncate" style={{ color: cfg.color }}>{article.cat}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PRACTICE SPOTLIGHT — dynamic
      ══════════════════════════════════════════════════════════════ */}
      <section className="pb-16">
        <div className="bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-100 px-3 py-1.5 rounded-full mb-4">
                <Target className="w-3.5 h-3.5" /> Interactive Practice
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                Test your knowledge as you learn
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Every major topic has a practice quiz with questions ranging from concept checks to hard implementation challenges — with expandable answers. Progress is saved automatically.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {MANIFEST.filter((a) => a.hasPractice).slice(0, 4).map((article) => {
                  const cfg  = getCfg(article.category);
                  const done = store.quizzesCompleted.includes(article.slug);
                  return (
                    <Link
                      key={article.slug}
                      href={`/practice/${article.slug}`}
                      className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-amber-100 hover:border-amber-300 hover:shadow-sm transition-all group"
                    >
                      <Target className={cn('w-4 h-4 shrink-0', done ? 'text-emerald-500' : 'text-amber-500')} />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-800 group-hover:text-amber-700 truncate transition-colors">
                          {article.title}
                        </div>
                        <div className="text-xs font-medium truncate" style={{ color: cfg.color }}>
                          {article.category}
                        </div>
                      </div>
                      {done && <span className="ml-auto text-emerald-500 shrink-0">✓</span>}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-3 w-full md:w-64">
              <div className="bg-white rounded-2xl border border-amber-200 p-5">
                <div className="text-3xl font-black text-slate-900 mb-1">{totalPractice}</div>
                <div className="text-sm text-slate-500">Practice quizzes available</div>
                <div className="text-xs text-amber-600 font-semibold mt-1">progress saved locally</div>
              </div>
              <div className="bg-white rounded-2xl border border-amber-200 p-5">
                <div className="text-3xl font-black text-slate-900 mb-1">{quizzesDone}</div>
                <div className="text-sm text-slate-500">Quizzes completed</div>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {['Easy', 'Medium', 'Hard'].map((d) => (
                    <span key={d} className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-semibold">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PLATFORM FEATURES
      ══════════════════════════════════════════════════════════════ */}
      <section className="pb-20">
        <div className="mb-10 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-600 uppercase tracking-widest bg-violet-50 px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Built for engineers
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
            Everything you need to ace interviews
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            From concept to implementation — every topic is structured to build real, deep understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: <BookOpen className="w-5 h-5" />,
              color: 'bg-violet-100 text-violet-600',
              title: 'In-depth Articles',
              desc: `${totalArticles} articles covering LLD, HLD, Backend, Security and more — with code examples, diagrams and real-world context.`,
            },
            {
              icon: <Target className="w-5 h-5" />,
              color: 'bg-amber-100 text-amber-600',
              title: 'Practice Quizzes',
              desc: `${totalPractice} quiz sets with Easy · Medium · Hard questions. Expandable answers let you self-assess without cheating.`,
            },
            {
              icon: <Network className="w-5 h-5" />,
              color: 'bg-sky-100 text-sky-600',
              title: 'Interactive Mind Maps',
              desc: `${totalMindmaps} visual concept maps that let you see how everything in a topic connects at a glance.`,
            },
            {
              icon: <Trophy className="w-5 h-5" />,
              color: 'bg-teal-100 text-teal-600',
              title: 'Progress Tracking',
              desc: 'Every article and quiz you complete is tracked locally. See your roadmap fill up as you go.',
            },
            {
              icon: <Brain className="w-5 h-5" />,
              color: 'bg-rose-100 text-rose-600',
              title: 'Interview-Focused',
              desc: 'Every topic is chosen because it comes up in senior engineering interviews at top companies.',
            },
            {
              icon: <Zap className="w-5 h-5" />,
              color: 'bg-emerald-100 text-emerald-600',
              title: 'Instant Search',
              desc: 'Find any article, concept, or topic in milliseconds with full-text search across all content.',
            },
          ].map(({ icon, color, title, desc }) => (
            <div
              key={title}
              className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-slate-100 transition-all duration-200 group"
            >
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer/>

    </div>
  );
}