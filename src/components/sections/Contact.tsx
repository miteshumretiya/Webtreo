import Image from "next/image";
import { ContactForm } from "./ContactForm";
import { site } from "@/lib/content";

const nextSteps = [
  "We reply within one working day",
  "A 30-minute intro call to understand your goals",
  "A fixed-price proposal within three days",
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-[var(--section-y)]">
      <div className="wrap">
        <div className="on-dark grid gap-12 rounded-[var(--radius-lg)] bg-ink px-5 py-[var(--section-gap)] text-paper sm:px-8 lg:grid-cols-12 lg:gap-6 lg:rounded-[var(--radius-xl)] lg:px-12">
          <div className="flex flex-col justify-between gap-12 lg:col-span-5">
            <div>
              <p className="t-label mb-5 flex items-center gap-3 text-mute-dark lg:mb-7" data-reveal>
                <span className="inline-block size-2 rounded-[2px] bg-blue" aria-hidden="true" />
                (07) Contact
              </p>
              <h2 id="contact-title" className="t-h2 max-w-[12ch]" data-split>
                Let&rsquo;s start your project right now.
              </h2>
              <ol className="mt-10 grid gap-3" data-reveal>
                {nextSteps.map((s, i) => (
                  <li key={s} className="flex items-center gap-4 text-paper/80">
                    <span className="t-label grid size-8 shrink-0 place-items-center rounded-[8px] border border-paper/15 text-paper">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-center gap-4 rounded-[var(--radius-md)] bg-ink-2 p-4" data-reveal>
              <Image src="/media/team/aria.svg" alt="Aria Novak" width={64} height={64} className="size-16 shrink-0 rounded-[14px]" />
              <div className="min-w-0">
                <p className="font-semibold">Aria Novak</p>
                <p className="text-sm text-mute-dark">Founder · usually replies within 4 hours</p>
                <a href={`mailto:${site.email}`} className="mt-1 inline-block break-all text-sm font-semibold text-blue-soft underline-offset-4 hover:underline">
                  {site.email}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
