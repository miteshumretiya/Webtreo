import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Webtreo collects, uses and protects the information you share with us.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    h: "What we collect",
    p: "When you use our contact form we collect your name, email address, company or website (optional), budget range, the services you're interested in and your message. We don't use advertising trackers or sell personal data.",
  },
  {
    h: "How we use it",
    p: "We use your details only to reply to your enquiry, prepare a proposal and, if we work together, to deliver the project. We don't add you to a newsletter unless you ask us to.",
  },
  {
    h: "How long we keep it",
    p: "Enquiries that don't become projects are deleted after 12 months. Client records are kept for as long as required by accounting law.",
  },
  {
    h: "Your rights",
    p: `You can ask us to access, correct or delete your data at any time by emailing ${site.email}. We'll respond within 30 days.`,
  },
  {
    h: "Cookies",
    p: "This website doesn't set marketing or analytics cookies. Your browser's session storage is used only to remember that you've already seen the intro animation.",
  },
];

export default function Privacy() {
  return (
    <>
      <main id="main" className="wrap pb-[var(--section-y)] pt-[calc(56px+max(12px,env(safe-area-inset-top))+48px)] lg:pt-[calc(60px+16px+72px)]">
        <p className="t-label text-mute">Last updated: October 2026</p>
        <h1 className="t-h1 mt-6 max-w-[14ch]">Privacy policy</h1>
        <div className="mt-[var(--section-gap)] grid max-w-[72ch] gap-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="t-h4">{s.h}</h2>
              <p className="mt-3 text-mute">{s.p}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer base="/" />
    </>
  );
}
