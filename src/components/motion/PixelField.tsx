"use client";

import { useEffect, useRef } from "react";

/**
 * Hero "pixel field": a lightweight 2D-canvas grid of squares (the logo's
 * pixels) drifting on a soft wave and blooming around the cursor.
 * - pauses when off-screen or the tab is hidden
 * - draws one static frame for reduced motion
 * - starts after the page is idle so it never competes with LCP
 */
export function PixelField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, fine ? 1.5 : 1.25);

    let w = 0;
    let h = 0;
    let cell = 22;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let visible = true;
    let running = false;
    let last = 0;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: 0, target: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      cell = w < 640 ? 18 : w < 1100 ? 20 : 24;
      cols = Math.ceil(w / cell) + 1;
      rows = Math.ceil(h / cell) + 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      pointer.active += (pointer.target - pointer.active) * 0.08;
      const time = t * 0.00018;
      const radius = Math.max(140, Math.min(w, h) * 0.32);
      for (let j = 0; j < rows; j++) {
        const y = j * cell;
        const fy = y / h;
        for (let i = 0; i < cols; i++) {
          const x = i * cell;
          const fx = x / w;
          // soft diagonal wave, strongest towards the right/bottom edge
          const wave =
            Math.sin(fx * 5.2 + time * 3.1) * 0.5 +
            Math.sin(fy * 4.3 - time * 2.3 + fx * 2.1) * 0.35 +
            Math.sin((fx + fy) * 9.0 + time * 4.7) * 0.15;
          const edge = Math.max(0, fx * 1.25 - 0.45) * (0.55 + fy * 0.6);
          let v = Math.max(0, (wave * 0.5 + 0.5) * edge - 0.18) * 1.5;
          // cursor bloom
          if (pointer.active > 0.01) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < radius) v += (1 - d / radius) ** 2 * 0.9 * pointer.active;
          }
          if (v < 0.04) continue;
          v = Math.min(v, 1);
          const s = cell * (0.18 + 0.52 * v);
          ctx.globalAlpha = 0.15 + v * 0.75;
          ctx.fillStyle = v > 0.9 && (i + j) % 7 === 0 ? "#fbfaf8" : "#2857ff";
          ctx.fillRect(x + (cell - s) / 2, y + (cell - s) / 2, s, s);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      // ~30fps on touch devices to save battery
      if (!fine && t - last < 32) return;
      last = t;
      draw(t);
    };

    const start = () => {
      if (running || reduce || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      if (pointer.x < -9000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      pointer.target = 1;
    };
    const onLeave = () => {
      pointer.target = 0;
    };

    const host = canvas.parentElement ?? canvas;
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(performance.now());
    });
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    const onVis = () => (document.hidden ? stop() : start());

    const boot = () => {
      resize();
      draw(performance.now());
      canvas.style.opacity = "1";
      ro.observe(canvas);
      io.observe(canvas);
      document.addEventListener("visibilitychange", onVis);
      if (fine) {
        host.addEventListener("pointermove", onMove, { passive: true });
        host.addEventListener("pointerleave", onLeave);
      }
      start();
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(boot, { timeout: 1500 })
      : window.setTimeout(boot, 600);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none opacity-0 transition-opacity duration-1000 ${className}`}
    />
  );
}
