/** Hover micro-interaction: the label rolls up and a duplicate rolls in from below. */
export function RollText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}
