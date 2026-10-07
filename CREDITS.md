# Credits & asset sources

Every visual on this site is either original artwork made for Webtreo or an open-source/free-licence asset. No stock photos are hotlinked; everything ships from `/public` or `src/`.

> **Why no stock photography?** The build environment's network policy blocked Unsplash, Pexels, Mixkit and Coverr, so photos/videos could not be downloaded. Instead of placeholders, all imagery was produced as original artwork (below). Swap in real team photos and client work whenever you're ready — the components already handle any 4:3 / 4:5 image.

## Fonts (self-hosted, subset)

| Asset | File | Source | Licence |
| --- | --- | --- | --- |
| Archivo (variable: wght 300–800, wdth 75–125) | `src/fonts/archivo-var.woff2` | Omnibus-Type via [Google Fonts](https://fonts.google.com/specimen/Archivo) | SIL Open Font License 1.1 |
| Geist Mono (variable: wght 400–500) | `src/fonts/geist-mono-var.woff2` | Vercel via [Google Fonts](https://fonts.google.com/specimen/Geist+Mono) | SIL Open Font License 1.1 |

Both were instanced and subset with fontTools (`scripts/subset-fonts.sh`).

## Original artwork (created for this project)

| Asset | Files | How it was made |
| --- | --- | --- |
| Logo mark (vector) | `src/components/brand/Logo.tsx`, `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png`, `public/icon-*.png` | Redrawn as clean vector paths from the supplied Webtreo logo |
| Portfolio mockups — Fieldnote, Voltline, Northwind Roasters, Halcyon Health, Kiln & Co, Orbital (fictional clients) | `public/media/work/*.webp` | Designed in HTML/CSS/SVG and rendered with Playwright + sharp (`scripts/mockups/`) |
| Team portraits (illustrations) | `public/media/team/*.svg` | Generated flat illustrations (`scripts/gen-portraits.py`) |
| Showreel video + poster | `public/media/video/showreel.{mp4,webm}`, `showreel-poster.webp` | Frames rendered from the mockups with Playwright, encoded with ffmpeg (H.264 1.1 MB, VP9 1.3 MB, muted, no audio track) — `scripts/showreel.mjs` |
| Open Graph / Twitter image | `src/app/opengraph-image.png`, `src/app/twitter-image.png` | Rendered with Playwright (`scripts/gen-brand-assets.mjs`) |
| Hero "pixel field" | `src/components/motion/PixelField.tsx` | Procedural 2D canvas |
| Icons (arrows, checks, process illustrations) | inline SVG in components | Hand-written SVG |

Mockup images use fonts from Google Fonts (Inter Tight, JetBrains Mono, Space Grotesk, Fraunces, DM Sans, DM Serif Display, DM Mono, Instrument Serif, Inter, Sora — all SIL OFL) at render time only; they are baked into the images and not loaded by the site.

## Libraries

| Library | Licence |
| --- | --- |
| [Next.js](https://nextjs.org), [React](https://react.dev) | MIT |
| [Tailwind CSS](https://tailwindcss.com) | MIT |
| [GSAP](https://gsap.com) incl. ScrollTrigger & SplitText | GSAP "no charge" standard licence (free for commercial use since 3.13) |
| [Lenis](https://lenis.darkroom.engineering) | MIT |

## Placeholder content to replace before launch

- Client names, project results, testimonials, team members and prices are realistic **placeholder copy** for a fictional portfolio.
- `hello@webtreo.com` is used as the contact address — update `site.email` in `src/lib/content.ts`.
