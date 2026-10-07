# Webtreo — web design & development studio

Marketing site for Webtreo, built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, GSAP (ScrollTrigger + SplitText) and Lenis.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

### Environment variables (optional)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and robots (defaults to the Vercel production URL) |
| `CONTACT_WEBHOOK_URL` | If set, contact-form enquiries are POSTed as JSON to this URL (Slack, Zapier, Make, Formspree…). Otherwise they are logged on the server. |

## Structure

```
src/
  app/                 routes: /, /work/[slug], /privacy, /thanks, /api/contact, sitemap, robots, OG image, icons
  components/
    brand/Logo.tsx     vector logo mark
    layout/            Nav (glass, hide-on-scroll, mobile menu), Preloader (pure CSS), Footer
    sections/          Hero, Services, Process, Work, Showreel, Pricing, Studio, Numbers, Contact
    motion/            engine.ts (GSAP/Lenis, lazy-loaded), MotionRoot, PixelField (hero canvas)
    ui/                Button, RollText, SectionHeader, ClientLogo
  lib/content.ts       all copy and data in one place
  fonts/               self-hosted subset variable fonts
scripts/               asset generators + QA helpers (screenshots, visibility check)
```

## How the motion works

- Sections are server components; animation is declared with `data-*` attributes (`data-split`, `data-reveal`, `data-clip`, `data-parallax`, `data-counter`, `data-magnetic`, `data-tilt`, `data-cursor`…).
- `MotionRoot` dynamically imports `engine.ts` after hydration and sets everything up in small, yielded tasks so it never blocks input.
- One easing family (`expo`) and one duration scale (0.4 / 0.8 / 1.2s) everywhere.
- Content is fully visible without JavaScript. With `prefers-reduced-motion`, smooth scrolling, the preloader and all scroll animations are disabled.
- The preloader is pure CSS (≈1.35s) and always lifts on its own; it only shows once per session.

## Regenerating assets

```bash
node scripts/mockups/render.mjs        # portfolio mockups → public/media/work
node scripts/showreel.mjs              # showreel mp4/webm/poster → public/media/video
node scripts/gen-brand-assets.mjs      # favicon, app icons, OG image
python3 scripts/gen-portraits.py       # team illustrations
```

## QA helpers

```bash
node scripts/shots.mjs http://localhost:3000 shots 360,390,430,768,1024,1280,1440,1920 --full
node scripts/visibility-check.mjs http://localhost:3000 390 --nojs
```

See `CREDITS.md` for every asset and its licence.
