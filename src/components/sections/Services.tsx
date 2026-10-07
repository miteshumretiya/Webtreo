import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { capabilities, services, team } from "@/lib/content";

const chipStyles = [
  "bg-paper text-blue",
  "border border-paper/40 text-paper",
  "bg-ink text-paper",
  "bg-blue-deep text-paper",
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section">
      <div className="wrap">
        <SectionHeader
          index="01"
          label="Services"
          titleId="services-title"
          title={
            <>
              Web design, <span className="pill-word bg-blue-tint text-blue">minus</span> the headache.
            </>
          }
          intro="One senior team takes you from first workshop to launch day — and keeps improving the site after it ships."
        />

        {/* ── bento ── */}
        <div className="mt-[var(--section-gap)] grid gap-3 md:grid-cols-2 lg:grid-cols-12">
          <article className="on-dark flex min-h-[300px] flex-col justify-between gap-10 rounded-[var(--radius-lg)] bg-ink p-6 text-paper sm:p-8 lg:col-span-5" data-reveal>
            <div className="flex flex-col-reverse items-start gap-4 lg:flex-row lg:justify-between lg:gap-6">
              <h3 className="t-h3 max-w-[13ch]">Senior people, start to finish.</h3>
              <span className="t-label shrink-0 rounded-full border border-paper/20 px-3 py-1.5 text-mute-dark">Team</span>
            </div>
            <div>
              <ul className="flex -space-x-3" aria-label="Webtreo team">
                {team.map((m) => (
                  <li key={m.name} className="size-14 overflow-hidden rounded-[14px] ring-4 ring-ink">
                    <Image src={m.portrait} alt={m.name} width={56} height={56} className="size-full object-cover" />
                  </li>
                ))}
                <li className="t-label grid size-14 place-items-center rounded-[14px] bg-blue text-paper ring-4 ring-ink">+8</li>
              </ul>
              <p className="mt-6 max-w-[40ch] text-paper/75">
                The people you meet on the first call are the people who design and build your site. No account managers, no
                hand-offs to juniors.
              </p>
            </div>
          </article>

          <article
            className="on-blue relative flex min-h-[300px] flex-col justify-between gap-10 overflow-hidden rounded-[var(--radius-lg)] bg-blue p-6 text-paper sm:p-8 md:col-span-1 lg:col-span-7"
            data-reveal
          >
            <div className="flex flex-col-reverse items-start gap-4 lg:flex-row lg:justify-between lg:gap-6">
              <h3 className="t-h3 max-w-[16ch]">A full-cycle approach to your website.</h3>
              <span className="t-label shrink-0 rounded-full bg-blue-deep px-3 py-1.5">10 disciplines</span>
            </div>
            <ul className="flex flex-wrap gap-2 sm:gap-2.5" aria-label="Capabilities">
              {capabilities.map((c, i) => (
                <li
                  key={c}
                  className={`rounded-full px-4 py-2 text-[0.9375rem] font-semibold transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:rotate-[-3deg] sm:px-5 sm:py-2.5 sm:text-base ${chipStyles[i % chipStyles.length]}`}
                  style={{ rotate: `${[-3, 2, -1, 3, -2, 1, 0, -3, 2, -1][i]}deg` }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </article>

          <article className="flex min-h-[260px] flex-col justify-between gap-8 rounded-[var(--radius-lg)] bg-paper-2 p-6 sm:p-8 lg:col-span-4" data-reveal>
            <h3 className="t-h4 max-w-[18ch]">Performance is a feature, not a phase.</h3>
            <div className="flex items-end justify-between gap-4">
              <div className="relative size-28 shrink-0">
                <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-paper-3)" strokeWidth="10" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-blue)" strokeWidth="10" strokeLinecap="round" strokeDasharray="326.7" strokeDashoffset="9.8" />
                </svg>
                <p className="absolute inset-0 grid place-items-center text-3xl font-bold tracking-[-0.04em] stretch-wide">
                  <span data-counter="97">97</span>
                </p>
              </div>
              <dl className="grid gap-1.5 text-right text-sm text-mute">
                <div><dt className="inline">LCP </dt><dd className="inline font-semibold text-ink">0.9s</dd></div>
                <div><dt className="inline">CLS </dt><dd className="inline font-semibold text-ink">0.01</dd></div>
                <div><dt className="inline">INP </dt><dd className="inline font-semibold text-ink">64ms</dd></div>
              </dl>
            </div>
          </article>

          <article className="hairline flex min-h-[260px] flex-col justify-between gap-8 rounded-[var(--radius-lg)] p-6 sm:p-8 lg:col-span-4" data-reveal>
            <h3 className="t-h4 max-w-[18ch]">Your team edits everything. Safely.</h3>
            <div className="grid gap-2" aria-hidden="true">
              {[
                ["Homepage hero", true],
                ["Pricing table", true],
                ["Case study: Voltline", false],
              ].map(([label, on]) => (
                <div key={label as string} className="flex items-center justify-between rounded-[12px] bg-paper-2 px-4 py-3 text-sm">
                  <span className="font-medium">{label}</span>
                  <span className={`flex h-5 w-9 items-center rounded-full p-0.5 ${on ? "justify-end bg-blue" : "bg-paper-3"}`}>
                    <span className="size-4 rounded-full bg-paper shadow-sm" />
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="flex min-h-[260px] flex-col justify-between gap-8 rounded-[var(--radius-lg)] bg-paper-2 p-6 sm:p-8 md:col-span-2 lg:col-span-4" data-reveal>
            <h3 className="t-h4 max-w-[18ch]">Fixed fee. Demo every Friday.</h3>
            <ol className="grid max-w-[420px] grid-cols-6 gap-1.5" aria-label="Six-week timeline">
              {["W1", "W2", "W3", "W4", "W5", "W6"].map((w, i) => (
                <li
                  key={w}
                  className={`t-label grid aspect-square place-items-center rounded-[10px] ${
                    i < 4 ? "bg-ink text-paper" : i === 4 ? "bg-blue text-paper" : "border border-ink/15 text-mute"
                  }`}
                >
                  {w}
                </li>
              ))}
            </ol>
          </article>
        </div>

        {/* ── service list with cursor-following preview (desktop) ── */}
        <div data-follow-root className="relative mt-[var(--section-gap)]">
          <ul className="border-t border-ink/10">
            {services.map((s) => (
              <li key={s.no} data-follow-item className="group border-b border-ink/10" data-reveal>
                <div className="grid gap-4 py-8 transition-[padding] duration-500 ease-[var(--ease-out-expo)] md:grid-cols-12 md:gap-6 lg:py-10 md:group-hover:pl-4">
                  <p className="t-label pt-2 text-mute md:col-span-1">{s.no}</p>
                  <h3 className="t-h3 transition-colors duration-300 group-hover:text-blue md:col-span-5">{s.title}</h3>
                  <div className="md:col-span-6">
                    <p className="max-w-[52ch] text-mute">{s.text}</p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${s.title} includes`}>
                      {s.tags.map((t) => (
                        <li key={t} className="rounded-full border border-ink/12 px-3 py-1 text-sm">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div
            data-follow-media
            aria-hidden="true"
            className="pointer-events-none invisible absolute left-0 top-0 z-10 hidden aspect-[4/3] w-[300px] overflow-hidden rounded-[var(--radius-md)] shadow-[var(--shadow-lift)] [@media(hover:hover)_and_(pointer:fine)]:block"
          >
            {services.map((s) => (
              <Image
                key={s.no}
                data-follow-img
                src={s.image}
                alt=""
                fill
                sizes="300px"
                quality={70}
                className="object-cover object-top"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
