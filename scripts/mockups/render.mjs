// Renders the portfolio mockups to /public/media/work/*.webp (1600×1200, original artwork).
// usage: node scripts/mockups/render.mjs [slug...]
import { chromium } from "playwright";
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { designs } from "./designs.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const out = path.join(root, "public/media/work");
fs.mkdirSync(out, { recursive: true });

const only = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 });

for (const [slug, html] of Object.entries(designs)) {
  if (only.length && !only.includes(slug)) continue;
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const png = await page.screenshot({ type: "png" });
  const file = path.join(out, `${slug}.webp`);
  await sharp(png).webp({ quality: 84, effort: 6 }).toFile(file);
  console.log(slug, Math.round(fs.statSync(file).size / 1024) + "KB");
}
await browser.close();
