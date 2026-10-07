import Image from "next/image";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { ClientLogo } from "@/components/ui/ClientLogo";
import { PixelField } from "@/components/motion/PixelField";
import { clients, heroStats, team } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-[calc(56px+max(12px,env(safe-area-inset-top))+12px)] lg:pt-[calc(60px+16px+16px)]">
      <div className="wrap">
        {/* ── main ink card ── */}
        <div
          data-hero-card
          className="on-dark relative isolate flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-ink text-paper lg:min-h-[min(calc(100svh-268px),780px)] lg:rounded-[var(--radius-xl)]"
        >
          <PixelField className="absolute inset-0 -z-10 size-full" />

          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-5 pt-6 sm:px-8 sm:pt-8 lg:px-12 lg:pt-10" data-hero-fade>
            <div className="flex items-center gap-3">
              <ul className="flex -space-x-2.5" aria-label="Some of our team">
                {team.slice(0, 3).map((m) => (
                  <li key={m.name} className="size-10 overflow-hidden rounded-full ring-2 ring-ink">
                    <Image src={m.portrait} alt={m.name} width={40} height={40} className="size-full object-cover" />
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-snug text-mute-dark">
                <span className="text-paper">Senior team of 12.</span>
                <br />
                No hand-offs, ever.
              </p>
            </div>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-paper/15 px-4 py-2 text-sm text-paper">
              <span className="status-dot size-2 rounded-full bg-blue-soft text-blue-soft" aria-hidden="true" />
              Booking Q1 2027 — 2 slots left
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-end px-5 pb-6 pt-14 sm:px-8 sm:pb-8 sm:pt-20 lg:px-12 lg:pb-12 lg:pt-24">
            <h1 id="hero-title" data-hero-title className="t-display max-w-[15ch] max-sm:[font-stretch:112%]">
              We craft <span className="pill-word bg-blue text-paper">websites</span> people can&rsquo;t{" "}
              <span className="pill-word border-[0.06em] border-paper/35 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                scroll past.
              </span>
            </h1>

            <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-6">
              <p className="t-lead max-w-[46ch] text-paper/80 lg:col-span-6" data-hero-fade>
                Webtreo is an independent studio of designers and engineers. We plan, design and build fast,
                conversion-focused websites for startups and growing brands — then stay to make them better.
              </p>
              <div className="flex flex-wrap items-center gap-3 lg:col-span-6 lg:justify-end" data-hero-fade>
                <Button href="#contact">Start a project</Button>
                <Button href="#work" variant="ghost-dark" arrow={false}>
                  See our work
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── bento row ── */}
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-12">
          <a
            href="#pricing"
            data-hero-fade
            data-cursor="Pricing"
            className="group relative col-span-2 flex min-h-[220px] flex-col justify-between gap-8 overflow-hidden rounded-[var(--radius-lg)] bg-blue p-6 text-paper sm:p-8 md:col-span-12 lg:col-span-6"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="t-label rounded-full bg-blue-deep px-3 py-1.5">Launch Sprint</span>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-paper text-blue transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[-45deg]">
                <ArrowIcon className="size-5" />
              </span>
            </div>
            <div>
              <p className="t-h3 max-w-[16ch]">A complete marketing site in 21 days.</p>
              <p className="mt-3 max-w-[40ch] text-[0.9375rem] text-paper">
                Fixed scope, fixed fee from $7,900. Two kick-off slots left this quarter.
              </p>
            </div>
            <span aria-hidden="true" className="absolute right-[18%] top-[38%] size-6 rounded-[4px] bg-paper/20 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-3 group-hover:translate-x-3" />
            <span aria-hidden="true" className="absolute right-[10%] top-[24%] size-4 rounded-[3px] bg-paper/30 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-5 group-hover:translate-x-5" />
          </a>

          {heroStats.map((s, i) => (
            <div
              key={s.label}
              data-hero-fade
              className={`flex min-h-[180px] flex-col justify-between gap-6 rounded-[var(--radius-lg)] p-5 sm:p-8 md:col-span-6 md:min-h-[220px] lg:col-span-3 ${
                i === 0 ? "bg-paper-2" : "hairline bg-paper"
              }`}
            >
              <p className="t-label text-mute">{i === 0 ? "Since 2016" : "Performance"}</p>
              <div>
                <p className="whitespace-nowrap text-[clamp(2rem,1.1rem+2.6vw,4.5rem)] font-bold leading-none tracking-[-0.05em] stretch-wide tabular-nums">
                  <span data-counter={s.value}>{s.value}</span>
                  {s.suffix && <span className="text-blue">{s.suffix}</span>}
                </p>
                <p className="mt-3 max-w-[24ch] text-sm leading-snug text-mute">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── clients marquee ── */}
        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:gap-10 lg:mt-16">
          <p className="t-label shrink-0 text-mute">Trusted by teams at</p>
          <div className="marquee min-w-0 flex-1" style={{ ["--marquee-duration" as string]: "38s" }}>
            {[0, 1].map((dup) => (
              <ul key={dup} className="marquee__track gap-12 pr-12 text-ink/75" aria-hidden={dup === 1 || undefined}>
                {clients.map((c) => (
                  <li key={c.name}>
                    <ClientLogo name={c.name} variant={c.style} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
