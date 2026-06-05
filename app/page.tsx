'use client';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, Code, Network, Shield, Globe,
  Zap, Target, BookOpen, ChevronDown, LayoutGrid,
  LayersIcon,
} from 'lucide-react';
import { MANIFEST, CATEGORIES, CATEGORY_ORDER } from '../lib/manifest';
import Footer from '@/components/Footer';
import Link from 'next/link';

// ─── Dynamic data from MANIFEST ──────────────────────────────────────────────
const totalArticles = MANIFEST.length;
const totalPractice = MANIFEST.filter(a => a.hasPractice).length;
const totalMindmaps = MANIFEST.filter(a => a.hasMindmap).length;
const totalCats = [...new Set(MANIFEST.map(a => a.category))].length;

const CATEGORY_CONFIG: Record<string, { color: string; gradient: string; icon: React.ReactNode; accent: string }> = {
  'Low Level Design': { color: '#a78bfa', gradient: 'from-violet-500 to-indigo-600', icon: <Code className="w-5 h-5" />, accent: '#7c3aed' },
  'High Level Design': { color: '#34d399', gradient: 'from-emerald-500 to-teal-600', icon: <LayoutGrid className="w-5 h-5" />, accent: '#059669' },
  'Backend Design': { color: '#fbbf24', gradient: 'from-amber-400 to-orange-500', icon: <Zap className="w-5 h-5" />, accent: '#d97706' },
  'Web Security': { color: '#f87171', gradient: 'from-rose-500 to-red-600', icon: <Shield className="w-5 h-5" />, accent: '#dc2626' },
  'SEO': { color: '#4ade80', gradient: 'from-green-400 to-emerald-600', icon: <Globe className="w-5 h-5" />, accent: '#059669' },
  'Design': { color: '#f472b6', gradient: 'from-pink-400 to-rose-500', icon: <LayersIcon className="w-5 h-5" />, accent: '#ec4899' },
  'Networking': { color: '#38bdf8', gradient: 'from-sky-400 to-cyan-500', icon: <Network className="w-5 h-5" />, accent: '#0284c7' },
};
const FALLBACK_CFG = { color: '#818cf8', gradient: 'from-indigo-400 to-purple-600', icon: <BookOpen className="w-5 h-5" />, accent: '#6366f1' };

function getCfg(cat: string) { return CATEGORY_CONFIG[cat] ?? FALLBACK_CFG; }

// ─── Ordered categories for display ──────────────────────────────────────────
function getOrderedCats() {
  const all = Object.keys(CATEGORIES);
  return [...CATEGORY_ORDER.filter(c => all.includes(c)), ...all.filter(c => !CATEGORY_ORDER.includes(c))];
}
const orderedCats = getOrderedCats();

// ─── Ticker tape — article titles scrolling horizontally ─────────────────────
function TickerTape() {
  const titles = MANIFEST.map(a => a.title);
  // duplicate for seamless loop
  const items = [...titles, ...titles];
  return (
    <div className="overflow-hidden py-3 border-y border-white/5 my-12">
      <div className="flex gap-8 animate-ticker whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="text-xs font-mono uppercase tracking-widest text-white/20 shrink-0">
            {t} <span className="text-violet-500 mx-2">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = to / 40;
      const timer = setInterval(() => {
        start += step;
        if (start >= to) { setVal(to); clearInterval(timer); }
        else setVal(Math.floor(start));
      }, 30);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function LandingPage() {
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#080810] text-white overflow-x-hidden">

      {/* ── CSS for ticker + grain ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap');

.font-display {
  font-family: 'Nunito', sans-serif;
  line-height: 1.15;
}
        .font-body    { font-family: 'DM Sans', sans-serif; }
        .font-mono-dm { font-family: 'DM Mono', monospace; }

        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker { animation: ticker 60s linear infinite; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-12px) rotate(1deg); }
          66%       { transform: translateY(-6px) rotate(-1deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
        .animate-glow { animation: pulse-glow 3s ease-in-out infinite; }

        .grain::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 100;
          opacity: 0.4;
        }

        .card-glow:hover { box-shadow: 0 0 40px -10px var(--glow-color); }

        .hero-line {
          background: linear-gradient(90deg, #7c3aed, #0d9488, #7c3aed);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
      `}</style>

      {/* Grain overlay */}
      <div className="grain" />

      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-150 h-150 bg-violet-900/20 rounded-full blur-[120px] animate-glow" />
        <div className="absolute top-[40%] right-[-10%] w-125 h-125 bg-teal-900/15 rounded-full blur-[100px] animate-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[-10%] left-[30%] w-100 h-100 bg-indigo-900/20 rounded-full blur-[100px] animate-glow" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 font-body">

        {/* ════════════════════════════════════════════════════════
            NAV
        ════════════════════════════════════════════════════════ */}
        <nav className="flex items-center justify-between px-6 md:px-12 py-6">
          <div className="flex items-center gap-3">
            <img src="/cacheu_logo.webp" alt="CacheU" className="w-9 h-9 rounded-lg" />
            <span className="font-display text-white font-800 text-lg tracking-tight">CacheU</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/50 font-mono-dm">
            <Link href="/home" className="hover:text-white transition-colors">Docs</Link>
            {/* <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a> */}
          </div>
          <Link
            href="/home"
            className="text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 px-5 py-2.5 rounded-xl transition-all"
          >
            Open App →
          </Link>
        </nav>

        {/* ════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════ */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-12 pt-12 pb-0 text-center">

          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2.5 border border-violet-500/30 bg-violet-500/10 rounded-full px-4 py-2 mb-10 text-xs font-mono-dm text-violet-300 uppercase tracking-widest"
            style={{ opacity: 0, animation: 'fadeSlideUp 0.8s ease 0.1s forwards' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            {totalArticles} articles · {totalPractice} quizzes · {totalMindmaps} mind maps · 100% free
          </div>

          {/* Headline */}
          <h1
            className="font-display text-[clamp(3rem,10vw,7rem)] leading-[1.28] tracking-tighter text-white mb-6 max-w-5xl pb-[0.08em]"
            style={{ opacity: 0, animation: 'fadeSlideUp 0.9s ease 0.2s forwards' }}
          >
            The system design<br />
            <span className="hero-line">knowledge base</span><br />
            engineers trust.
          </h1>

          {/* Subhead */}
          <p
            className="text-white/40 text-lg md:text-xl font-body max-w-xl mx-auto mb-12 leading-relaxed"
            style={{ opacity: 0, animation: 'fadeSlideUp 0.9s ease 0.35s forwards' }}
          >
            Deep articles. Visual mind maps. Interview-grade practice. Built for engineers who want to truly understand — not just memorize.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 mb-6"
            style={{ opacity: 0, animation: 'fadeSlideUp 0.9s ease 0.45s forwards' }}
          >
            <Link
              href="/home"
              className="group inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-7 py-3.5 rounded-xl text-sm hover:bg-violet-50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20"
            >
              Explore the library
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href={`/docs/${MANIFEST.find(a => a.hasPractice)?.slug ?? MANIFEST[0]?.slug}`}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 font-medium px-7 py-3.5 rounded-xl text-sm transition-all"
            >
              <Target className="w-4 h-4" />
              Try a practice quiz
            </Link>
          </div>

          {/* Scroll cue */}
          <div className="text-white/20 flex flex-col items-center gap-1 mt-4" style={{ opacity: 0, animation: 'fadeSlideUp 0.9s ease 0.6s forwards' }}>
            <span className="text-xs font-mono-dm tracking-widest uppercase">scroll</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* Ticker */}
          <div className="w-screen -mx-6 md:-mx-12 mt-16">
            <TickerTape />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            STAT STRIP
        ════════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-12 py-16">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: totalArticles, suffix: '', label: 'In-depth articles', color: '#a78bfa' },
              { val: totalPractice, suffix: '+', label: 'Practice quiz sets', color: '#34d399' },
              { val: totalMindmaps, suffix: '', label: 'Interactive mind maps', color: '#38bdf8' },
              { val: totalCats, suffix: '', label: 'Subject tracks', color: '#fbbf24' },
            ].map(({ val, suffix, label, color }, i) => (
              <Reveal key={label} delay={i * 80}>
                <div
                  className="border border-white/8 bg-white/3 rounded-2xl p-6 hover:bg-white/6 transition-all"
                  style={{ ['--glow-color' as string]: color } as React.CSSProperties}
                >
                  <div className="font-display text-4xl font-800 mb-1" style={{ color }}>
                    <Counter to={val} suffix={suffix} />
                  </div>
                  <div className="text-xs text-white/30 font-mono-dm uppercase tracking-wider">{label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            NEWSLETTER CARD
        ════════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-12 py-4">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="relative overflow-hidden border border-violet-500/20 bg-white/3 rounded-3xl p-6 md:p-8">
                <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-violet-500/10 via-transparent to-teal-500/10" />
                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono-dm text-violet-300 uppercase tracking-widest mb-3">Coming soon</p>
                    <h3 className="font-display text-2xl md:text-3xl text-white leading-[1.15]">
                      Newsletter Service coming soon for free.
                    </h3>
                  </div>
                  <p className="text-sm text-white/35 max-w-md leading-relaxed">
                    Curated system design updates, new content drops, and interview prep notes delivered in one simple newsletter.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SUBJECT TRACKS — fully dynamic
        ════════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-12 py-16">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="mb-12">
                <p className="text-xs font-mono-dm text-white/30 uppercase tracking-widest mb-3">What's inside</p>
                <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-[1.18] pb-[0.06em]">
                  {totalCats} tracks.<br />
                  <span className="text-white/30">Every layer of the stack.</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {orderedCats.map((cat, i) => {
                const cfg = getCfg(cat);
                const articles = CATEGORIES[cat] ?? [];
                const withQuiz = articles.filter(a => a.hasPractice).length;
                const withMap = articles.filter(a => a.hasMindmap).length;
                const firstSlug = articles[0]?.slug;
                const isHovered = hoveredCat === cat;

                return (
                  <Reveal key={cat} delay={i * 60}>
                    <Link href={`/docs/${firstSlug}`}>
                      <div
                        className="group relative border rounded-2xl p-6 cursor-pointer transition-all duration-300 overflow-hidden"
                        style={{
                          borderColor: isHovered ? `${cfg.color}40` : 'rgba(255,255,255,0.06)',
                          background: isHovered ? `${cfg.color}08` : 'rgba(255,255,255,0.02)',
                        }}
                        onMouseEnter={() => setHoveredCat(cat)}
                        onMouseLeave={() => setHoveredCat(null)}
                      >
                        {/* Glow on hover */}
                        <div
                          className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `radial-gradient(ellipse at 20% 50%, ${cfg.color}12, transparent 70%)`,
                            opacity: isHovered ? 1 : 0,
                          }}
                        />

                        <div className="relative flex items-start justify-between gap-4">
                          <div className="flex-1">
                            {/* Icon + label */}
                            <div className="flex items-center gap-2.5 mb-3">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ background: `${cfg.color}20`, color: cfg.color }}
                              >
                                {cfg.icon}
                              </div>
                              <span className="text-xs font-mono-dm uppercase tracking-widest" style={{ color: cfg.color }}>
                                {cat}
                              </span>
                            </div>

                            {/* Articles preview */}
                            <div className="space-y-1 mb-4">
                              {articles.slice(0, 3).map(a => (
                                <p key={a.slug} className="text-sm text-white/40 truncate group-hover:text-white/60 transition-colors">
                                  → {a.title}
                                </p>
                              ))}
                              {articles.length > 3 && (
                                <p className="text-xs text-white/20 font-mono-dm">
                                  +{articles.length - 3} more articles
                                </p>
                              )}
                            </div>

                            {/* Badges */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs border border-white/10 text-white/30 px-2 py-0.5 rounded-full font-mono-dm">
                                {articles.length} articles
                              </span>
                              {withQuiz > 0 && (
                                <span className="text-xs px-2 py-0.5 rounded-full font-mono-dm" style={{ background: `${cfg.color}15`, color: cfg.color }}>
                                  {withQuiz} quizzes
                                </span>
                              )}
                              {withMap > 0 && (
                                <span className="text-xs border border-white/8 text-white/25 px-2 py-0.5 rounded-full font-mono-dm">
                                  {withMap} maps
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Arrow */}
                          <ArrowRight
                            className="w-4 h-4 shrink-0 mt-1 transition-all duration-300"
                            style={{
                              color: isHovered ? cfg.color : 'rgba(255,255,255,0.15)',
                              transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            FEATURE TRIPTYCH
        ════════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-12 py-20">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="text-xs font-mono-dm text-white/30 uppercase tracking-widest mb-3">How it works</p>
              <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight mb-14 leading-[1.18] pb-[0.06em]">
                Three ways to learn.<br />
                <span className="text-white/25">One place to master.</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  num: '01',
                  color: '#a78bfa',
                  icon: <BookOpen className="w-6 h-6" />,
                  title: 'Read deep articles',
                  desc: `${totalArticles} articles written to build real intuition — not just surface definitions. Code examples, diagrams, real-world tradeoffs.`,
                  cta: 'Browse articles',
                  href: '/home',
                },
                {
                  num: '02',
                  color: '#fbbf24',
                  icon: <Target className="w-6 h-6" />,
                  title: 'Practice until it sticks',
                  desc: `${totalPractice} quiz sets from Easy to Hard. Self-assess with expandable answers. Progress saved automatically — come back anytime.`,
                  cta: 'Start a quiz',
                  href: `/practice/${MANIFEST.find(a => a.hasPractice)?.slug}`,
                },
                {
                  num: '03',
                  color: '#38bdf8',
                  icon: <Network className="w-6 h-6" />,
                  title: 'See the full picture',
                  desc: `${totalMindmaps} interactive mind maps that show how concepts connect. Understand the system, not just the parts.`,
                  cta: 'View a mind map',
                  href: `/mindmap/${MANIFEST.find(a => a.hasMindmap)?.slug}`,
                },
              ].map(({ num, color, icon, title, desc, cta, href }, i) => (
                <Reveal key={num} delay={i * 100}>
                  <div
                    className="group relative border border-white/6 bg-white/2 rounded-2xl p-7 hover:bg-white/4 hover:border-white/10 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, color }}>
                        {icon}
                      </div>
                      <span className="font-mono-dm text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors">{num}</span>
                    </div>
                    <h3 className="font-display text-xl text-white mb-3 leading-[1.15]">{title}</h3>
                    <p className="text-sm text-white/35 leading-relaxed mb-6 flex-1">{desc}</p>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1.5 text-xs font-mono-dm uppercase tracking-wider transition-all group-hover:gap-2.5"
                      style={{ color }}
                    >
                      {cta} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            INTERVIEW PROMPT TEASER
        ════════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-12 py-16">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="relative border border-violet-500/20 bg-violet-500/5 rounded-3xl p-8 md:p-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-xs font-mono-dm text-violet-400 uppercase tracking-widest mb-3">Hidden feature</p>
                    <h3 className="font-display text-3xl md:text-4xl text-white mb-4 leading-[1.2] pb-[0.05em]">
                      Generate interview questions<br />with one click.
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-6">
                      Every article has a button that copies a detailed AI prompt — crafted to generate 15 senior-engineer-level questions with hidden intent, follow-ups, and trap questions. Paste into any LLM.
                    </p>
                    <Link
                      href="/home"
                      className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/20"
                    >
                      Find it in any article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Fake prompt preview */}
                  <div className="bg-[#0d0d1a] border border-white/8 rounded-2xl p-5 font-mono-dm text-xs leading-relaxed">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      <span className="ml-2 text-white/20 text-[10px]">interview-prompt.txt</span>
                    </div>
                    <p className="text-violet-300/80 mb-2">You are a senior engineering interviewer at Google...</p>
                    <p className="text-white/30 mb-2">Generate 15 questions on <span className="text-teal-400">"{MANIFEST[0]?.title}"</span>.</p>
                    <p className="text-white/20 mb-2">Each question must include:</p>
                    <p className="text-white/15 pl-2">→ Hidden interviewer intent</p>
                    <p className="text-white/15 pl-2">→ Key points a strong answer covers</p>
                    <p className="text-white/15 pl-2">→ A follow-up to push deeper</p>
                    <p className="text-white/15 pl-2">→ A common trap candidates fall into</p>
                    <p className="text-white/10 mt-3">NEVER ask "What is X?" ...</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            FINAL CTA
        ════════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-12 py-24 text-center">
          <Reveal>
            <p className="text-xs font-mono-dm text-white/25 uppercase tracking-widest mb-6">No account. No paywall. No excuses.</p>
            <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight mb-8 leading-[1.16] pb-[0.08em]">
              Start learning<br />
              <span className="hero-line">right now.</span>
            </h2>
            <p className="text-white/30 mb-10 text-lg max-w-md mx-auto">
              {totalArticles} articles waiting. Your next interview won't wait.
            </p>
            <Link
              href="/home"
              className="inline-flex items-center gap-3 bg-white text-slate-900 font-semibold text-base px-10 py-4 rounded-2xl hover:bg-violet-50 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 transition-all"
            >
              Open CacheU <ArrowRight className="w-5 h-5" />
            </Link>
          </Reveal>
        </section>

        {/* ════════════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════════════ */}
        {/* <footer className="border-t border-white/5 px-6 md:px-12 py-10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/cacheu_logo.webp" alt="CacheU" className="w-7 h-7 rounded-md opacity-60" />
              <span className="text-white/25 text-sm font-mono-dm">CacheU — built by engineers, for engineers.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/20 font-mono-dm">
              <Link href="/home" className="hover:text-white/50 transition-colors">Library</Link>
              <span>© 2025</span>
            </div>
          </div>
        </footer> */}
        <Footer/>
      </div>

      {/* Keyframe for hero entrance */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}