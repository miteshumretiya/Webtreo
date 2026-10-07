// QA helper: after scrolling the whole page, report any text/media still hidden (opacity≈0 or visibility:hidden)
// usage: node scripts/visibility-check.mjs <url> <width> [--nojs] [--reduce]
import { chromium } from "playwright";
const [url, width] = process.argv.slice(2);
const nojs = process.argv.includes("--nojs");
const reduce = process.argv.includes("--reduce");
const b = await chromium.launch({ executablePath: process.env.CHROME ?? "/opt/pw-browsers/chromium" });
const ctx = await b.newContext({ viewport: { width: Number(width), height: 900 }, javaScriptEnabled: !nojs, reducedMotion: reduce ? "reduce" : "no-preference" });
const p = await ctx.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push(e.message));
p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await p.goto(url, { waitUntil: "networkidle" });
await p.waitForTimeout(1800);
const H = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < H; y += 400) {
  await p.evaluate((yy) => (window.__lenis ? window.__lenis.scrollTo(yy, { immediate: true }) : window.scrollTo(0, yy)), y);
  await p.waitForTimeout(90);
}
await p.waitForTimeout(2500);
const res = await p.evaluate(() => {
  const hidden = [];
  const sel = "main h1, main h2, main h3, main p, main li, main img, main video, main a, main button, footer p, footer a";
  for (const el of document.querySelectorAll(sel)) {
    if (el.closest("[aria-hidden='true'], .marquee, [data-follow-media], .sr-only, [inert]")) continue;
    let n = el, op = 1, vis = true;
    while (n && n !== document.body) {
      const cs = getComputedStyle(n);
      op *= parseFloat(cs.opacity);
      if (cs.visibility === "hidden" || cs.display === "none") vis = false;
      n = n.parentElement;
    }
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    if (op < 0.5 || !vis) hidden.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute("alt") || "").trim().slice(0, 40)}" op=${op.toFixed(2)} vis=${vis}`);
  }
  const pre = document.querySelector("[data-preloader]");
  const preCs = pre && getComputedStyle(pre);
  return { hidden, preloader: preCs ? `${preCs.display}/${preCs.visibility}` : "none", sw: document.documentElement.scrollWidth, iw: innerWidth };
});
console.log(`${width}px ${nojs ? "no-JS" : "JS"} ${reduce ? "reduced-motion" : ""} preloader=${res.preloader} overflow=${res.sw > res.iw} hidden=${res.hidden.length}`);
res.hidden.slice(0, 15).forEach((h) => console.log("   ", h));
errors.slice(0, 5).forEach((e) => console.log("   ERR", e.slice(0, 200)));
await b.close();
