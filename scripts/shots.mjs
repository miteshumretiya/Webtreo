// QA helper: screenshots + horizontal-overflow check at every breakpoint.
// usage: node scripts/shots.mjs <url> <outDir> [widths=360,390,...] [--full] [--nojs] [--reduce] [--scroll=<selector>]
import { chromium } from "playwright";
import fs from "node:fs";

const [url = "http://localhost:3000", out = "shots", widthsArg] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const flags = process.argv.filter((a) => a.startsWith("--"));
const full = flags.includes("--full");
const nojs = flags.includes("--nojs");
const reduce = flags.includes("--reduce");
const scrollSel = flags.find((f) => f.startsWith("--scroll="))?.split("=")[1];
const widths = (widthsArg ?? "360,390,430,768,1024,1280,1440,1920").split(",").map(Number);
const heights = { 360: 780, 390: 844, 430: 932, 768: 1024, 1024: 768, 1280: 800, 1440: 900, 1920: 1080 };

fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/opt/pw-browsers/chromium" });
const report = [];
for (const w of widths) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: heights[w] ?? 900 },
    deviceScaleFactor: 1,
    javaScriptEnabled: !nojs,
    reducedMotion: reduce ? "reduce" : "no-preference",
    hasTouch: w < 1024,
    isMobile: w < 768,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errors.push(`${m.type()}: ${m.text()}`));
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  if (scrollSel) {
    await page.evaluate((s) => document.querySelector(s)?.scrollIntoView(), scrollSel);
    await page.waitForTimeout(1500);
  }
  if (full) {
    // scroll through the page so lazy content + scroll reveals fire
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 500) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);
  }
  const m = await page.evaluate(() => {
    const sw = document.documentElement.scrollWidth;
    const iw = window.innerWidth;
    const offenders = [];
    if (sw > iw) {
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.right > iw + 1 && getComputedStyle(el).position !== "fixed") offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} → ${Math.round(r.right)}`);
        if (offenders.length > 8) break;
      }
    }
    return { sw, iw, offenders };
  });
  report.push({ w, ...m, errors: errors.slice(0, 5) });
  await page.screenshot({ path: `${out}/${w}${full ? "-full" : ""}.png`, fullPage: full });
  await ctx.close();
}
await browser.close();
for (const r of report) console.log(`${r.w}px  scrollWidth=${r.sw} innerWidth=${r.iw} ${r.sw <= r.iw ? "OK" : "OVERFLOW"} ${r.offenders.join(" | ")} ${r.errors.length ? "\n   " + r.errors.join("\n   ") : ""}`);
