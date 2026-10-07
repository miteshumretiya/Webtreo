"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { scrollToHash } from "@/lib/scroll";
import { ArrowIcon } from "@/components/ui/Button";

/** Copyright year — prerendered as the build year, corrected on the client if it has rolled over. */
const noop = () => () => {};
export function Year() {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => 2026,
  );
  return <span>{year}</span>;
}

/** Studio local time (Europe/Lisbon) — rendered after mount to avoid hydration drift. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Lisbon" });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="inline-block min-w-[5ch] tabular-nums" aria-live="off">
      {time ?? "--:--"}
    </span>
  );
}

export function BackToTop() {
  return (
    <a
      href="#main"
      onClick={(e) => {
        e.preventDefault();
        scrollToHash("#top");
      }}
      className="group inline-flex min-h-11 items-center gap-2 font-semibold"
    >
      Back to top
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"
      >
        <ArrowIcon className="size-4 -rotate-90" />
      </span>
    </a>
  );
}
