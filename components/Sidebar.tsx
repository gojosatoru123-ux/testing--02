import { useState, useEffect, useRef } from 'react';
import { ArticleMeta } from '../lib/content-types';
import { CATEGORIES, CATEGORY_ORDER } from '../lib/manifest';
import { ChevronDown, ChevronRight, BookOpen, X, Menu, Zap, Code, LayoutGrid, Target, Network, LayersIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  manifest: ArticleMeta[];
  className?: string;
}

const CATEGORY_COLORS: Record<string, { icon: string }> = {
  'Low Level Design': { icon: 'bg-violet-100 text-violet-600' },
  'High Level Design': { icon: 'bg-teal-100 text-teal-600' },
  'Backend Design': { icon: 'bg-amber-100 text-amber-600' },
  'Web Security': { icon: 'bg-rose-100 text-rose-600' },
  'SEO': { icon: 'bg-green-100 text-green-600' },
  'Design': { icon: 'bg-sky-100 text-sky-600' },
  General: { icon: 'bg-slate-100 text-slate-500' },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Low Level Design': <Code className="w-3.5 h-3.5" />,
  'High Level Design': <LayoutGrid className="w-3.5 h-3.5" />,
  'Backend Design': <Zap className="w-3.5 h-3.5" />,
  'Web Security': <Code className="w-3.5 h-3.5" />,
  'SEO': <Network className="w-3.5 h-3.5" />,
  'Design': <LayersIcon className="w-3.5 h-3.5" />,
};

export function Sidebar({ className }: SidebarProps) {
  const location = usePathname()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const navRef = useRef<HTMLElement>(null);

  // Scroll the active link into view whenever location changes
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const active = nav.querySelector<HTMLElement>('[data-active="true"]');
    if (active) {
      active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [location]);

  const activeSorted = [
    ...CATEGORY_ORDER,
    ...Object.keys(CATEGORIES).filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  function toggleCategory(cat: string) {
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));
  }

  return (
    <aside className={cn('flex flex-col h-full', className)}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-slate-900 text-base tracking-tight">Docs</span>
      </div>

      {/* Nav */}
      <nav ref={navRef} className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {activeSorted.map((category) => {
          const items = CATEGORIES[category];
          if (!items || items.length === 0) return null;
          const isOpen = !collapsed[category];
          const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.General;

          return (
            <div key={category} className="mb-1">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors group uppercase tracking-wider"
              >
                <span className={cn('w-5 h-5 rounded-md flex items-center justify-center shrink-0', colors.icon)}>
                  {CATEGORY_ICONS[category] || <BookOpen className="w-3.5 h-3.5" />}
                </span>
                <span className="flex-1 text-left">{category}</span>
                <span className="text-slate-300 text-xs font-normal normal-case tracking-normal mr-1">
                  {items.length}
                </span>
                {isOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                )}
              </button>

              {isOpen && (
                <div className="ml-2 mt-0.5 mb-2 space-y-0.5 border-l border-slate-100 pl-3">
                  {items.map((item) => {
                    const isDocActive = location === `/docs/${item.slug}`;
                    const isPractice = location === `/practice/${item.slug}`;
                    const isMindmap = location === `/mindmap/${item.slug}`;

                    return (
                      <div key={item.slug}>
                        {/* Article link */}
                        <Link
                          href={`/docs/${item.slug}`}
                          data-active={isDocActive ? 'true' : undefined}
                          className={cn(
                            'flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-all',
                            isDocActive
                              ? 'bg-violet-50 text-violet-700 font-semibold'
                              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
                          )}
                        >
                          <span className="truncate">{item.title}</span>
                        </Link>

                        {/* Sub-links row */}
                        {(item.hasPractice || item.hasMindmap) && (
                          <div className="flex items-center gap-1 ml-2 mb-1 mt-0.5">
                            {item.hasMindmap && (
                              <Link
                                href={`/mindmap/${item.slug}`}
                                className={cn(
                                  'flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full transition-all',
                                  isMindmap
                                    ? 'bg-sky-100 text-sky-700'
                                    : 'text-slate-400 hover:text-sky-600 hover:bg-sky-50'
                                )}
                              >
                                <Network className="w-2.5 h-2.5 shrink-0" />
                                Map
                              </Link>
                            )}
                            {item.hasPractice && (
                              <Link
                                href={`/practice/${item.slug}`}
                                className={cn(
                                  'flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full transition-all',
                                  isPractice
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
                                )}
                              >
                                <Target className="w-2.5 h-2.5 shrink-0" />
                                Quiz
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

// Mobile sidebar wrapper
export function MobileSidebar({ manifest }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 bg-violet-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-violet-700 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-72 bg-white h-full shadow-2xl flex flex-col">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
            <Sidebar manifest={manifest} />
          </div>
        </div>
      )}
    </>
  );
}