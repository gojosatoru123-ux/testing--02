'use client';
import { Sidebar, MobileSidebar } from './Sidebar';
import { MANIFEST } from '../lib/manifest';

export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 min-h-0">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 xl:w-72 shrink-0 border-r border-slate-100 bg-white sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <Sidebar manifest={MANIFEST} className="w-full" />
      </aside>

      {/* Page content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>

      {/* Mobile floating sidebar button */}
      <MobileSidebar manifest={MANIFEST} />
    </div>
  );
}
