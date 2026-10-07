import { markPaths } from "@/components/brand/Logo";

/**
 * Pure-CSS intro (≈1.35s total). It never depends on JavaScript, so it can't
 * get stuck — the curtain always lifts on its own. The motion engine reads
 * the curtain's animation clock to sync the hero reveal.
 */
export function Preloader() {
  const pieces = [
    { d: markPaths.ink, fill: "var(--color-paper)", delay: "0s" },
    { d: markPaths.blue, fill: "var(--color-blue)", delay: "0.08s" },
    { d: markPaths.px1, fill: "var(--color-blue)", delay: "0.2s" },
    { d: markPaths.px2, fill: "var(--color-blue)", delay: "0.3s" },
  ];

  return (
    <div className="preloader on-dark" aria-hidden="true" data-preloader>
      <svg viewBox="0 0 613 479" className="w-[88px] sm:w-[112px]" fill="none">
        {pieces.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill={p.fill}
            className="preloader__px"
            style={{ animationDelay: p.delay, transformBox: "fill-box", transformOrigin: "50% 100%" }}
          />
        ))}
      </svg>
      <div className="wrap absolute inset-x-0 bottom-0 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="flex items-end justify-between gap-6">
          <p className="t-label text-mute-dark">Webtreo — web design studio</p>
          <p className="preloader__count text-[clamp(3rem,2rem+5vw,7rem)] font-bold leading-[0.8] tracking-[-0.05em] stretch-wide tabular-nums" />
        </div>
        <div className="mt-5 h-px w-full bg-ink-3">
          <div className="preloader__bar h-px w-full bg-blue" />
        </div>
      </div>
    </div>
  );
}
