import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="main" className="wrap flex min-h-[100svh] flex-col items-start justify-center gap-8 py-32">
      <p className="t-label text-mute">Error 404</p>
      <h1 className="t-h1 max-w-[14ch]">
        This page <span className="pill-word bg-blue text-paper">scrolled</span> away.
      </h1>
      <p className="t-lead max-w-[44ch] text-mute">The link may be old, or the page has moved. Let&rsquo;s get you back on track.</p>
      <Button href="/" variant="ink">
        Back to the homepage
      </Button>
    </main>
  );
}
