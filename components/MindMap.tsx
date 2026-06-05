import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { MindNode, MindmapData } from '../lib/content-types';
import { ZoomIn, ZoomOut, Maximize2} from 'lucide-react';

// ─── Constants ───────────────────────────────────────────────────────────────
const EDGE_GAP = [85, 70, 55, 45]; 
const NODE_H = [52, 42, 34, 30]; 
const V_GAP = 18;
const ROOT_EXTRA = 40;

const BRANCH_COLORS = [
  { bg: '#7c3aed', light: '#f5f3ff', text: '#5b21b6', border: '#ddd6fe' }, 
  { bg: '#0d9488', light: '#f0fdfa', text: '#0f766e', border: '#99f6e4' }, 
  { bg: '#0284c7', light: '#f0f9ff', text: '#0369a1', border: '#bae6fd' }, 
  { bg: '#d97706', light: '#fffbeb', text: '#b45309', border: '#fde68a' }, 
  { bg: '#e11d48', light: '#fff1f2', text: '#be123c', border: '#fecdd3' }, 
  { bg: '#059669', light: '#ecfdf5', text: '#047857', border: '#a7f3d0' }, 
  { bg: '#4f46e5', light: '#eef2ff', text: '#4338ca', border: '#c7d2fe' }, 
  { bg: '#c2410c', light: '#fff7ed', text: '#9a3412', border: '#fed7aa' }, 
];

// ─── Utilities ───────────────────────────────────────────────────────────────
function measureText(text: string, depth: number): number {
  const charW = depth === 0 ? 11 : depth === 1 ? 9.5 : 8.5;
  const padding = depth === 0 ? 44 : depth === 1 ? 36 : 28;
  return Math.max(90, Math.ceil(text.length * charW) + padding);
}

function allocH(node: MindNode): number {
  const h = NODE_H[Math.min(node.depth, NODE_H.length - 1)];
  if (!node.children.length) return h + V_GAP;
  const childrenH = node.children.reduce((s, c) => s + allocH(c), 0);
  return Math.max(h + V_GAP, childrenH);
}

function bezierPath(px: number, py: number, pw: number, cx: number, cy: number, cw: number, side: 'left' | 'right' | 'center', childSide: 'left' | 'right') {
  let x1 = side === 'center' ? (childSide === 'right' ? px + pw / 2 : px - pw / 2) : (side === 'right' ? px + pw / 2 : px - pw / 2);
  let x2 = childSide === 'right' ? cx - cw / 2 : cx + cw / 2;
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${py} C ${mx} ${py} ${mx} ${cy} ${x2} ${cy}`;
}

// ─── Layout Logic ────────────────────────────────────────────────────────────
function computeLayout(root: MindNode, collapsed: Set<string>) {
  const result: any[] = [];
  const rootW = measureText(root.text, 0) + ROOT_EXTRA;
  const rootH = NODE_H[0];

  result.push({
    id: root.id, text: root.text, depth: 0, x: 0, y: 0, w: rootW, h: rootH,
    side: 'center', colorIdx: -1, parentId: null, hasChildren: root.children.length > 0,
    isCollapsed: collapsed.has(root.id), visible: true, animX: 0, animY: 0
  });

  const n = root.children.length;
  if (!n) return result;

  const rightBranches = root.children.slice(0, Math.ceil(n / 2));
  const leftBranches = root.children.slice(Math.ceil(n / 2));

  function placeSubtree(node: MindNode, side: 'left' | 'right', parentId: string, px: number, py: number, pw: number, topY: number, totalAllocH: number, colorIdx: number) {
    const depth = node.depth;
    const nH = NODE_H[Math.min(depth, NODE_H.length - 1)];
    const nW = measureText(node.text, depth);
    const dir = side === 'right' ? 1 : -1;
    const gap = EDGE_GAP[Math.min(depth - 1, EDGE_GAP.length - 1)];

    const nx = px + dir * (pw / 2 + gap + nW / 2);
    const ny = topY + totalAllocH / 2 - nH / 2;

    result.push({
      id: node.id, text: node.text, depth, x: nx, y: ny, w: nW, h: nH,
      side, colorIdx, parentId, hasChildren: node.children.length > 0,
      isCollapsed: collapsed.has(node.id), visible: true, animX: px, animY: py
    });

    if (node.children.length) {
      const childrenTotalH = node.children.reduce((s, c) => s + allocH(c), 0);
      let childY = ny + nH / 2 - childrenTotalH / 2;
      for (const child of node.children) {
        const childAlloc = allocH(child);
        placeSubtree(child, side, node.id, nx, ny, nW, childY, childAlloc, colorIdx);
        childY += childAlloc;
      }
    }
  }

  let ry = -rightBranches.reduce((s, b) => s + allocH(b), 0) / 2;
  rightBranches.forEach((b, i) => {
    const alloc = allocH(b);
    placeSubtree(b, 'right', root.id, 0, 0, rootW, ry, alloc, i % BRANCH_COLORS.length);
    ry += alloc;
  });

  let ly = -leftBranches.reduce((s, b) => s + allocH(b), 0) / 2;
  leftBranches.forEach((b, i) => {
    const alloc = allocH(b);
    placeSubtree(b, 'left', root.id, 0, 0, rootW, ly, alloc, (Math.ceil(n / 2) + i) % BRANCH_COLORS.length);
    ly += alloc;
  });

  // Handle visibility for collapsed subtrees
  const queue = result.filter(n => n.isCollapsed).map(n => ({ id: n.id, hX: n.x, hY: n.y }));
  const hiddenIds = new Set<string>();
  let head = 0;
  while(head < queue.length) {
    const { id, hX, hY } = queue[head++];
    result.forEach(child => {
      if (child.parentId === id) {
        child.visible = false;
        child.animX = hX;
        child.animY = hY;
        if (!hiddenIds.has(child.id)) {
          hiddenIds.add(child.id);
          queue.push({ id: child.id, hX, hY });
        }
      }
    });
  }
  return result;
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function MindMap({ data }: { data: MindmapData }) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.8);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const touchDist = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const layout = useMemo(() => computeLayout(data.root, collapsed), [data.root, collapsed]);
  const byId = useMemo(() => new Map(layout.map(n => [n.id, n])), [layout]);

  // Fit to screen logic
  const fitToScreen = useCallback(() => {
    if (!containerRef.current) return;
    const visible = layout.filter(n => n.visible);
    const minX = Math.min(...visible.map(n => n.x - n.w / 2)) - 80;
    const maxX = Math.max(...visible.map(n => n.x + n.w / 2)) + 80;
    const minY = Math.min(...visible.map(n => n.y - n.h / 2)) - 80;
    const maxY = Math.max(...visible.map(n => n.y + n.h / 2)) + 80;

    const { width, height } = containerRef.current.getBoundingClientRect();
    const newZoom = Math.min(1.0, Math.min(width / (maxX - minX), height / (maxY - minY)));
    setZoom(newZoom);
    setPan({ x: -((minX + maxX) / 2) * newZoom, y: -((minY + maxY) / 2) * newZoom });
  }, [layout]);

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as Element).closest('[data-node]')) return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, panX: pan.x, panY: pan.y };
    } else if (e.touches.length === 2) {
      touchDist.current = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPan({
        x: dragStart.current.panX + (e.touches[0].clientX - dragStart.current.x),
        y: dragStart.current.panY + (e.touches[0].clientY - dragStart.current.y)
      });
    } else if (e.touches.length === 2 && touchDist.current) {
      const newDist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
      const zoomFactor = newDist / touchDist.current;
      setZoom(z => Math.max(0.1, Math.min(2.5, z * (zoomFactor > 1 ? 1.05 : 0.95))));
      touchDist.current = newDist;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden bg-slate-50 touch-none"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={e => {
        if ((e.target as Element).closest('[data-node]')) return;
        setIsDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
      }}
      onMouseMove={e => {
        if (!isDragging) return;
        setPan({ x: dragStart.current.panX + (e.clientX - dragStart.current.x), y: dragStart.current.panY + (e.clientY - dragStart.current.y) });
      }}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => { setIsDragging(false); touchDist.current = null; }}
      onWheel={e => setZoom(z => Math.max(0.1, Math.min(2.5, z * (e.deltaY < 0 ? 1.1 : 0.9))))}
    >
      {/* Background Dots */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#cbd5e1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <svg className="absolute inset-0 w-full h-full">
        <g transform={`translate(${(containerRef.current?.clientWidth ?? 0) / 2 + pan.x}, ${(containerRef.current?.clientHeight ?? 0) / 2 + pan.y}) scale(${zoom})`}>
          {/* Edges with smooth curves */}
          {layout.map(node => {
            if (!node.parentId) return null;
            const p = byId.get(node.parentId)!;
            const d = bezierPath(p.visible ? p.x : p.animX, p.visible ? p.y : p.animY, p.w, node.visible ? node.x : node.animX, node.visible ? node.y : node.animY, node.w, p.side, node.side as 'left' | 'right');
            return (
              <path
                key={`e-${node.id}`}
                d={d}
                fill="none"
                stroke={node.colorIdx >= 0 ? BRANCH_COLORS[node.colorIdx].bg : '#94a3b8'}
                strokeWidth={node.depth <= 1 ? 3.5 : 2.5}
                strokeOpacity={mounted && node.visible && p.visible ? 0.35 : 0}
                style={{ transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
              />
            );
          })}

          {/* Nodes with full text and enhanced visuals */}
          {layout.map(node => {
            const isRoot = node.depth === 0;
            const color = node.colorIdx >= 0 ? BRANCH_COLORS[node.colorIdx] : null;
            const displayX = node.visible ? node.x : node.animX;
            const displayY = node.visible ? node.y : node.animY;

            return (
              <g
                key={node.id}
                data-node="true"
                transform={`translate(${displayX}, ${displayY}) scale(${node.visible ? 1 : 0})`}
                style={{ opacity: node.visible ? 1 : 0, transition: 'all 0.4s ease-out' }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (node.hasChildren) setCollapsed(prev => {
                    const next = new Set(prev);
                    if (next.has(node.id)) next.delete(node.id); else next.add(node.id);
                    return next;
                  });
                }}
              >
                {/* Floating Shadow */}
                <rect x={-node.w/2} y={-node.h/2 + 5} width={node.w} height={node.h} rx={14} fill="rgba(0,0,0,0.08)" />
                
                {/* Main Card */}
                <rect
                  x={-node.w/2} y={-node.h/2} width={node.w} height={node.h} rx={isRoot ? 18 : 12}
                  fill={isRoot ? '#1e293b' : node.depth === 1 ? color!.bg : '#ffffff'}
                  stroke={isRoot ? '#0f172a' : node.depth === 1 ? color!.bg : color ? color.border : '#e2e8f0'}
                  strokeWidth={2.5}
                />

                {/* Full, non-truncated text */}
                <text
                  textAnchor="middle" dominantBaseline="central"
                  fill={isRoot || node.depth === 1 ? '#ffffff' : color ? color.text : '#475569'}
                  fontSize={isRoot ? 17 : node.depth === 1 ? 15 : 14}
                  fontWeight={isRoot ? 800 : 600}
                  className="font-sans pointer-events-none"
                >
                  {node.text}
                </text>

                {/* Larger Hit-Area for Collapse Toggle */}
                {node.hasChildren && (
                  <g transform={`translate(${node.side === 'left' ? -node.w/2 - 14 : node.w/2 + 14}, 0)`} className="cursor-pointer">
                    <circle r={12} fill="white" className="opacity-0 hover:opacity-10" />
                    <circle r={9} fill="white" stroke={color ? color.bg : '#cbd5e1'} strokeWidth={2.5} />
                    <path d={node.isCollapsed ? "M -4 0 L 4 0 M 0 -4 L 0 4" : "M -4 0 L 4 0"} stroke={color ? color.bg : '#64748b'} strokeWidth={2.5} strokeLinecap="round" />
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Responsive Glass Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 flex flex-row md:flex-col gap-3 bg-white/60 backdrop-blur-xl border border-white/40 p-2 rounded-2xl shadow-2xl">
        <ControlButton onClick={() => setZoom(z => Math.min(2.5, z * 1.2))} icon={<ZoomIn size={22} />} />
        <ControlButton onClick={() => setZoom(z => Math.max(0.1, z * 0.8))} icon={<ZoomOut size={22} />} />
        <ControlButton onClick={fitToScreen} icon={<Maximize2 size={22} />} />
      </div>
    </div>
  );
}

function ControlButton({ onClick, icon }: { onClick: () => void, icon: React.ReactNode }) {
  return (
    <button onClick={onClick} className="w-12 h-12 flex items-center justify-center rounded-xl text-slate-700 hover:bg-white/80 active:scale-95 transition-all">
      {icon}
    </button>
  );
}