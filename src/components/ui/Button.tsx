import type { ReactNode } from "react";
import { RollText } from "./RollText";

type Variant = "blue" | "ink" | "paper" | "ghost" | "ghost-dark";

const variants: Record<Variant, string> = {
  blue: "bg-blue text-paper hover:bg-blue-deep shadow-[var(--shadow-blue)]",
  ink: "bg-ink text-paper hover:bg-ink-2",
  paper: "bg-paper text-ink hover:bg-white",
  ghost: "border border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.03]",
  "ghost-dark": "border border-paper/20 text-paper hover:border-paper/50 hover:bg-paper/[0.06]",
};

const arrowBg: Record<Variant, string> = {
  blue: "bg-paper text-blue",
  ink: "bg-blue text-paper",
  paper: "bg-ink text-paper",
  ghost: "bg-ink text-paper",
  "ghost-dark": "bg-paper text-ink",
};

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Props = {
  href?: string;
  children: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit";
  magnetic?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
};

/** Pill button / link with roll-text hover, arrow chip and optional magnetic pull (desktop only). */
export function Button({
  href,
  children,
  variant = "blue",
  arrow = true,
  className = "",
  type = "button",
  magnetic = true,
  icon,
  disabled,
}: Props) {
  const cls = `group relative inline-flex min-h-12 items-center justify-center gap-3 rounded-full py-1.5 text-[0.9375rem] font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow] duration-300 ${
    arrow ? "pl-6 pr-1.5" : "px-6"
  } ${variants[variant]} ${className}`;

  const inner = (
    <>
      <RollText>{children}</RollText>
      {arrow && (
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[-45deg] ${arrowBg[variant]}`}
        >
          {icon ?? <ArrowIcon className="size-4" />}
        </span>
      )}
    </>
  );

  const magneticAttr = magnetic ? { "data-magnetic": "" } : {};

  if (href) {
    return (
      <a href={href} className={cls} {...magneticAttr}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={`${cls} disabled:opacity-60`} disabled={disabled} {...magneticAttr}>
      {inner}
    </button>
  );
}
