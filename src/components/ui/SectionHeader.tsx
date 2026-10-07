import type { ReactNode } from "react";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  titleId: string;
  intro?: ReactNode;
  dark?: boolean;
  className?: string;
  aside?: ReactNode;
};

/** Eyebrow + split-reveal heading + intro, on the 12-column grid. */
export function SectionHeader({ index, label, title, titleId, intro, dark, className = "", aside }: Props) {
  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-6 ${className}`}>
      <div className="lg:col-span-8">
        <p className={`t-label mb-5 flex items-center gap-3 lg:mb-7 ${dark ? "text-mute-dark" : "text-mute"}`} data-reveal>
          <span className="inline-block size-2 rounded-[2px] bg-blue" aria-hidden="true" />
          <span>
            ({index}) {label}
          </span>
        </p>
        <h2 id={titleId} className="t-h2 max-w-[18ch]" data-split>
          {title}
        </h2>
      </div>
      {(intro || aside) && (
        <div className="lg:col-span-4" data-reveal>
          {intro && <p className={`t-lead max-w-[42ch] ${dark ? "text-paper/75" : "text-mute"}`}>{intro}</p>}
          {aside}
        </div>
      )}
    </div>
  );
}
