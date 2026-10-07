import { SectionHeader } from "@/components/ui/SectionHeader";
import { steps } from "@/lib/content";

/* tiny pixel-style illustrations, one per step */
const illustrations = [
  // discover: magnifier over a grid
  <svg key="0" viewBox="0 0 120 90" fill="none" aria-hidden="true">
    {Array.from({ length: 24 }, (_, i) => (
      <rect key={i} x={6 + (i % 6) * 18} y={6 + Math.floor(i / 6) * 20} width="10" height="10" rx="2" fill="currentColor" opacity={i === 8 || i === 15 ? 1 : 0.15} />
    ))}
    <circle cx="66" cy="44" r="22" stroke="var(--color-blue)" strokeWidth="6" />
    <path d="M82 60l18 18" stroke="var(--color-blue)" strokeWidth="8" strokeLinecap="round" />
  </svg>,
  // structure: wireframe blocks
  <svg key="1" viewBox="0 0 120 90" fill="none" aria-hidden="true">
    <rect x="4" y="4" width="112" height="14" rx="4" fill="currentColor" opacity=".9" />
    <rect x="4" y="26" width="60" height="36" rx="4" fill="var(--color-blue)" />
    <rect x="70" y="26" width="46" height="16" rx="4" fill="currentColor" opacity=".15" />
    <rect x="70" y="46" width="46" height="16" rx="4" fill="currentColor" opacity=".15" />
    <rect x="4" y="70" width="34" height="16" rx="4" fill="currentColor" opacity=".15" />
    <rect x="43" y="70" width="34" height="16" rx="4" fill="currentColor" opacity=".15" />
    <rect x="82" y="70" width="34" height="16" rx="4" fill="currentColor" opacity=".15" />
  </svg>,
  // design: two concepts, one picked
  <svg key="2" viewBox="0 0 120 90" fill="none" aria-hidden="true">
    <rect x="6" y="14" width="50" height="66" rx="8" fill="currentColor" opacity=".12" transform="rotate(-6 31 47)" />
    <rect x="62" y="8" width="52" height="68" rx="8" fill="var(--color-blue)" transform="rotate(5 88 42)" />
    <path d="M78 42l7 7 14-14" stroke="var(--color-paper)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // build: code brackets
  <svg key="3" viewBox="0 0 120 90" fill="none" aria-hidden="true">
    <rect x="4" y="6" width="112" height="78" rx="10" fill="currentColor" opacity=".9" />
    <path d="M40 30L26 45l14 15M80 30l14 15-14 15" stroke="var(--color-blue)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M66 26L54 64" stroke="var(--color-paper)" strokeWidth="6" strokeLinecap="round" />
  </svg>,
  // launch: rising bars
  <svg key="4" viewBox="0 0 120 90" fill="none" aria-hidden="true">
    {[20, 32, 28, 46, 58, 76].map((h, i) => (
      <rect key={i} x={6 + i * 19} y={86 - h} width="13" height={h} rx="3" fill={i === 5 ? "var(--color-blue)" : "currentColor"} opacity={i === 5 ? 1 : 0.15 + i * 0.12} />
    ))}
    <rect x="104" y="0" width="10" height="10" rx="2" fill="var(--color-blue)" />
  </svg>,
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="pb-[var(--section-y)]">
      <div className="wrap">
        <div className="on-dark rounded-[var(--radius-lg)] bg-ink px-5 py-[var(--section-gap)] text-paper sm:px-8 lg:rounded-[var(--radius-xl)] lg:px-12">
          <SectionHeader
            dark
            index="02"
            label="Process"
            titleId="process-title"
            title={
              <>
                How we work, <span className="text-blue-soft">week by week.</span>
              </>
            }
            intro="Five clear stages, a demo every Friday and a shared board you can check any time. You always know what's next."
          />

          <ol className="mt-[var(--section-gap)] flex flex-col gap-4 lg:gap-6">
            {steps.map((s, i) => (
              <li
                key={s.no}
                data-stack-card
                className="[@media(min-width:1024px)_and_(min-height:720px)]:sticky"
                style={{ top: `calc(var(--nav-h) + 24px + ${i * 18}px)` }}
              >
                <article
                  data-stack-inner
                  className="relative grid origin-top gap-8 overflow-hidden rounded-[var(--radius-lg)] bg-paper p-6 text-ink sm:p-8 md:grid-cols-12 lg:min-h-[360px] lg:gap-6 lg:p-10"
                >
                  <div className="flex flex-col justify-between gap-8 md:col-span-5">
                    <div className="flex items-center gap-3">
                      <span className="t-label rounded-full bg-ink px-3 py-1.5 text-paper">Step {s.no}</span>
                      <span className="t-label rounded-full border border-ink/15 px-3 py-1.5 text-mute">{s.duration}</span>
                    </div>
                    <div>
                      <p
                        aria-hidden="true"
                        className="text-[clamp(4rem,2.5rem+6vw,8rem)] font-bold leading-[0.8] tracking-[-0.06em] text-blue stretch-wide"
                      >
                        {s.no}
                      </p>
                      <h3 className="t-h2 mt-4">{s.title}</h3>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-8 md:col-span-7 lg:pl-8">
                    <div className="flex items-start justify-between gap-6">
                      <p className="t-lead max-w-[46ch] text-mute">{s.text}</p>
                      <div className="hidden w-[120px] shrink-0 text-ink sm:block">{illustrations[i]}</div>
                    </div>
                    <ul className="grid gap-2 sm:grid-cols-3" aria-label={`${s.title} deliverables`}>
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-2.5 rounded-[12px] bg-paper-2 px-4 py-3 text-[0.9375rem] font-medium">
                          <span aria-hidden="true" className="size-2 shrink-0 rounded-[2px] bg-blue" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div data-stack-shade aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink opacity-0" />
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
