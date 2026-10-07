import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Button";
import { work } from "@/lib/content";

/**
 * Selected work. Without JS (and below 1024px) it's a responsive grid.
 * On desktop the motion engine pins the section and scrolls the track sideways
 * (adds [data-hactive], which switches the layout to a single row).
 */
export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      data-hscroll
      className="group relative pb-[var(--section-y)] data-[hactive]:flex data-[hactive]:h-svh data-[hactive]:flex-col data-[hactive]:justify-center data-[hactive]:overflow-clip data-[hactive]:pb-0"
    >
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="t-label mb-5 flex items-center gap-3 text-mute lg:mb-7" data-reveal>
              <span className="inline-block size-2 rounded-[2px] bg-blue" aria-hidden="true" />
              (03) Selected work
            </p>
            <h2 id="work-title" className="t-h2 max-w-[16ch]" data-split>
              Work that moved the numbers.
            </h2>
          </div>
          <div className="flex w-full max-w-[320px] flex-col gap-3" data-reveal>
            <p className="t-label flex justify-between text-mute">
              <span>{String(work.length).padStart(2, "0")} projects</span>
              <span>2024 — 2026</span>
            </p>
            <div className="hidden h-[3px] overflow-hidden rounded-full bg-paper-3 group-data-[hactive]:block">
              <div data-hscroll-bar className="h-full origin-left scale-x-0 bg-blue" />
            </div>
          </div>
        </div>
      </div>

      <div className="wrap mt-[var(--section-gap)] group-data-[hactive]:mt-10">
        <ul
          data-hscroll-track
          className="grid gap-x-3 gap-y-12 md:grid-cols-2 group-data-[hactive]:flex group-data-[hactive]:w-max group-data-[hactive]:gap-5 group-data-[hactive]:pr-[var(--gutter)]"
        >
          {work.map((p, i) => (
            <li
              key={p.slug}
              data-hscroll-card
              className="group-data-[hactive]:w-[min(38vw,600px,calc((100svh-330px)*1.333))] group-data-[hactive]:shrink-0"
            >
              <Link href={`/work/${p.slug}`} className="group/card block" data-cursor="View">
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-paper-2"
                  data-clip
                >
                  <div data-hscroll-img data-clip-inner className="absolute inset-0 group-data-[hactive]:-inset-x-[4%]">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                      quality={80}
                      className="object-cover object-top transition-[scale] duration-1000 ease-[var(--ease-out-expo)] group-hover/card:scale-[1.04]"
                    />
                  </div>
                  <span className="t-label absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-ink backdrop-blur">
                    {String(i + 1).padStart(2, "0")} — {p.sector}
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="t-h4">{p.client}</h3>
                    <p className="mt-1 text-mute">{p.title}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue-tint px-3 py-1.5 text-sm font-semibold text-blue-deep">
                    {p.result}
                  </span>
                </div>
              </Link>
            </li>
          ))}
          <li
            data-hscroll-card
            className="group-data-[hactive]:flex group-data-[hactive]:w-[min(30vw,460px,calc((100svh-330px)*1))] group-data-[hactive]:shrink-0 md:col-span-2"
          >
            <a
              href="#contact"
              data-cursor="Let's talk"
              className="on-blue group/cta flex min-h-[260px] w-full flex-col justify-between gap-10 rounded-[var(--radius-lg)] bg-blue p-6 text-paper sm:p-8 group-data-[hactive]:aspect-[3/4] group-data-[hactive]:max-h-[calc(100svh-330px+90px)]"
            >
              <p className="t-label">Next up</p>
              <div>
                <p className="t-h3 max-w-[12ch]">Your project could be next.</p>
                <span className="mt-6 inline-flex items-center gap-3 font-semibold">
                  Start a conversation
                  <span className="grid size-10 place-items-center rounded-full bg-paper text-blue transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/cta:rotate-[-45deg]">
                    <ArrowIcon className="size-4" />
                  </span>
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
