import { metrics, testimonials } from "@/lib/content";

export function Numbers() {
  return (
    <section aria-labelledby="numbers-title" className="section overflow-clip pt-0">
      <div className="wrap">
        <h2 id="numbers-title" className="sr-only">
          Results in numbers and words from our clients
        </h2>
        <div className="grid gap-y-2" aria-hidden="true">
          <p className="t-display flex flex-wrap items-baseline gap-x-[0.25em]" data-split>
            164 websites
          </p>
          <p className="t-display flex flex-wrap items-center gap-x-[0.25em] text-blue lg:pl-[12%]" data-split>
            38 industries
          </p>
        </div>

        <dl className="mt-[var(--section-gap)] grid grid-cols-2 gap-x-3 gap-y-10 border-t border-ink/10 pt-10 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} data-reveal>
              <dt className="sr-only">{m.label}</dt>
              <dd className="text-[clamp(2.5rem,1.9rem+2.6vw,4.5rem)] font-bold leading-none tracking-[-0.05em] stretch-wide tabular-nums">
                <span data-counter={m.value} data-decimals={m.decimals ?? 0}>
                  {m.decimals ? m.value.toFixed(m.decimals) : m.value}
                </span>
                <span className="text-blue">{m.suffix}</span>
              </dd>
              <dd className="mt-3 max-w-[22ch] text-mute" aria-hidden="true">
                {m.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-[var(--section-gap)]">
        <div className="marquee" style={{ ["--marquee-duration" as string]: "70s" }} data-cursor-media>
          {[0, 1].map((dup) => (
            <ul key={dup} className="marquee__track items-stretch gap-3 pr-3" aria-hidden={dup === 1 || undefined}>
              {testimonials.map((t, i) => (
                <li key={t.name} className="flex">
                  <figure
                    className={`flex w-[min(82vw,420px)] flex-col justify-between gap-8 rounded-[var(--radius-lg)] p-6 sm:p-8 ${
                      i % 3 === 1 ? "on-dark bg-ink text-paper" : i % 3 === 2 ? "on-blue bg-blue text-paper" : "bg-paper-2"
                    }`}
                  >
                    <blockquote className="text-[1.0625rem] leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={`grid size-10 shrink-0 place-items-center rounded-[10px] text-sm font-bold ${
                          i % 3 === 0 ? "bg-ink text-paper" : "bg-paper text-ink"
                        }`}
                      >
                        {t.name
                          .replace("Dr. ", "")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <span>
                        <span className="block font-semibold">{t.name}</span>
                        <span className={`block text-sm ${i % 3 === 0 ? "text-mute" : i % 3 === 1 ? "text-paper/75" : "text-paper"}`}>{t.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
