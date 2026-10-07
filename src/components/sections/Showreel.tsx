import { ShowreelVideo } from "./ShowreelVideo";

export function Showreel() {
  return (
    <section aria-labelledby="reel-title" className="pb-[var(--section-y)]">
      <div className="wrap mb-8 flex flex-wrap items-end justify-between gap-4 lg:mb-10">
        <p className="t-label flex items-center gap-3 text-mute" data-reveal>
          <span className="inline-block size-2 rounded-[2px] bg-blue" aria-hidden="true" />
          (04) Showreel
        </p>
        <h2 id="reel-title" className="t-h4 max-w-[30ch] text-right max-sm:text-left" data-reveal>
          Six launches in nine seconds.
        </h2>
      </div>
      <div className="mx-auto max-w-[1920px]">
        <div
          data-showreel
          data-cursor-media
          className="relative aspect-[16/9] w-full overflow-hidden bg-ink [clip-path:inset(0_var(--gutter)_round_var(--radius-lg))] max-md:min-h-[240px]"
        >
          <ShowreelVideo />
        </div>
      </div>
    </section>
  );
}
