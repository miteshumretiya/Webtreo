import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Thanks — we got your brief",
  robots: { index: false, follow: true },
};

export default function Thanks() {
  return (
    <main id="main" className="wrap flex min-h-[100svh] flex-col items-start justify-center gap-8 py-32">
      <span className="grid size-16 place-items-center rounded-[18px] bg-blue text-paper" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="size-8">
          <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h1 className="t-h1 max-w-[14ch]">Thanks — your brief is in.</h1>
      <p className="t-lead max-w-[44ch] text-mute">
        Aria will reply within one working day with a few questions and some times for a 30-minute intro call.
      </p>
      <Button href="/" variant="ink">
        Back to the homepage
      </Button>
    </main>
  );
}
