import { useEffect, useRef } from 'react';
import styles from './BrushStroke.module.css';

/**
 * Coup de pinceau vert dessiné sur canvas : bords déchirés, poils effilochés, traînées sèches.
 * Se révèle de gauche à droite à l'ouverture ; image fixe si prefers-reduced-motion.
 * Géométrie déterministe (même tracé à chaque rendu).
 */

const INK = '#111315';
const GREEN = '#10f25a';

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Brush { path: Path2D; streaks: { x: number; y: number; w: number; h: number }[]; x1: number }

/** Coup de pinceau vert aux bords irréguliers, avec traînées sèches. Géométrie déterministe. */
function buildBrush(x0: number, x1: number, y0: number, y1: number): Brush {
  const r = rng(5);
  const path = new Path2D();
  const bh = y1 - y0;
  const wob = (x: number, ph: number) => Math.sin(x * 0.011 + ph) * 0.35 + Math.sin(x * 0.037 + ph * 2) * 0.2 + Math.sin(x * 0.09 + ph * 3) * 0.1;
  const p1 = r() * 6, p2 = r() * 6;
  const step = 7;
  const top: [number, number][] = [], bot: [number, number][] = [];
  for (let x = x0; x <= x1; x += step) {
    top.push([x, y0 + wob(x, p1) * bh * 0.16 + (r() - 0.5) * 3]);
    bot.push([x, y1 + wob(x, p2) * bh * 0.16 + (r() - 0.5) * 3]);
  }
  // bords gauche (dentelé) et droit (effiloché)
  path.moveTo(top[0][0], top[0][1]);
  for (const [x, y] of top) path.lineTo(x, y);
  const rightEdge = bot[bot.length - 1][0];
  const bristles = 16;
  for (let k = 0; k < bristles; k++) {
    const yy = top[top.length - 1][1] + ((bot[bot.length - 1][1] - top[top.length - 1][1]) * k) / bristles;
    const len = 6 + r() * 70 * (0.3 + Math.abs(Math.sin(k * 1.7)));
    path.lineTo(rightEdge - 18 + r() * 10, yy);
    path.lineTo(rightEdge + len, yy + (bh / bristles) * 0.35);
    path.lineTo(rightEdge - 12, yy + (bh / bristles) * 0.7);
  }
  for (let i = bot.length - 1; i >= 0; i--) path.lineTo(bot[i][0], bot[i][1]);
  for (let k = 0; k < 12; k++) {
    const yy = bot[0][1] - ((bot[0][1] - top[0][1]) * k) / 12;
    path.lineTo(x0 + r() * 22 - (k % 2 ? 0 : 14), yy);
  }
  path.closePath();
  const streaks: Brush['streaks'] = [];
  for (let i = 0; i < 34; i++) {
    const sw = 30 + r() * 220;
    streaks.push({ x: x0 + r() * (x1 - x0 - sw * 0.5), y: y0 + 4 + r() * (bh - 8), w: sw, h: 1 + r() * 1.8 });
  }
  return { path, streaks, x1: rightEdge + 90 };
}

export function BrushStroke() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1;
    let brush: Brush | null = null;
    let raf = 0;
    const t0 = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const vh = Math.min(h, window.innerHeight);
      if (w < 760) brush = buildBrush(-20, w * 0.86, vh * 0.56, vh * 0.68);
      else if (w < 1100) brush = buildBrush(w * 0.02, w * 0.78, vh * 0.58, vh * 0.72);
      else brush = buildBrush(w * 0.04, w * 0.58, vh * 0.56, vh * 0.78);
    };

    const draw = (now: number) => {
      const el = reduce ? 1e6 : now - t0;
      const prog = Math.min(1, Math.max(0, (el - 350) / 1300));
      const front = (brush ? brush.x1 : w) * (1 - Math.pow(1 - prog, 3));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (brush && prog > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, front, h);
        ctx.clip();
        ctx.fillStyle = GREEN;
        ctx.fill(brush.path);
        ctx.fillStyle = INK;
        ctx.globalAlpha = 0.55;
        for (const s of brush.streaks) ctx.fillRect(s.x, s.y, s.w, s.h);
        ctx.restore();
      }
      return prog;
    };

    const loop = (now: number) => {
      const p = draw(now);
      if (p < 1) raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) draw(0); else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => { resize(); draw(reduce ? 0 : performance.now()); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />;
}
