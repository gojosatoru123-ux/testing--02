'use client';
import { useEffect, useRef } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark-dimmed.css';

// ⚠️  mermaid and svg-pan-zoom both access `window` at module load time.
//     They MUST NOT be imported at the top level — doing so crashes Next.js SSR.
//     They are loaded exclusively via dynamic import() inside useEffect below.

interface MarkdownRendererProps {
  content: string;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface CodeToken {
  type: 'code';
  lang: string;
  text: string;
  raw: string;
}

interface OtherToken {
  type: 'other';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  token: any;
}

type AnnotatedToken = CodeToken | OtherToken;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLangLabel(lang: string): string {
  const labels: Record<string, string> = {
    js: 'JavaScript', javascript: 'JavaScript',
    ts: 'TypeScript', typescript: 'TypeScript',
    jsx: 'JSX', tsx: 'TSX',
    py: 'Python', python: 'Python',
    rb: 'Ruby', ruby: 'Ruby',
    go: 'Go', rs: 'Rust', rust: 'Rust',
    java: 'Java', cs: 'C#', csharp: 'C#',
    cpp: 'C++', c: 'C', php: 'PHP',
    swift: 'Swift', kotlin: 'Kotlin',
    sh: 'Shell', bash: 'Bash', shell: 'Shell', zsh: 'Zsh',
    sql: 'SQL', html: 'HTML', css: 'CSS', scss: 'SCSS', sass: 'Sass',
    json: 'JSON', yaml: 'YAML', yml: 'YAML', xml: 'XML',
    md: 'Markdown', markdown: 'Markdown',
    dockerfile: 'Dockerfile', docker: 'Docker',
    graphql: 'GraphQL', gql: 'GraphQL',
    r: 'R', lua: 'Lua', dart: 'Dart', scala: 'Scala',
    elixir: 'Elixir', haskell: 'Haskell',
    plaintext: 'Plain Text', text: 'Plain Text', mermaid: 'Mermaid',
  };
  return labels[lang.toLowerCase()] ?? lang.toUpperCase();
}

function renderSingleCode(text: string, lang: string): string {
  if (lang === 'mermaid') {
    const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
    // Enlarge icon SVG (expand arrows)
    const enlargeIcon = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1.5 4.5V2A.5.5 0 0 1 2 1.5h2.5M8.5 1.5H11a.5.5 0 0 1 .5.5v2.5M11.5 8.5V11a.5.5 0 0 1-.5.5H8.5M4.5 11.5H2A.5.5 0 0 1 1.5 11V8.5"
        stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    return (
      `<div class="mermaid-wrapper">` +
        `<div class="mermaid-titlebar">` +
          `<div class="mermaid-dots">` +
            `<span class="dot dot-red"></span>` +
            `<span class="dot dot-yellow"></span>` +
            `<span class="dot dot-green"></span>` +
          `</div>` +
          `<span class="mermaid-label">Diagram</span>` +
          `<button class="mermaid-enlarge-btn" data-enlarge="${id}" title="Enlarge diagram">${enlargeIcon}</button>` +
        `</div>` +
        `<div class="mermaid-container" id="${id}"><div class="mermaid">${text}</div></div>` +
      `</div>`
    );
  }

  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language }).value;
  return `<pre class="hljs-pre"><code class="hljs language-${language}">${highlighted}</code></pre>`;
}

function renderTabGroup(codes: CodeToken[]): string {
  const groupId = 'tabgroup-' + Math.random().toString(36).substr(2, 9);

  const tabs = codes.map((c, i) => {
    const label = getLangLabel(c.lang || 'plaintext');
    const active = i === 0 ? 'tab-active' : '';
    return `<button class="code-tab ${active}" data-group="${groupId}" data-index="${i}">${label}</button>`;
  }).join('');

  const panels = codes.map((c, i) => {
    const hidden = i === 0 ? '' : 'style="display:none"';
    const inner = renderSingleCode(c.text, c.lang || 'plaintext');
    return `<div class="code-panel" data-group="${groupId}" data-index="${i}" ${hidden}>${inner}</div>`;
  }).join('');

  return (
    `<div class="code-tab-group" id="${groupId}">` +
      `<div class="code-tab-bar">${tabs}</div>` +
      `<div class="code-tab-panels">${panels}</div>` +
    `</div>`
  );
}

// ─── Build HTML ───────────────────────────────────────────────────────────────

function buildHtml(content: string): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokens: any[] = (marked as any).lexer(content);

  const annotated: AnnotatedToken[] = tokens.map((t) => {
    if (t.type === 'code') {
      return { type: 'code', lang: t.lang ?? 'plaintext', text: t.text, raw: t.raw } as CodeToken;
    }
    return { type: 'other', token: t } as OtherToken;
  });

  const defaultRenderer = new marked.Renderer();
  defaultRenderer.heading = ({ text, depth }) => {
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    return `<h${depth} id="${id}">${text}</h${depth}>`;
  };

  defaultRenderer.table = (token) => {
    const header = token.header
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((cell: any) => `<th>${cell.text}</th>`)
      .join('');
  
    const body = token.rows
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (row: any[]) => `
          <tr>
            ${row.map((cell: any) => `<td>${cell.text}</td>`).join('')}
          </tr>
        `
      )
      .join('');
  
    return `
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>${header}</tr>
          </thead>
  
          <tbody>
            ${body}
          </tbody>
        </table>
      </div>
    `;
  };

  defaultRenderer.code = ({ text, lang }) => renderSingleCode(text, lang ?? 'plaintext');
  const markedWithRenderer = marked.use({ renderer: defaultRenderer });

  let html = '';
  let i = 0;

  while (i < annotated.length) {
    const cur = annotated[i];
    if (cur.type === 'code') {
      const group: CodeToken[] = [cur];
      let j = i + 1;
      while (j < annotated.length && annotated[j].type === 'code') {
        group.push(annotated[j] as CodeToken);
        j++;
      }
      html += group.length === 1
        ? renderSingleCode(group[0].text, group[0].lang)
        : renderTabGroup(group);
      i = j;
    } else {
      html += markedWithRenderer(cur.token.raw) as string;
      i++;
    }
  }

  return html;
}

// ─── Modal pan-zoom manager ───────────────────────────────────────────────────
// We keep one modal in the DOM and reuse it for every enlarge click.
// svgPanZoom type is any because it's loaded dynamically

let modalEl: HTMLDivElement | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let modalPanZoom: any | null = null;

function getOrCreateModal(): HTMLDivElement {
  if (modalEl) return modalEl;

  modalEl = document.createElement('div');
  modalEl.id = 'mermaid-modal-overlay';
  modalEl.innerHTML = `
    <div class="mmo-backdrop"></div>
    <div class="mmo-window">
      <div class="mmo-toolbar">
        <span class="mmo-title">Diagram</span>
        <div class="mmo-controls">
          <button class="mmo-btn" id="mmo-zoom-out" title="Zoom Out">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.4"/>
              <path d="M4 6h4M10.5 10.5l2 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="mmo-btn" id="mmo-zoom-in" title="Zoom In">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.4"/>
              <path d="M6 4v4M4 6h4M10.5 10.5l2 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="mmo-btn" id="mmo-reset" title="Reset View">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7a4.5 4.5 0 1 0 1.35-3.18L2.5 2.5v3h3L4.15 4.18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="mmo-sep"></div>
          <button class="mmo-btn mmo-close" id="mmo-close" title="Close (Esc)">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="mmo-canvas" id="mmo-canvas"></div>
      <div class="mmo-hint">Scroll to zoom · Drag to pan · Double-click to reset</div>
    </div>
  `;
  document.body.appendChild(modalEl);

  // Close handlers
  const close = () => {
    modalEl!.classList.remove('mmo-visible');
    document.body.style.overflow = '';
    if (modalPanZoom) { modalPanZoom.destroy(); modalPanZoom = null; }
    const canvas = document.getElementById('mmo-canvas')!;
    canvas.innerHTML = '';
  };

  modalEl.querySelector('.mmo-backdrop')!.addEventListener('click', close);
  modalEl.querySelector('#mmo-close')!.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (!modalEl?.classList.contains('mmo-visible')) return;
    if (e.key === 'Escape') { close(); return; }
    if (!modalPanZoom) return;
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) { e.preventDefault(); modalPanZoom.zoomIn(); }
    else if ((e.ctrlKey || e.metaKey) && e.key === '-') { e.preventDefault(); modalPanZoom.zoomOut(); }
    else if ((e.ctrlKey || e.metaKey) && e.key === '0') { e.preventDefault(); modalPanZoom.fit(); modalPanZoom.center(); }
  });

  modalEl.querySelector('#mmo-zoom-in')!.addEventListener('click', () => modalPanZoom?.zoomIn());
  modalEl.querySelector('#mmo-zoom-out')!.addEventListener('click', () => modalPanZoom?.zoomOut());
  modalEl.querySelector('#mmo-reset')!.addEventListener('click', () => { modalPanZoom?.fit(); modalPanZoom?.center(); });

  return modalEl;
}

async function openModal(sourceSvg: SVGSVGElement) {
  const modal = getOrCreateModal();
  const canvas = document.getElementById('mmo-canvas')!;

  modal.classList.remove('mmo-visible');
  canvas.innerHTML = '';

  if (modalPanZoom) {
    try { modalPanZoom.destroy(); } catch {}
    modalPanZoom = null;
  }

  const cloned = sourceSvg.cloneNode(true) as SVGSVGElement;
  cloned.removeAttribute('width');
  cloned.removeAttribute('height');
  cloned.style.cssText = 'width:100%;height:100%;display:block;';
  canvas.appendChild(cloned);

  modal.classList.add('mmo-visible');
  document.body.style.overflow = 'hidden';

  // Dynamic import — svg-pan-zoom accesses window at module load, must not be top-level
  const svgPanZoom = (await import('svg-pan-zoom')).default;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      try {
        modalPanZoom = svgPanZoom(cloned, {
          panEnabled: true,
          controlIconsEnabled: false,
          zoomEnabled: true,
          dblClickZoomEnabled: true,
          mouseWheelZoomEnabled: true,
          preventMouseEventsDefault: true,
          zoomScaleSensitivity: 0.25,
          minZoom: 0.05,
          maxZoom: 20,
          fit: true,
          contain: false,
          center: true,
          refreshRate: 'auto',
        });

        modalPanZoom.fit();
        modalPanZoom.center();

        cloned.addEventListener('dblclick', () => {
          modalPanZoom?.fit();
          modalPanZoom?.center();
        });

        // ── Touch support ─────────────────────────
        let lastTouchDistance: number | null = null;
        let lastPanPoint: { x: number; y: number } | null = null;

        cloned.addEventListener('touchstart', (e: TouchEvent) => {
          if (e.touches.length === 1) {
            lastPanPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }
          if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            lastTouchDistance = Math.sqrt(dx * dx + dy * dy);
          }
        }, { passive: false });

        cloned.addEventListener('touchmove', (e: TouchEvent) => {
          if (!modalPanZoom) return;
          if (e.touches.length === 1 && lastPanPoint) {
            const dx = e.touches[0].clientX - lastPanPoint.x;
            const dy = e.touches[0].clientY - lastPanPoint.y;
            modalPanZoom.panBy({ x: dx, y: dy });
            lastPanPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }
          if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (lastTouchDistance) modalPanZoom.zoomBy(dist / lastTouchDistance);
            lastTouchDistance = dist;
          }
          e.preventDefault();
        }, { passive: false });

        cloned.addEventListener('touchend', () => {
          lastTouchDistance = null;
          lastPanPoint = null;
        });

      } catch (e) {
        console.warn('Modal pan-zoom init failed:', e);
      }
    });
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const ref = useRef<HTMLDivElement>(null);

  const html = buildHtml(content);

  useEffect(() => {
    if (!ref.current) return;

    // ── 1. Highlight code blocks ─────────────────────────────────────────────
    ref.current.querySelectorAll<HTMLElement>('pre code:not(.hljs)').forEach((block) => {
      hljs.highlightElement(block);
    });

    // ── 2. Tab switching ─────────────────────────────────────────────────────
    const tabBars = ref.current.querySelectorAll<HTMLElement>('.code-tab-bar');
    const tabClickHandlers: Array<{ el: HTMLElement; fn: EventListener }> = [];

    tabBars.forEach((bar) => {
      const handler: EventListener = (e) => {
        const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.code-tab');
        if (!btn) return;
        const groupId = btn.dataset.group!;
        const idx = btn.dataset.index!;
        ref.current!.querySelectorAll<HTMLButtonElement>(`.code-tab[data-group="${groupId}"]`).forEach((t) => {
          t.classList.toggle('tab-active', t.dataset.index === idx);
        });
        ref.current!.querySelectorAll<HTMLElement>(`.code-panel[data-group="${groupId}"]`).forEach((p) => {
          p.style.display = p.dataset.index === idx ? '' : 'none';
        });
      };
      bar.addEventListener('click', handler);
      tabClickHandlers.push({ el: bar, fn: handler });
    });

    // ── 3. Render Mermaid (dynamic import — never top-level) ─────────────────
    const mermaidEls = ref.current.querySelectorAll<HTMLElement>('.mermaid');

    const renderMermaid = async () => {
      if (!mermaidEls.length) return;

      // Dynamic import: mermaid accesses window at module load → crashes SSR if top-level
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' });

      mermaidEls.forEach((el, idx) => {
        if (!el.id) el.id = 'mermaid-render-' + idx + '-' + Math.random().toString(36).substr(2, 6);
      });
      try {
        await mermaid.run({ nodes: Array.from(mermaidEls) });
      } catch (err) {
        console.warn('Mermaid render error:', err);
      }
      fitMermaidContainers();
      wireEnlargeButtons();
    };

    // ── 4. Fit containers to natural SVG size (no pan-zoom inline) ───────────
    const fitMermaidContainers = (retries = 0) => {
      if (!ref.current) return;
      const containers = ref.current.querySelectorAll<HTMLElement>('.mermaid-container');
      let allDone = true;

      containers.forEach((container) => {
        const svg = container.querySelector('svg');
        if (!svg) { allDone = false; return; }

        let natW = 0, natH = 0;
        const vb = svg.getAttribute('viewBox');
        if (vb) {
          const p = vb.trim().split(/[\s,]+/).map(Number);
          if (p.length === 4) { natW = p[2]; natH = p[3]; }
        }
        if (!natW || !natH) {
          try { const b = svg.getBBox(); natW = b.width; natH = b.height; } catch (_) {}
        }
        if (!natW || !natH) { allDone = false; return; }

        const pad = 24;
        const availableW = (container.clientWidth || 700) - pad * 2;
        const scale = Math.min(1, availableW / natW);
        const renderedW = Math.round(natW * scale);
        const renderedH = Math.round(natH * scale);

        svg.removeAttribute('style');
        svg.setAttribute('width',  String(renderedW));
        svg.setAttribute('height', String(renderedH));
        if (!svg.getAttribute('viewBox')) {
          svg.setAttribute('viewBox', `0 0 ${natW} ${natH}`);
        }

        container.style.cssText = [
          'position:relative',
          'width:100%',
          'overflow:hidden',
          `height:${renderedH + pad * 2}px`,
          'display:flex',
          'align-items:center',
          'justify-content:center',
          'background:#fafafa',
          'background-image:radial-gradient(circle,rgba(0,0,0,0.065) 1px,transparent 1px)',
          'background-size:20px 20px',
          'box-sizing:border-box',
        ].join(';');

        svg.style.cssText = 'display:block;flex-shrink:0;';
      });

      if (!allDone && retries < 6) {
        setTimeout(() => fitMermaidContainers(retries + 1), 200);
      }
    };

    // ── 5. Wire enlarge buttons ──────────────────────────────────────────────
    const enlargeHandlers: Array<{ el: HTMLElement; fn: EventListener }> = [];

    const wireEnlargeButtons = () => {
      if (!ref.current) return;
      ref.current.querySelectorAll<HTMLButtonElement>('.mermaid-enlarge-btn').forEach((btn) => {
        const targetId = btn.dataset.enlarge!;
        const fn: EventListener = () => {
          const container = document.getElementById(targetId);
          if (!container) return;
          const svg = container.querySelector('svg');
          if (!svg) return;
          openModal(svg as SVGSVGElement);
        };
        btn.addEventListener('click', fn);
        enlargeHandlers.push({ el: btn, fn });
      });
    };

    const tid = setTimeout(renderMermaid, 100);

    return () => {
      clearTimeout(tid);
      tabClickHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
      enlargeHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
      if (modalPanZoom) {
        try { modalPanZoom.destroy(); } catch {}
        modalPanZoom = null;
      }
      if (modalEl && modalEl.parentNode) {
        modalEl.parentNode.removeChild(modalEl);
        modalEl = null;
      }
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <>
      <style>{`
        /* ═══════════════════════════════════════════════════════════
           CODE TAB GROUP
        ═══════════════════════════════════════════════════════════ */
        .code-tab-group {
          margin: 1.5rem 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06);
          background: #1c1c1e;
        }
        .code-tab-bar {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 0 12px;
          background: #2c2c2e;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          overflow-x: auto;
          scrollbar-width: none;
          min-height: 40px;
        }
        .code-tab-bar::-webkit-scrollbar { display: none; }
        .code-tab {
          position: relative;
          padding: 0 14px;
          height: 28px;
          display: inline-flex;
          align-items: center;
          font-size: 11.5px;
          font-family: -apple-system, "SF Pro Text", "Helvetica Neue", sans-serif;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: rgba(255,255,255,0.4);
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.15s, background 0.15s;
          outline: none;
          -webkit-font-smoothing: antialiased;
        }
        .code-tab:hover { color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.07); }
        .code-tab.tab-active { color: rgba(255,255,255,0.92); background: rgba(255,255,255,0.11); }
        .code-tab.tab-active::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 50%;
          transform: translateX(-50%);
          width: 60%; height: 2px;
          border-radius: 2px 2px 0 0;
          background: rgba(255,255,255,0.5);
        }
        .code-tab-panels { background: #1c1c1e; }
        .code-tab-panels .hljs-pre {
          margin: 0 !important;
          border-radius: 0 !important;
          border: none !important;
          background: transparent !important;
        }
        .code-tab-panels pre.hljs-pre code { border-radius: 0 !important; }

        /* ═══════════════════════════════════════════════════════════
           MERMAID INLINE WRAPPER
        ═══════════════════════════════════════════════════════════ */
        .mermaid-wrapper {
          margin: 1.5rem 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.09);
          box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 6px 24px rgba(0,0,0,0.08);
          background: #ffffff;
        }
        .mermaid-titlebar {
          display: flex;
          align-items: center;
          height: 38px;
          padding: 0 12px;
          background: linear-gradient(180deg, #f5f5f7 0%, #ebebed 100%);
          border-bottom: 1px solid rgba(0,0,0,0.1);
          user-select: none;
        }
        .mermaid-dots {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-right: 10px;
          flex-shrink: 0;
        }
        .dot {
          width: 12px; height: 12px;
          border-radius: 50%;
          display: block;
          transition: filter 0.15s;
        }
        .dot-red    { background: #ff5f57; border: 0.5px solid rgba(0,0,0,0.12); }
        .dot-yellow { background: #ffbd2e; border: 0.5px solid rgba(0,0,0,0.12); }
        .dot-green  { background: #28c840; border: 0.5px solid rgba(0,0,0,0.12); }
        .mermaid-titlebar:hover .dot { filter: brightness(0.88); }
        .mermaid-label {
          flex: 1;
          text-align: center;
          font-size: 12px;
          font-family: -apple-system, "SF Pro Text", "Helvetica Neue", sans-serif;
          font-weight: 500;
          color: rgba(0,0,0,0.45);
          pointer-events: none;
          -webkit-font-smoothing: antialiased;
        }
        .mermaid-enlarge-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px; height: 24px;
          border: 1px solid rgba(0,0,0,0.13);
          border-radius: 6px;
          background: rgba(255,255,255,0.7);
          color: rgba(0,0,0,0.5);
          cursor: pointer;
          transition: background 0.12s, color 0.12s, transform 0.1s;
          backdrop-filter: blur(4px);
          outline: none;
          flex-shrink: 0;
        }
        .mermaid-enlarge-btn:hover {
          background: rgba(255,255,255,0.95);
          color: rgba(0,0,0,0.8);
          border-color: rgba(0,0,0,0.2);
        }
        .mermaid-enlarge-btn:active { transform: scale(0.92); }

        .mermaid-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          box-sizing: border-box;
          border-radius: 0 0 12px 12px;
        }
        .mermaid-container .mermaid {
          display: contents;
          margin: 0 !important;
          padding: 0 !important;
          line-height: 0;
        }

        /* ═══════════════════════════════════════════════════════════
           MODAL OVERLAY
        ═══════════════════════════════════════════════════════════ */
        #mermaid-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.22s ease;
        }
        #mermaid-modal-overlay.mmo-visible {
          opacity: 1;
          pointer-events: all;
        }
        .mmo-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.62);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .mmo-window {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          width: min(92vw, 1100px);
          height: min(88vh, 780px);
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(0,0,0,0.08),
            0 8px 32px rgba(0,0,0,0.18),
            0 32px 80px rgba(0,0,0,0.22);
          transform: scale(0.96);
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1);
        }
        #mermaid-modal-overlay.mmo-visible .mmo-window {
          transform: scale(1);
        }
        .mmo-toolbar {
          display: flex;
          align-items: center;
          height: 48px;
          padding: 0 16px;
          background: linear-gradient(180deg, #f5f5f7 0%, #ebebed 100%);
          border-bottom: 1px solid rgba(0,0,0,0.1);
          flex-shrink: 0;
          user-select: none;
          gap: 8px;
        }
        .mmo-title {
          flex: 1;
          text-align: center;
          font-size: 13px;
          font-family: -apple-system, "SF Pro Text", "Helvetica Neue", sans-serif;
          font-weight: 500;
          color: rgba(0,0,0,0.5);
          letter-spacing: 0.01em;
          -webkit-font-smoothing: antialiased;
        }
        .mmo-controls {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .mmo-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px; height: 26px;
          border: 1px solid rgba(0,0,0,0.13);
          border-radius: 6px;
          background: rgba(255,255,255,0.7);
          color: rgba(0,0,0,0.55);
          cursor: pointer;
          transition: background 0.12s, color 0.12s, transform 0.1s;
          backdrop-filter: blur(4px);
          outline: none;
        }
        .mmo-btn:hover { background: rgba(255,255,255,0.95); color: rgba(0,0,0,0.8); border-color: rgba(0,0,0,0.2); }
        .mmo-btn:active { transform: scale(0.91); }
        .mmo-close { color: rgba(180,0,0,0.6); }
        .mmo-close:hover { background: #fff0f0; color: #c00; }
        .mmo-sep {
          width: 1px; height: 18px;
          background: rgba(0,0,0,0.12);
          margin: 0 2px;
        }
        .mmo-canvas {
          flex: 1;
          overflow: hidden;
          background: #fafafa;
          background-image: radial-gradient(circle, rgba(0,0,0,0.065) 1px, transparent 1px);
          background-size: 24px 24px;
          cursor: grab;
          position: relative;
        }
        .mmo-canvas:active { cursor: grabbing; }
        .mmo-canvas svg {
          position: absolute;
          inset: 0;
          width: 100% !important;
          height: 100% !important;
          display: block !important;
        }
        .mmo-hint {
          flex-shrink: 0;
          text-align: center;
          font-size: 11px;
          font-family: -apple-system, "SF Pro Text", "Helvetica Neue", sans-serif;
          color: rgba(0,0,0,0.3);
          padding: 7px 0 8px;
          background: linear-gradient(180deg, #f0f0f2 0%, #ebebed 100%);
          border-top: 1px solid rgba(0,0,0,0.07);
          letter-spacing: 0.01em;
          -webkit-font-smoothing: antialiased;
        }
        @media (max-width: 600px) {
          .mmo-window {
            width: 100vw;
            height: 100dvh;
            border-radius: 0;
          }
        }

        /* ═══════════════════════════════════════════════════════════
          TABLE
        ═══════════════════════════════════════════════════════════ */

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin: 1.5rem 0;
          border-radius: 16px;
        }

        .table-wrapper table {
          width: max-content;
          min-width: 100%;
          max-width: none;
        }

        .table-wrapper::-webkit-scrollbar {
          height: 8px;
        }

        .table-wrapper::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.4);
          border-radius: 999px;
        }

        .table-wrapper::-webkit-scrollbar-track {
          background: transparent;
        }

      `}</style>

      <div
        ref={ref}
        className="
          prose prose-slate prose-lg max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-3xl prose-h1:text-slate-900
          prose-h2:text-2xl prose-h2:text-slate-800 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-3 prose-h2:mt-10
          prose-h3:text-xl prose-h3:text-slate-700
          prose-p:text-slate-600 prose-p:leading-relaxed
          prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline
          prose-code:text-violet-700 prose-code:bg-violet-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0
          prose-blockquote:border-l-violet-400 prose-blockquote:bg-violet-50 prose-blockquote:rounded-r-lg prose-blockquote:py-1

          prose-table:min-w-full
          prose-table:border-separate
          prose-table:border-spacing-0
          prose-table:rounded-2xl
          prose-table:border
          prose-table:border-slate-200
          prose-table:overflow-hidden

          prose-th:bg-violet-400
          prose-th:text-white
          prose-th:px-5
          prose-th:py-4
          prose-th:text-left
          prose-th:text-sm
          prose-th:font-semibold
          prose-th:border-b
          prose-th:border-violet-500
          prose-th:whitespace-nowrap

          prose-td:px-5
          prose-td:py-4
          prose-td:text-sm
          prose-td:text-slate-600
          prose-td:border-b
          prose-td:border-slate-100
          prose-td:whitespace-nowrap

          prose-strong:text-slate-900 prose-strong:font-semibold
          prose-ul:text-slate-600 prose-ol:text-slate-600
          prose-li:marker:text-violet-400
        "
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
