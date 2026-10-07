import { Button } from "@/components/ui/Button";
import { nav, site } from "@/lib/content";
import { BackToTop, LocalTime, Year } from "./FooterClient";

const serviceLinks = ["Web design", "Development", "Webflow & CMS", "E-commerce", "SEO & CRO"];

/** `base` is "" on the homepage and "/" on sub-pages so section links always resolve. */
export function Footer({ base = "" }: { base?: "" | "/" }) {
  return (
    <footer className="overflow-clip pb-[max(1.5rem,env(safe-area-inset-bottom))]" aria-labelledby="footer-title">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-ink/10 pt-[var(--section-gap)] md:grid-cols-12">
          <div className="col-span-2 md:col-span-12 lg:col-span-5">
            <h2 id="footer-title" className="t-h3 max-w-[14ch]" data-reveal>
              Have a project in mind?
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block break-all text-[clamp(1.375rem,1.1rem+1.2vw,2.25rem)] font-bold tracking-[-0.03em] text-blue underline decoration-blue/25 decoration-2 underline-offset-[6px] transition-colors stretch-wide hover:decoration-blue"
              data-reveal
            >
              {site.email}
            </a>
            <div className="mt-8" data-reveal>
              <Button href={`${base}#contact`} variant="ink">
                Start a project
              </Button>
            </div>
          </div>

          <nav aria-label="Footer" className="col-span-1 md:col-span-4 lg:col-span-2 lg:col-start-7">
            <p className="t-label text-mute">Sitemap</p>
            <ul className="mt-4 grid gap-1">
              {[...nav, { label: "Contact", href: "#contact" }].map((n) => (
                <li key={n.href}>
                  <a href={`${base}${n.href}`} className="inline-flex min-h-10 items-center font-medium transition-colors hover:text-blue">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <p className="t-label text-mute">Services</p>
            <ul className="mt-4 grid gap-1">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a href={`${base}#services`} className="inline-flex min-h-10 items-center font-medium transition-colors hover:text-blue">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <p className="t-label text-mute">Studio</p>
            <ul className="mt-4 grid gap-3 text-mute">
              <li>Remote-first, HQ in Lisbon</li>
              <li>
                Lisbon time <span className="font-semibold text-ink"><LocalTime /></span>
              </li>
              <li>Working across EU &amp; US hours</li>
              <li>
                <a href="/privacy" className="inline-flex min-h-10 items-center font-medium text-ink transition-colors hover:text-blue">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="wrap mt-[var(--section-gap)]">
        <div className="overflow-clip" aria-hidden="true">
          <p
            data-split="chars"
            className="select-none whitespace-nowrap pt-[0.04em] text-center text-[calc((min(100vw,1536px)-2*var(--gutter))/4.62)] font-bold leading-[0.86] tracking-[-0.06em] text-ink stretch-wide"
          >
            webtreo
          </p>
        </div>
        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 border-t border-ink/10 pt-6 text-sm text-mute sm:flex-row sm:items-center">
          <p>
            © <Year /> Webtreo Studio. Designed &amp; built in-house.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
