import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/content";
import { Nav } from "@/components/layout/Nav";
import { Preloader } from "@/components/layout/Preloader";
import "./globals.css";

/*
 * Archivo (wght 300–800, wdth 75–125) and Geist Mono (wght 400–500), both SIL OFL.
 * Self-hosted variable fonts, instanced to the axis ranges we use and subset to the
 * characters on the site (see scripts/subset-fonts.sh): 90 KB → 47 KB and 23 KB → 8 KB.
 */
const archivo = localFont({
  src: "../fonts/archivo-var.woff2",
  variable: "--font-archivo",
  weight: "300 800",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
  fallback: ["ui-sans-serif", "system-ui", "Arial", "sans-serif"],
});

const geistMono = localFont({
  src: "../fonts/geist-mono-var.woff2",
  variable: "--font-geist-mono",
  weight: "400 500",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

const title = "Webtreo — Web design & development studio";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s · Webtreo",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "web design studio",
    "web design agency",
    "Next.js development",
    "Webflow agency",
    "website redesign",
    "UX design",
    "conversion-focused websites",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Runs before first paint: skips the preloader for repeat visits in the same session. */
const visitScript = `try{var s=window.sessionStorage;if(s.getItem("wt:v"))document.documentElement.setAttribute("data-visited","");s.setItem("wt:v","1")}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  areaServed: "Worldwide",
  knowsAbout: ["Web design", "UX design", "Web development", "Next.js", "Webflow", "SEO"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: visitScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <Preloader />
        <Nav />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
