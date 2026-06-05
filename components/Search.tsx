import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, FileText } from 'lucide-react';
import { ArticleMeta } from '../lib/content-types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SearchProps {
  manifest: ArticleMeta[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Introduction: 'text-violet-600 bg-violet-50',
  Guides: 'text-amber-600 bg-amber-50',
  Reference: 'text-teal-600 bg-teal-50',
  Community: 'text-rose-600 bg-rose-50',
  General: 'text-slate-600 bg-slate-50',
};

export function Search({ manifest }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ArticleMeta[]>([]);
  const [focused, setFocused] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setQuery('');
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIdx(0);
      return;
    }
    const q = query.toLowerCase();
    const filtered = manifest.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
    setResults(filtered);
    setSelectedIdx(0);
  }, [query, manifest]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIdx]) {
      window.location.href = `/docs/${results[selectedIdx].slug}`;
      setQuery('');
    }
  }

  const showDropdown = focused && query.trim().length > 0;

  return (
    <div className="relative w-full max-w-md">
      <div className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-xl border transition-all',
        focused
          ? 'border-violet-300 ring-2 ring-violet-100 bg-white shadow-sm'
          : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
      )}>
        <SearchIcon className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search docs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none min-w-0"
        />
        {query ? (
          <button
            onClick={() => setQuery('')}
            className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 transition-colors"
          >
            <X className="w-3 h-3 text-slate-500" />
          </button>
        ) : (
          <kbd className="hidden sm:flex items-center gap-0.5 text-xs text-slate-400 font-mono bg-slate-200 px-1.5 py-0.5 rounded">
            <span>⌘</span><span>K</span>
          </kbd>
        )}
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50"
        >
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-sm text-slate-400">
              <FileText className="w-6 h-6 mb-2 opacity-40" />
              No results for <strong className="text-slate-600 ml-1">"{query}"</strong>
            </div>
          ) : (
            <ul className="py-1.5 max-h-80 overflow-y-auto">
              {results.map((item, idx) => {
                const colorClass = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.General;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/docs/${item.slug}`}
                      onClick={() => setQuery('')}
                      className={cn(
                        'flex items-start gap-3 px-4 py-2.5 transition-colors',
                        idx === selectedIdx ? 'bg-violet-50' : 'hover:bg-slate-50'
                      )}
                    >
                      <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-900 truncate">{item.title}</div>
                        {item.description && (
                          <div className="text-xs text-slate-400 truncate mt-0.5">{item.description}</div>
                        )}
                      </div>
                      <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full shrink-0', colorClass)}>
                        {item.category}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="px-4 py-2 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><kbd className="font-mono bg-slate-100 px-1 rounded">↑↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="font-mono bg-slate-100 px-1 rounded">↵</kbd> select</span>
            <span className="flex items-center gap-1"><kbd className="font-mono bg-slate-100 px-1 rounded">esc</kbd> close</span>
          </div>
        </div>
      )}
    </div>
  );
}
