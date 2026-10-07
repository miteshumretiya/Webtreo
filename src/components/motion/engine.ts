import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* One easing family + one duration scale across the whole site */
const EASE = "expo.out";
const EASE_IO = "expo.inOut";
const DUR = { fast: 0.4, base: 0.8, slow: 1.2 } as const;
const START = "clamp(top 88%)";

const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T & Element>(sel) as T | null;
const qa = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll(sel)) as T[];

type Cleanup = () => void;

const yieldToMain = () =>
  new Promise<void>((resolve) => {
    const sched = (globalThis as { scheduler?: { yield?: () => Promise<void> } }).scheduler;
    if (sched?.yield) sched.yield().then(resolve);
    else setTimeout(resolve, 0);
  });

export function initMotion(): Cleanup {
  const html = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanups: Cleanup[] = [];

  if (reduce) {
    // Content is already rendered in its final state; just release the repeat-visit guard.
    html.classList.add("motion-ready");
    return () => html.classList.remove("motion-ready");
  }

  /* ── smooth scroll (Lenis ⇄ ScrollTrigger on GSAP's ticker) ── */
  const lenis = new Lenis({
    duration: DUR.slow,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // expo.out
    anchors: { offset: 0 },
    autoRaf: false,
  });
  window.__lenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  cleanups.push(() => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    delete window.__lenis;
  });

  const mm = gsap.matchMedia();
  const ctx = gsap.context(() => {});

  // Setup runs as a series of short tasks (yielding in between) so it never
  // blocks input: hero first, then pinned sections, then below-the-fold reveals.
  const steps: (() => void)[] = [
    heroIntro,
    () => processStack(mm),
    () => horizontalWork(mm),
    () => showreel(mm),
    splitReveals,
    fadeReveals,
    clipReveals,
    parallax,
    counters,
  ];
  const run = async () => {
    for (const step of steps) {
      if (cancelled) return;
      ctx.add(step);
      await yieldToMain();
    }
    if (cancelled) return;
    mm.add("(hover: hover) and (pointer: fine)", () => {
      const off = [magnetic(), tilt(), followMedia(), cursor()];
      return () => off.forEach((fn) => fn());
    });
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  };

  // split text only once webfonts are ready, so line breaks are measured correctly
  let cancelled = false;
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 900))]).then(() => {
    if (!cancelled) run();
  });

  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener("load", onLoad);
  cleanups.push(() => window.removeEventListener("load", onLoad));

  return () => {
    cancelled = true;
    mm.revert();
    ctx.revert();
    cleanups.forEach((fn) => fn());
    html.classList.remove("motion-ready", "has-cursor");
  };
}

/* ─────────────────────────── hero intro (synced to the CSS preloader) ─────────────────────────── */
let heroDelay = 0;

function heroIntro() {
  const html = document.documentElement;
  const title = q("[data-hero-title]");
  const pre = q("[data-preloader]");
  let delay = -1;

  if (pre && getComputedStyle(pre).display !== "none") {
    const anim = pre.getAnimations().find((a) => (a as CSSAnimation).animationName === "preloader-out");
    const t = Number(anim?.currentTime ?? 0);
    if (t < 760) delay = (850 - t) / 1000 + 0.05;
  } else if (html.hasAttribute("data-visited")) {
    delay = 0.05; // repeat visit — hero copy is held hidden by CSS until now
  }
  html.classList.add("motion-ready");
  if (!title || delay < 0) return;
  heroDelay = delay;

  const split = SplitText.create(title, { type: "lines", mask: "lines" });
  const tl = gsap.timeline({ delay, onComplete: () => split.revert() });
  tl.from(q("[data-hero-card]"), { scale: 0.965, duration: DUR.slow, ease: EASE }, 0)
    .from(split.lines, { yPercent: 115, duration: DUR.slow, stagger: 0.09, ease: EASE }, 0.05)
    .from(qa("[data-hero-fade]"), { y: 32, autoAlpha: 0, duration: DUR.slow, stagger: 0.07, ease: EASE }, 0.25);
}

/* ─────────────────────────── text reveals ─────────────────────────── */
function splitReveals() {
  qa("[data-split]").forEach((el) => {
    const mode = el.dataset.split === "chars" ? "chars" : "lines";
    // chars rise inside their parent's clip (per-char masks would crop tight, overhanging glyphs)
    SplitText.create(el, {
      type: mode === "chars" ? "chars" : "lines",
      mask: mode === "lines" ? "lines" : undefined,
      autoSplit: true,
      onSplit(self) {
        const targets = mode === "chars" ? self.chars : self.lines;
        return gsap.from(targets, {
          yPercent: 115,
          duration: DUR.slow,
          ease: EASE,
          stagger: mode === "chars" ? 0.035 : 0.09,
          scrollTrigger: { trigger: el, start: START, once: true },
        });
      },
    });
  });
}

function fadeReveals() {
  const items = qa("[data-reveal]");
  if (!items.length) return;
  gsap.set(items, { y: 40, autoAlpha: 0 });
  ScrollTrigger.batch(items, {
    start: START,
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { y: 0, autoAlpha: 1, duration: DUR.slow, ease: EASE, stagger: 0.08, overwrite: true }),
  });
}

/* masked image reveal: clip-path wipe + inner scale-down */
function clipReveals() {
  qa("[data-clip]").forEach((el) => {
    const img = q("[data-clip-inner]", el) ?? q("img, video", el);
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: START, once: true } });
    tl.fromTo(
      el,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: DUR.slow, ease: EASE_IO, clearProps: "clipPath" },
    );
    if (img) tl.from(img, { scale: 1.3, duration: DUR.slow * 1.4, ease: EASE }, 0.1);
  });
}

function parallax() {
  qa("[data-parallax]").forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || "0.1");
    gsap.fromTo(
      el,
      { yPercent: -speed * 100 },
      {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });
}

function counters() {
  const els = qa("[data-counter]");
  // read every width first, then write — avoids a forced reflow per counter
  const widths = els.map((el) => el.getBoundingClientRect().width);
  els.forEach((el, i) => {
    const end = parseFloat(el.dataset.counter || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const fmt = (v: number) =>
      decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US");
    const finalText = fmt(end);
    // reserve the final width so counting never shifts layout
    el.style.display = "inline-block";
    el.style.minWidth = `${widths[i]}px`;
    const obj = { v: 0 };
    el.textContent = fmt(0);
    const inHero = !!el.closest("#top");
    gsap.to(obj, {
      v: end,
      duration: DUR.slow * 1.5,
      ease: EASE,
      delay: inHero ? heroDelay + 0.3 : 0,
      scrollTrigger: { trigger: el, start: START, once: true },
      onUpdate: () => {
        el.textContent = fmt(obj.v);
      },
      onComplete: () => {
        el.textContent = finalText;
      },
    });
  });
}

/* ─────────────────────────── section choreography ─────────────────────────── */
function processStack(mm: gsap.MatchMedia) {
  mm.add("(min-width: 1024px) and (min-height: 720px)", () => {
    const cards = qa("[data-stack-card]");
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      const inner = q("[data-stack-inner]", card);
      const shade = q("[data-stack-shade]", card);
      const st = { trigger: next, start: "top bottom", end: "top 30%", scrub: true };
      if (inner) gsap.to(inner, { scale: 0.94, ease: "none", scrollTrigger: st });
      if (shade) gsap.to(shade, { opacity: 0.55, ease: "none", scrollTrigger: { ...st } });
    });
  });
}

function horizontalWork(mm: gsap.MatchMedia) {
  mm.add("(min-width: 1024px) and (min-height: 640px)", () => {
    const section = q("[data-hscroll]");
    const track = q("[data-hscroll-track]");
    if (!section || !track) return;
    section.setAttribute("data-hactive", "");
    const bar = q("[data-hscroll-bar]", section);
    const wrap = track.parentElement ?? track;
    // track starts at the container's inner edge and must end flush with the viewport
    const distance = () => {
      const left = wrap.getBoundingClientRect().left + parseFloat(getComputedStyle(wrap).paddingLeft);
      return Math.max(0, left + track.scrollWidth - document.documentElement.clientWidth);
    };

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
    if (bar) {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, scrub: true },
        },
      );
    }
    qa("[data-hscroll-img]", section).forEach((img) => {
      gsap.fromTo(
        img,
        { xPercent: 3.5 },
        {
          xPercent: -3.5,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest("[data-hscroll-card]") ?? img,
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        },
      );
    });
    return () => section.removeAttribute("data-hactive");
  });
}

function showreel(mm: gsap.MatchMedia) {
  const el = q("[data-showreel]");
  if (!el) return;
  mm.add(
    { desktop: "(min-width: 768px)", mobile: "(max-width: 767.98px)" },
    (c) => {
      const from = c.conditions?.desktop ? "inset(10% 16% 10% 16% round 40px)" : "inset(4% 4% 4% 4% round 24px)";
      gsap.fromTo(
        el,
        { clipPath: from },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 85%", end: "center center", scrub: true },
        },
      );
      const label = q("[data-showreel-label]", el);
      if (label) {
        gsap.fromTo(
          label,
          { scale: 0.7 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "center center", scrub: true } },
        );
      }
    },
  );
}

/* ─────────────────────────── pointer effects (desktop only) ─────────────────────────── */
function magnetic(): Cleanup {
  const offs: Cleanup[] = [];
  qa("[data-magnetic]").forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic || "") || 0.3;
    const xTo = gsap.quickTo(el, "x", { duration: DUR.base, ease: EASE });
    const yTo = gsap.quickTo(el, "y", { duration: DUR.base, ease: EASE });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    offs.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { clearProps: "transform" });
    });
  });
  return () => offs.forEach((fn) => fn());
}

function tilt(): Cleanup {
  const offs: Cleanup[] = [];
  qa("[data-tilt]").forEach((el) => {
    const max = parseFloat(el.dataset.tilt || "") || 6;
    const media = q("[data-tilt-media]", el);
    gsap.set(el, { transformPerspective: 1000 });
    const rx = gsap.quickTo(el, "rotationX", { duration: DUR.base, ease: EASE });
    const ry = gsap.quickTo(el, "rotationY", { duration: DUR.base, ease: EASE });
    const mx = media ? gsap.quickTo(media, "x", { duration: DUR.base, ease: EASE }) : null;
    const my = media ? gsap.quickTo(media, "y", { duration: DUR.base, ease: EASE }) : null;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * max);
      rx(-py * max);
      mx?.(px * -14);
      my?.(py * -14);
    };
    const leave = () => {
      rx(0);
      ry(0);
      mx?.(0);
      my?.(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    offs.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set([el, media].filter(Boolean), { clearProps: "transform" });
    });
  });
  return () => offs.forEach((fn) => fn());
}

/* services list: preview image that follows the cursor */
function followMedia(): Cleanup {
  const root = q("[data-follow-root]");
  const media = root && q("[data-follow-media]", root);
  if (!root || !media) return () => {};
  const imgs = qa("[data-follow-img]", media);
  const xTo = gsap.quickTo(media, "x", { duration: DUR.base, ease: EASE });
  const yTo = gsap.quickTo(media, "y", { duration: DUR.base, ease: EASE });
  const rTo = gsap.quickTo(media, "rotation", { duration: DUR.base, ease: EASE });
  let lastX = 0;
  gsap.set(media, { autoAlpha: 0, scale: 0.6, xPercent: -50, yPercent: -50 });

  const move = (e: PointerEvent) => {
    const r = root.getBoundingClientRect();
    const x = e.clientX - r.left;
    xTo(x);
    yTo(e.clientY - r.top);
    rTo(gsap.utils.clamp(-10, 10, (x - lastX) * 0.6));
    lastX = x;
  };
  const show = (i: number) => {
    gsap.to(media, { autoAlpha: 1, scale: 1, duration: DUR.fast, ease: EASE, overwrite: "auto" });
    imgs.forEach((img, k) => gsap.to(img, { autoAlpha: k === i ? 1 : 0, duration: DUR.fast, ease: EASE }));
  };
  const hide = () => gsap.to(media, { autoAlpha: 0, scale: 0.6, duration: DUR.fast, ease: EASE, overwrite: "auto" });

  const items = qa("[data-follow-item]", root);
  const enters = items.map((item, i) => {
    const fn = () => show(i);
    item.addEventListener("pointerenter", fn);
    return () => item.removeEventListener("pointerenter", fn);
  });
  root.addEventListener("pointermove", move);
  root.addEventListener("pointerleave", hide);
  return () => {
    enters.forEach((fn) => fn());
    root.removeEventListener("pointermove", move);
    root.removeEventListener("pointerleave", hide);
    gsap.set(media, { clearProps: "all" });
  };
}

/* custom cursor: dot + lagging ring (lerp), contextual labels */
function cursor(): Cleanup {
  const html = document.documentElement;
  const dot = document.createElement("div");
  const ring = document.createElement("div");
  const label = document.createElement("span");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  label.className = "cursor-label";
  ring.append(label);
  document.body.append(ring, dot);
  html.classList.add("has-cursor");

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const pos = { x: mouse.x, y: mouse.y };
  const setDot = { x: gsap.quickSetter(dot, "x", "px"), y: gsap.quickSetter(dot, "y", "px") };
  const setRing = { x: gsap.quickSetter(ring, "x", "px"), y: gsap.quickSetter(ring, "y", "px") };
  gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

  let shown = false;
  const onMove = (e: PointerEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (!shown) {
      shown = true;
      pos.x = mouse.x;
      pos.y = mouse.y;
      gsap.to([dot, ring], { autoAlpha: 1, duration: DUR.fast });
    }
    setDot.x(mouse.x);
    setDot.y(mouse.y);
  };
  const loop = () => {
    const dt = 1 - Math.pow(1 - 0.2, gsap.ticker.deltaRatio());
    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    setRing.x(pos.x);
    setRing.y(pos.y);
  };
  gsap.ticker.add(loop);

  const onOver = (e: PointerEvent) => {
    const t = e.target as Element | null;
    if (!t || !(t instanceof Element)) return;
    const labelled = t.closest<HTMLElement>("[data-cursor]");
    const field = t.closest("input, textarea, select");
    const interactive = t.closest("a, button, label, [role='button'], summary");
    const media = t.closest("img, video, canvas, [data-cursor-media]");
    const dark = t.closest(".on-dark, .on-blue");
    ring.dataset.state = field ? "hidden" : labelled ? "label" : interactive ? "link" : media ? "media" : "";
    ring.dataset.theme = dark ? "dark" : "";
    dot.dataset.theme = dark ? "dark" : "";
    dot.dataset.state = field ? "hidden" : labelled ? "hidden" : "";
    label.textContent = labelled?.dataset.cursor ?? "";
  };
  const onLeave = () => {
    shown = false;
    gsap.to([dot, ring], { autoAlpha: 0, duration: DUR.fast });
  };
  const onDown = () => ring.classList.add("is-down");
  const onUp = () => ring.classList.remove("is-down");

  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerover", onOver, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);
  window.addEventListener("pointerdown", onDown);
  window.addEventListener("pointerup", onUp);

  return () => {
    gsap.ticker.remove(loop);
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerover", onOver);
    document.documentElement.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    dot.remove();
    ring.remove();
    html.classList.remove("has-cursor");
  };
}
