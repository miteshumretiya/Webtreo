// Generates favicon/app icons and the Open Graph image from the vector mark.
// usage: node scripts/gen-brand-assets.mjs
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = fs.readFileSync(path.join(root, "src/components/brand/Logo.tsx"), "utf8");
const p = Object.fromEntries([...src.matchAll(/(ink|blue|px1|px2): "([^"]+)"/g)].map((m) => [m[1], m[2]]));

const mark = (ink = "#191917", blue = "#2857FF") =>
  `<path fill="${ink}" d="${p.ink}"/><path fill="${blue}" d="${p.blue}"/><path fill="${blue}" d="${p.px1}"/><path fill="${blue}" d="${p.px2}"/>`;

// square icon: mark centred on a paper tile
const iconSvg = (size, radius) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
<rect width="${size}" height="${size}" rx="${radius}" fill="#FBFAF8"/>
<g transform="translate(${size * 0.14} ${size * 0.205}) scale(${(size * 0.72) / 613})">${mark()}</g></svg>`;

fs.writeFileSync(path.join(root, "src/app/icon.svg"), iconSvg(64, 14));
await sharp(Buffer.from(iconSvg(180, 0))).png().toFile(path.join(root, "src/app/apple-icon.png"));
await sharp(Buffer.from(iconSvg(512, 112))).png().toFile(path.join(root, "public/icon-512.png"));
await sharp(Buffer.from(iconSvg(192, 42))).png().toFile(path.join(root, "public/icon-192.png"));

// favicon.ico (16/32/48) — PNG-in-ICO container
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(Buffer.from(iconSvg(s, Math.round(s * 0.2)))).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(pngs[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
fs.writeFileSync(path.join(root, "src/app/favicon.ico"), Buffer.concat([header, ...pngs]));

// Open Graph image 1200×630
const thumb = (slug) => "data:image/webp;base64," + fs.readFileSync(path.join(root, `public/media/work/${slug}.webp`)).toString("base64");
const og = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Geist+Mono:wght@500&display=block" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}html,body{width:1200px;height:630px;overflow:hidden;background:#191917;color:#FBFAF8;font-family:Archivo}
.grid{position:absolute;inset:0;background-image:radial-gradient(#2857ff55 2px,transparent 2.2px);background-size:26px 26px;mask-image:linear-gradient(115deg,transparent 45%,#000 85%)}
h1{position:absolute;left:64px;top:150px;font-size:84px;line-height:.98;letter-spacing:-.045em;font-weight:700;font-stretch:125%;width:780px}
.pill{background:#2857FF;border-radius:.24em;padding:0 .2em .06em}
.out{border:5px solid #fbfaf860;border-radius:.24em;padding:0 .18em .04em}
.logo{position:absolute;left:64px;top:56px;display:flex;align-items:center;gap:14px;font-weight:700;font-stretch:125%;font-size:30px;letter-spacing:-.04em}
.foot{position:absolute;left:64px;bottom:52px;font:500 17px 'Geist Mono';letter-spacing:.08em;text-transform:uppercase;color:#a8a79f}
.shots{position:absolute;right:-90px;top:70px;width:420px;display:grid;gap:18px;transform:rotate(-8deg)}
.shots img{width:100%;border-radius:18px;box-shadow:0 30px 60px -20px #000}
</style></head><body><div class="grid"></div>
<div class="shots"><img src="${thumb("voltline")}"><img src="${thumb("fieldnote")}"></div>
<div class="logo"><svg viewBox="0 0 613 479" width="46">${mark("#FBFAF8")}</svg>webtreo</div>
<h1>We craft <span class="pill">websites</span> people can’t <span class="out">scroll past.</span></h1>
<div class="foot">Web design &amp; development studio</div></body></html>`;
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const ogPng = await page.screenshot({ type: "png" });
await browser.close();
await sharp(ogPng).png({ compressionLevel: 9, palette: false }).toFile(path.join(root, "src/app/opengraph-image.png"));
fs.copyFileSync(path.join(root, "src/app/opengraph-image.png"), path.join(root, "src/app/twitter-image.png"));
const alt = "Webtreo — We craft websites people can't scroll past. Web design & development studio.";
fs.writeFileSync(path.join(root, "src/app/opengraph-image.alt.txt"), alt);
fs.writeFileSync(path.join(root, "src/app/twitter-image.alt.txt"), alt);
console.log("brand assets written");
