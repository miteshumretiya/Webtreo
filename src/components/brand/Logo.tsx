import type { SVGProps } from "react";

/** Webtreo "wb" monogram, redrawn as clean vector paths from the brand mark. */
export const markPaths = {
  ink: "M0 117L75 117Q109 117 109 151L109 325Q109 331 113.2 335.2L159.8 381.8Q164 386 170 386L225 386Q233 386 238.7 391.7L271.3 424.3Q275.5 428.5 271.3 432.7L232.1 471.9Q225 479 215 479L104 479Q94 479 86.9 471.9L5.7 390.7Q0 385 0 377ZM248 248Q248 245 251 245L356 245Q359 245 359 248L359 353Q359 386 392 386L445 386L445 479L381 479Q367 479 357.1 469.1L253.7 365.7Q248 360 248 352Z",
  blue: "M248 48L353 48Q359 48 359 54L359 129Q359 139 369 139L432 139Q466 139 490 163L532.8 205.8Q554 227 554 257L554 378Q554 388 546.9 395.1L468.7 473.3Q463 479 455 479L445 479L445 233Q445 223 435 223L248 223Z",
  px1: "M480 56Q480 52 484 52L548 52Q552 52 552 56L552 120Q552 124 548 124L484 124Q480 124 480 120Z",
  px2: "M565 3Q565 0 568 0L610 0Q613 0 613 3L613 45Q613 48 610 48L568 48Q565 48 565 45Z",
};

type MarkProps = SVGProps<SVGSVGElement> & {
  /** colour of the "ink" strokes — defaults to currentColor so it adapts to dark surfaces */
  inkColor?: string;
  pixelClassName?: string;
};

export function Mark({ inkColor = "currentColor", pixelClassName, ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 613 479" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path fill={inkColor} d={markPaths.ink} />
      <path fill="var(--color-blue)" d={markPaths.blue} />
      <path className={pixelClassName} fill="var(--color-blue)" d={markPaths.px1} />
      <path className={pixelClassName} fill="var(--color-blue)" d={markPaths.px2} />
    </svg>
  );
}

export function Logo({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-[26px] w-auto" inkColor={onDark ? "var(--color-paper)" : "var(--color-ink)"} />
      <span
        className="text-[1.3125rem] font-bold leading-none tracking-[-0.04em] stretch-wide"
        style={{ color: onDark ? "var(--color-paper)" : "var(--color-ink)" }}
      >
        webtreo
      </span>
    </span>
  );
}
