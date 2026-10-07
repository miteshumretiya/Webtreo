"use client";

import { useEffect } from "react";

/**
 * Loads the animation engine (GSAP + ScrollTrigger + SplitText + Lenis) as a
 * separate chunk after hydration, so none of it blocks first paint or input.
 * Content is fully visible without it.
 */
export function MotionRoot() {
  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import("./engine").then(({ initMotion }) => {
      if (cancelled) return;
      dispose = initMotion();
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return null;
}
