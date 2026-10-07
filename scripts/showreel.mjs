// Renders the original Webtreo showreel (seamless 9s loop) from the portfolio mockups.
// Frames are captured with Playwright, then encoded to MP4 (H.264) + WebM (VP9) with ffmpeg.
// usage: node scripts/showreel.mjs
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public/media/video");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "reel-"));
fs.mkdirSync(out, { recursive: true });

const W = 1280, H = 720, FPS = 30, SCENE = 1.5;
const projects = [
  ["fieldnote", "Fieldnote", "B2B SaaS"],
  ["voltline", "Voltline", "Mobility"],
  ["northwind", "Northwind Roasters", "E-commerce"],
  ["halcyon", "Halcyon Health", "Healthcare"],
  ["kiln", "Kiln & Co", "Retail"],
  ["orbital", "Orbital", "Fintech"],
];
const TOTAL = projects.length * SCENE;
const frames = Math.round(TOTAL * FPS);

const img = (slug) => "data:image/webp;base64," + fs.readFileSync(path.join(root, `public/media/work/${slug}.webp`)).toString("base64");

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Geist+Mono:wght@500&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#191917;font-family:Archivo;color:#FBFAF8}
.grid{position:absolute;inset:0;background-image:radial-gradient(#2857ff33 1.5px,transparent 1.6px);background-size:24px 24px;mask-image:radial-gradient(70% 70% at 50% 50%,#000,transparent)}
.win{position:absolute;left:50%;top:50%;width:880px;height:560px;margin:-262px 0 0 -440px;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 40px 80px -20px #000c;will-change:transform}
.bar{height:38px;background:#F2F0EB;display:flex;align-items:center;gap:7px;padding:0 14px}
.bar i{width:11px;height:11px;border-radius:50%;background:#d6d3cb}
.bar span{margin-left:auto;margin-right:auto;font:500 12px 'Geist Mono';color:#62615b;background:#fff;border-radius:6px;padding:4px 40px}
.shot{width:880px;height:660px;display:block;will-change:transform}
.view{height:522px;overflow:hidden}
.label{position:absolute;left:48px;bottom:40px;font:500 13px 'Geist Mono';letter-spacing:.08em;text-transform:uppercase;color:#a8a79f}
.title{position:absolute;left:46px;bottom:62px;font-weight:700;font-stretch:125%;font-size:30px;letter-spacing:-.04em}
.brand{position:absolute;right:48px;top:36px;font:500 13px 'Geist Mono';letter-spacing:.08em;text-transform:uppercase;color:#a8a79f}
.count{position:absolute;right:48px;bottom:40px;font:500 13px 'Geist Mono';color:#a8a79f}
.mark{position:absolute;left:46px;top:30px;display:flex;align-items:center;gap:10px;font-weight:700;font-stretch:125%;font-size:20px;letter-spacing:-.04em}
.px{width:10px;height:10px;background:#2857FF;border-radius:2px}
</style></head><body>
<div class="grid"></div>
<div class="mark"><span class="px"></span>webtreo</div><div class="brand">Showreel — 2026</div>
${projects.map(([slug], i) => `<div class="win" id="w${i}"><div class="bar"><i></i><i></i><i></i><span>${slug}.com</span></div><div class="view"><img class="shot" id="s${i}" src="${img(slug)}"></div></div>`).join("")}
<div class="title" id="title"></div><div class="label" id="label"></div><div class="count" id="count"></div>
<script>
const P=${JSON.stringify(projects)},S=${SCENE},N=P.length;
const expo=t=>t<=0?0:t>=1?1:t<.5?Math.pow(2,20*t-10)/2:(2-Math.pow(2,-20*t+10))/2;
window.setT=t=>{
  const scene=Math.floor(t/S)%N, local=(t%S)/S;
  // transition happens in the last 30% of each scene
  const tr=expo(Math.min(1,Math.max(0,(local-.7)/.3)));
  for(let i=0;i<N;i++){
    let rel=((i-scene)%N+N)%N; // 0=current, 1=next
    let y=0,sc=1,op=1;
    if(rel===0){y=-tr*640;sc=1-tr*.08;op=1-tr*.6}
    else if(rel===1){y=(1-tr)*640;sc=.92+tr*.08}
    else{y=900}
    const w=document.getElementById('w'+i);
    w.style.transform='translateY('+y+'px) scale('+sc+')';w.style.opacity=op;w.style.zIndex=rel===1?2:1;
    // inner "scroll" of the page
    const inner=rel===0?local:rel===1?0:0;
    document.getElementById('s'+i).style.transform='translateY('+(-132*expo(Math.min(1,inner*1.25)))+'px)';
  }
  const cur=P[tr>.5?(scene+1)%N:scene];
  document.getElementById('title').textContent=cur[1];
  document.getElementById('label').textContent=cur[2];
  document.getElementById('count').textContent=String((tr>.5?(scene+1)%N:scene)+1).padStart(2,'0')+' / '+String(N).padStart(2,'0');
};
</script></body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
for (let f = 0; f < frames; f++) {
  await page.evaluate((t) => window.setT(t), f / FPS);
  await page.screenshot({ path: path.join(tmp, `f${String(f).padStart(4, "0")}.png`) });
}
await page.evaluate(() => window.setT(0.2));
const poster = await page.screenshot({ type: "png" });
await browser.close();

await sharp(poster).webp({ quality: 80 }).toFile(path.join(out, "showreel-poster.webp"));

const input = ["-y", "-hide_banner", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(tmp, "f%04d.png")];
execFileSync("ffmpeg", [...input, "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", path.join(out, "showreel.mp4")]);
execFileSync("ffmpeg", [...input, "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", "-pix_fmt", "yuv420p", "-an", path.join(out, "showreel.webm")]);
fs.rmSync(tmp, { recursive: true, force: true });
for (const f of ["showreel.mp4", "showreel.webm", "showreel-poster.webp"]) {
  console.log(f, (fs.statSync(path.join(out, f)).size / 1024 / 1024).toFixed(2) + "MB");
}
