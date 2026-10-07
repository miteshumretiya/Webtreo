import { ArrowIcon, Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { plans } from "@/lib/content";

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-4 shrink-0 ${className}`} aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section pt-0">
      <div className="wrap">
        <SectionHeader
          index="05"
          label="Pricing"
          titleId="pricing-title"
          title={
            <>
              Two prices. <span className="pill-word bg-ink text-paper">Zero</span> surprises.
            </>
          }
          intro="Fixed scope, fixed fee, paid in three milestones. You'll know the total before we draw a single pixel."
        />

        <div className="mt-[var(--section-gap)] grid gap-3 lg:grid-cols-2">
          {plans.map((p) => {
            const dark = p.featured;
            return (
              <article
                key={p.name}
                data-reveal
                className={`relative flex flex-col gap-10 overflow-hidden rounded-[var(--radius-lg)] p-6 transition-[translate] duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 sm:p-8 lg:rounded-[var(--radius-xl)] lg:p-10 ${
                  dark ? "on-dark bg-ink text-paper" : "hairline bg-paper-2"
                }`}
                aria-labelledby={`plan-${p.name}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <ul className="flex flex-wrap gap-2" aria-label="Best for">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className={`t-label rounded-full px-3 py-1.5 ${dark ? "border border-paper/20 text-mute-dark" : "border border-ink/15 text-mute"}`}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  {dark && <span className="t-label rounded-full bg-blue px-3 py-1.5 text-paper">Most chosen</span>}
                </div>

                <div>
                  <h3 id={`plan-${p.name}`} className="t-h2">
                    {p.name}
                  </h3>
                  <p className={`mt-4 max-w-[40ch] ${dark ? "text-paper/75" : "text-mute"}`}>{p.blurb}</p>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2 sm:gap-x-6">
                  {p.features.map((f, i) => (
                    <li key={f} className={`flex items-start gap-3 text-[0.9375rem] ${i === 0 && dark ? "font-semibold" : ""}`}>
                      <Check className={`mt-[3px] ${dark ? "text-blue-soft" : "text-blue"}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className={`mt-auto flex flex-wrap items-end justify-between gap-6 border-t pt-8 ${dark ? "border-paper/10" : "border-ink/10"}`}>
                  <p>
                    <span className={`t-label block ${dark ? "text-mute-dark" : "text-mute"}`}>From</span>
                    <span className="mt-2 block text-[clamp(2.5rem,1.9rem+2.6vw,4.25rem)] font-bold leading-none tracking-[-0.05em] stretch-wide tabular-nums">
                      $<span data-counter={p.price}>{p.price.toLocaleString("en-US")}</span>
                    </span>
                  </p>
                  <Button href="#contact" variant={dark ? "blue" : "ink"}>
                    {`Choose ${p.name}`}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <div
          data-reveal
          className="mt-3 flex flex-col items-start justify-between gap-4 rounded-[var(--radius-lg)] border border-dashed border-ink/20 p-6 sm:flex-row sm:items-center sm:p-8"
        >
          <p className="t-h4 max-w-[38ch]">
            Already have a site? <span className="text-mute">Care plans start at $900/month — updates, CRO and SEO.</span>
          </p>
          <a href="#contact" className="group inline-flex min-h-11 items-center gap-2 font-semibold text-blue">
            <span className="underline decoration-blue/30 underline-offset-4 transition-colors group-hover:decoration-blue">
              Ask about care plans
            </span>
            <ArrowIcon className="size-4 transition-[translate] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
