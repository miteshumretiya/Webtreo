/** Scroll helpers that work with or without Lenis (Lenis is off for reduced motion). */
export function scrollToHash(hash: string) {
  const target = hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
  if (target === null) return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.2 });
  } else if (typeof target === "number") {
    window.scrollTo({ top: 0 });
  } else {
    target.scrollIntoView();
  }
  if (typeof target !== "number") {
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
  history.replaceState(null, "", hash);
}

export function lockScroll(locked: boolean) {
  const lenis = window.__lenis;
  if (locked) {
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    lenis?.start();
    document.documentElement.style.overflow = "";
  }
}
