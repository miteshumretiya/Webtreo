type Style = "wide" | "mono" | "condensed" | "light";

const glyphs: Record<Style, React.ReactNode> = {
  wide: <rect x="2" y="2" width="12" height="12" rx="3" fill="currentColor" />,
  mono: (
    <>
      <rect x="1" y="9" width="6" height="6" fill="currentColor" />
      <rect x="9" y="1" width="6" height="6" fill="currentColor" />
    </>
  ),
  condensed: <path d="M8 1l7 14H1z" fill="currentColor" />,
  light: <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" fill="none" />,
};

const type: Record<Style, string> = {
  wide: "font-bold tracking-[-0.04em] stretch-wide",
  mono: "font-mono font-medium tracking-[-0.02em] uppercase text-[0.95em]",
  condensed: "font-extrabold uppercase tracking-[0.01em] stretch-condensed text-[1.08em]",
  light: "font-light tracking-[-0.02em] stretch-semi",
};

/** Typographic wordmarks for (fictional) client brands — no third-party logos. */
export function ClientLogo({ name, variant }: { name: string; variant: Style }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-[1.375rem] leading-none">
      <svg viewBox="0 0 16 16" className="size-[0.8em] shrink-0" aria-hidden="true">
        {glyphs[variant]}
      </svg>
      <span className={type[variant]}>{name}</span>
    </span>
  );
}
