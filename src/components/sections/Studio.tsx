import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { team } from "@/lib/content";

export function Studio() {
  return (
    <section id="studio" aria-labelledby="studio-title" className="section pt-0">
      <div className="wrap">
        <SectionHeader
          index="06"
          label="Studio"
          titleId="studio-title"
          title={
            <>
              Who are these <span className="text-blue">pixel people?</span>
            </>
          }
          intro="Twelve designers, strategists and engineers who've shipped for startups, scale-ups and household names. Remote-first, overlapping with your time zone."
        />

        <ul className="mt-[var(--section-gap)] grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {team.map((m) => (
            <li key={m.name} data-reveal>
              <article className="group flex h-full flex-col rounded-[var(--radius-lg)] bg-paper-2 p-2.5" data-tilt="5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius-lg)-8px)]" data-clip>
                  <div data-tilt-media data-clip-inner className="absolute -inset-3">
                    <Image
                      src={m.portrait}
                      alt={`Illustrated portrait of ${m.name}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-[scale] duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 px-2.5 pb-2 pt-5">
                  <div>
                    <h3 className="t-h4">{m.name}</h3>
                    <p className="mt-1 text-sm text-mute">{m.role}</p>
                  </div>
                  <ul className="flex flex-wrap gap-1.5" aria-label={`${m.name}'s experience`}>
                    <li className="t-label rounded-full bg-paper px-2.5 py-1.5">{m.years}</li>
                    <li className="t-label rounded-full bg-paper px-2.5 py-1.5">{m.focus}</li>
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-3 grid gap-3 lg:grid-cols-12">
          <article className="on-blue relative flex flex-col justify-between gap-10 overflow-hidden rounded-[var(--radius-lg)] bg-blue p-6 text-paper sm:p-8 lg:col-span-7 lg:p-10" data-reveal>
            <div>
              <h3 className="t-h3 max-w-[18ch]">We assemble a squad around your project.</h3>
              <p className="mt-4 max-w-[46ch] text-paper">
                A strategist, a designer and an engineer at minimum — plus motion, copy or SEO specialists when the work calls
                for it. Same people from kick-off to launch.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <ul className="flex -space-x-3" aria-hidden="true">
                {team.map((m) => (
                  <li key={m.name} className="size-12 overflow-hidden rounded-full ring-4 ring-blue">
                    <Image src={m.portrait} alt="" width={48} height={48} className="size-full object-cover" />
                  </li>
                ))}
              </ul>
              <Button href="#contact" variant="paper">
                Meet your squad
              </Button>
            </div>
          </article>

          <article className="hairline flex flex-col justify-between gap-10 rounded-[var(--radius-lg)] p-6 sm:p-8 lg:col-span-5 lg:p-10" data-reveal>
            <div>
              <p className="t-label text-mute">Webtreo Lab</p>
              <h3 className="t-h3 mt-4 max-w-[16ch]">We train the next generation of web makers.</h3>
            </div>
            <dl className="grid grid-cols-3 gap-4 border-t border-ink/10 pt-6">
              {[
                ["40+", "graduates"],
                ["12", "week program"],
                ["6", "hired in-house"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] font-bold leading-none tracking-[-0.04em] stretch-wide">{v}</dd>
                  <dd className="mt-2 text-sm text-mute">{l}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}
