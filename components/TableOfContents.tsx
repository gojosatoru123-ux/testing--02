import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;

  const headings: Heading[] = [];
  const slugCount: Record<string, number> = {};

  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;

    // Remove custom ids like {#some-id}
    const rawText = match[2].replace(/\s*\{#.*\}$/, '').trim();

    // Create base slug
    const baseSlug = rawText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    // Ensure unique ids
    const count = slugCount[baseSlug] || 0;
    slugCount[baseSlug] = count + 1;

    const uniqueId = count === 0 ? baseSlug : `${baseSlug}-${count}`;

    headings.push({
      id: uniqueId,
      text: rawText,
      level,
    });
  }

  return headings;
}

export function TableOfContents({
  content,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  const headings = useMemo(
    () => extractHeadings(content),
    [content]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(
          (entry) => entry.isIntersecting
        );

        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);

      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-21 flex flex-col max-h-[calc(100vh-7rem)]">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 shrink-0">
        On this page
      </p>

      <ul className="space-y-1 border-l border-slate-100 overflow-y-auto min-h-0 pb-11">
        {headings.map((h, index) => (
          <li key={`${h.id}-${index}`}>
            <a
              href={`#${h.id}`}
              style={{
                paddingLeft: `${(h.level - 1) * 12 + 16}px`,
              }}
              className={cn(
                'block py-1 text-sm transition-all border-l-2 -ml-px',
                activeId === h.id
                  ? 'border-violet-500 text-violet-700 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-700 hover:border-slate-300'
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}