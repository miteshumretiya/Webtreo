import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { cases, testimonials, work } from "@/lib/content";

export function generateStaticParams() {
  return work.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = work.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.client} — ${project.title}`;
  const description = cases[slug]?.summary ?? project.title;
  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title, description, url: `/work/${slug}` },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = work.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = work[index];
  const study = cases[slug];
  const quote = testimonials[study.quote];
  const next = work[(index + 1) % work.length];

  return (
    <>
      <main id="main" className="pt-[calc(56px+max(12px,env(safe-area-inset-top))+40px)] lg:pt-[calc(60px+16px+56px)]">
        <article aria-labelledby="case-title">
          <header className="wrap">
            <Link href="/#work" className="group t-label inline-flex min-h-11 items-center gap-2 text-mute hover:text-ink">
              <ArrowIcon className="size-4 rotate-180 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-x-1" />
              All work
            </Link>
            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-6">
              <div className="lg:col-span-8">
                <p className="t-label flex items-center gap-3 text-mute">
                  <span className="inline-block size-2 rounded-[2px] bg-blue" aria-hidden="true" />
                  {project.sector} · {project.year}
                </p>
                <h1 id="case-title" className="t-h1 mt-6 max-w-[14ch]">
                  {project.client}
                </h1>
                <p className="t-h3 mt-4 max-w-[22ch] text-mute">{project.title}.</p>
              </div>
              <div className="lg:col-span-4">
                <p className="t-lead max-w-[42ch]">{study.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Services">
                  {project.services.map((s) => (
                    <li key={s} className="rounded-full border border-ink/12 px-3 py-1.5 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </header>

          <div className="wrap mt-[var(--section-gap)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-paper-2 lg:rounded-[var(--radius-xl)]">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                preload
                sizes="(min-width: 1536px) 1440px, 94vw"
                quality={80}
                className="object-cover object-top"
              />
            </div>
          </div>

          <section aria-labelledby="results-title" className="wrap section">
            <h2 id="results-title" className="sr-only">
              Results
            </h2>
            <dl className="grid gap-3 md:grid-cols-3">
              {study.metrics.map((m, i) => (
                <div
                  key={m.label}
                  data-reveal
                  className={`flex min-h-[200px] flex-col justify-between gap-6 rounded-[var(--radius-lg)] p-6 sm:p-8 ${
                    i === 0 ? "on-blue bg-blue text-paper" : "bg-paper-2"
                  }`}
                >
                  <dt className={`order-2 max-w-[22ch] ${i === 0 ? "text-paper" : "text-mute"}`}>{m.label}</dt>
                  <dd className="order-1 text-[clamp(2.75rem,2rem+3vw,4.5rem)] font-bold leading-none tracking-[-0.05em] stretch-wide">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-[var(--section-gap)] grid gap-12 lg:grid-cols-12 lg:gap-6">
              <div className="lg:col-span-5" data-reveal>
                <h2 className="t-label text-mute">The challenge</h2>
                <p className="t-h4 mt-5 max-w-[34ch] !font-medium !leading-snug">{study.challenge}</p>
              </div>
              <div className="lg:col-span-6 lg:col-start-7" data-reveal>
                <h2 className="t-label text-mute">What we did</h2>
                <ol className="mt-5 grid gap-3">
                  {study.approach.map((a, i) => (
                    <li key={a} className="flex gap-4 rounded-[var(--radius-md)] bg-paper-2 p-5">
                      <span className="t-label grid size-8 shrink-0 place-items-center rounded-[8px] bg-ink text-paper">{i + 1}</span>
                      <span className="pt-1">{a}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <figure className="on-dark mt-[var(--section-gap)] rounded-[var(--radius-lg)] bg-ink p-6 text-paper sm:p-10 lg:rounded-[var(--radius-xl)] lg:p-16" data-reveal>
              <blockquote className="t-h3 max-w-[30ch]">&ldquo;{quote.quote}&rdquo;</blockquote>
              <figcaption className="mt-8 text-mute-dark">
                <span className="font-semibold text-paper">{quote.name}</span> — {quote.role}
              </figcaption>
            </figure>
          </section>
        </article>

        <nav aria-label="Next project" className="wrap pb-[var(--section-y)]">
          <Link
            href={`/work/${next.slug}`}
            className="group grid items-center gap-6 rounded-[var(--radius-lg)] border border-ink/10 p-4 transition-colors hover:border-ink/30 sm:grid-cols-[240px_1fr_auto] sm:p-5"
            data-cursor="Next"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-paper-2">
              <Image src={next.image} alt="" fill sizes="240px" quality={70} className="object-cover object-top" />
            </div>
            <div>
              <p className="t-label text-mute">Next project</p>
              <p className="t-h3 mt-2">{next.client}</p>
              <p className="mt-1 text-mute">{next.title}</p>
            </div>
            <span className="grid size-14 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[-45deg]">
              <ArrowIcon className="size-5" />
            </span>
          </Link>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="t-h4 max-w-[30ch]">Want results like these for your brand?</p>
            <Button href="/#contact">Start a project</Button>
          </div>
        </nav>
      </main>
      <Footer base="/" />
      <MotionRoot />
    </>
  );
}
