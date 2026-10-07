"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { RollText } from "@/components/ui/RollText";
import { ArrowIcon } from "@/components/ui/Button";
import { nav, site } from "@/lib/content";
import { lockScroll, scrollToHash } from "@/lib/scroll";

export function Nav() {
  // on sub-pages, section links point back to the homepage
  const base = usePathname() === "/" ? "" : "/";
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // hide on scroll down, reveal on scroll up; more opaque once past the hero
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;
      const heroEnd = (document.getElementById("top")?.offsetHeight ?? window.innerHeight) - 80;
      setSolid(y > heroEnd);
      if (!openRef.current) {
        if (y < 120) setHidden(false);
        else if (delta > 6) setHidden(true);
        else if (delta < -6) setHidden(false);
      }
      lastY = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    lockScroll(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    // focus once the menu's visibility transition has started (hidden elements can't take focus)
    const first = menuRef.current?.querySelector<HTMLElement>("a,button");
    const focusTimer = window.setTimeout(() => first?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && menuRef.current) {
        const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a,button"));
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) close(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) {
      if (openRef.current) close(false);
      return;
    }
    e.preventDefault();
    if (openRef.current) close(false);
    // wait one frame so the scroll lock is released before scrolling
    requestAnimationFrame(() => scrollToHash(href));
  };

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[max(12px,env(safe-area-inset-top))] transition-transform duration-700 ease-[var(--ease-out-expo)] lg:pt-4 ${
        hidden && !open ? "-translate-y-[130%]" : "translate-y-0"
      }`}
    >
      <div className="wrap">
        <nav
          aria-label="Primary"
          className={`relative z-10 flex h-[56px] items-center justify-between gap-4 rounded-full pl-5 pr-1.5 transition-[background-color,box-shadow] duration-500 lg:h-[60px] lg:pl-6 ${
            open ? "glass !bg-paper" : solid ? "glass !bg-paper/[0.86]" : "glass"
          }`}
        >
          <a href={`${base}#top`} onClick={onNavClick} className="shrink-0 rounded-full" aria-label="Webtreo — back to top">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={`${base}${item.href}`}
                  onClick={onNavClick}
                  className="group flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-ink/[0.05]"
                >
                  <RollText>{item.label}</RollText>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`${base}#contact`}
              onClick={onNavClick}
              data-magnetic=""
              className="group hidden min-h-11 items-center gap-2.5 rounded-full bg-ink py-1 pl-5 pr-1 text-[0.9375rem] font-semibold text-paper transition-colors hover:bg-blue sm:inline-flex"
            >
              <RollText>Start a project</RollText>
              <span className="grid size-9 place-items-center rounded-full bg-blue transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[-45deg] group-hover:bg-paper group-hover:text-blue">
                <ArrowIcon className="size-4" />
              </span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="relative grid size-11 place-items-center rounded-full bg-ink text-paper lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => (open ? close() : setOpen(true))}
            >
              <span
                className={`absolute h-[1.5px] w-[18px] rounded bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-[18px] rounded bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </nav>
      </div>
    </header>

      {/* full-screen mobile menu (outside the transformed header so `fixed` uses the viewport) */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
        className={`on-dark fixed inset-0 z-40 flex h-[100dvh] flex-col bg-ink text-paper transition-[clip-path,visibility] duration-700 ease-[var(--ease-in-out-expo)] lg:hidden ${
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="wrap flex min-h-0 flex-1 flex-col overflow-y-auto pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[calc(56px+max(12px,env(safe-area-inset-top))+2.5rem)]">
          <p className="t-label text-mute-dark">Menu</p>
          <ul className="mt-4 flex flex-col">
            {[...nav, { label: "Contact", href: "#contact" }].map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-paper/10">
                <a
                  href={`${base}${item.href}`}
                  onClick={onNavClick}
                  className={`flex min-h-16 items-baseline gap-4 py-3 text-[clamp(2rem,1.2rem+5vw,3.5rem)] font-bold leading-none tracking-[-0.04em] stretch-wide transition-[transform,opacity] duration-700 ease-[var(--ease-out-expo)] ${
                    open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                >
                  <span className="t-label w-6 shrink-0 text-blue-soft">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div
            className={`mt-auto flex flex-col gap-5 pt-10 transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: open ? "500ms" : "0ms" }}
          >
            <a href={`mailto:${site.email}`} className="text-lead text-xl font-semibold underline decoration-paper/30 underline-offset-4">
              {site.email}
            </a>
            <p className="max-w-[32ch] text-sm text-mute-dark">
              Booking projects for early 2027. We reply to every enquiry within one working day.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
