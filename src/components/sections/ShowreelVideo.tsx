"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted, looping showreel. It only starts loading/playing when it comes into
 * view, pauses off-screen, never autoplays with reduced motion, and always
 * has a visible play/pause control (WCAG 2.2.2).
 */
export function ShowreelVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) userPaused.current = true;
    // attach the poster only when the reel approaches the viewport (it's far below the fold)
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        video.poster = "/media/video/showreel-poster.webp";
        near.disconnect();
      },
      { rootMargin: "800px 0px" },
    );
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) video.play().catch(() => {});
        else if (!entry.isIntersecting) video.pause();
      },
      { threshold: 0.25 },
    );
    near.observe(video);
    io.observe(video);
    return () => {
      near.disconnect();
      io.disconnect();
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 size-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        width={1280}
        height={720}
        aria-label="Webtreo showreel: six recent client websites scrolling in a browser window"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src="/media/video/showreel.webm" type="video/webm" />
        <source src="/media/video/showreel.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        className="group absolute bottom-4 left-4 z-10 inline-flex min-h-11 items-center gap-2.5 rounded-full bg-paper/90 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-ink backdrop-blur transition-colors hover:bg-paper sm:bottom-6 sm:left-6"
      >
        <span className="grid size-8 place-items-center rounded-full bg-ink text-paper">
          {playing ? (
            <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
              <rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
              <path d="M4 2.5v11l9.5-5.5z" fill="currentColor" />
            </svg>
          )}
        </span>
        {playing ? "Pause reel" : "Play reel"}
      </button>
    </>
  );
}
