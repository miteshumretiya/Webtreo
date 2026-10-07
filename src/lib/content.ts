export const site = {
  name: "Webtreo",
  tagline: "Web design & development studio",
  description:
    "Webtreo is an independent web design and development studio. We design and build fast, conversion-focused websites for startups and growing brands — strategy, UX, UI and Next.js under one roof.",
  email: "hello@webtreo.com",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Studio", href: "#studio" },
];

export const clients = [
  { name: "Fieldnote", style: "wide" },
  { name: "Voltline", style: "mono" },
  { name: "Northwind", style: "condensed" },
  { name: "Halcyon", style: "light" },
  { name: "Kiln & Co", style: "wide" },
  { name: "Orbital", style: "mono" },
  { name: "Lumen Labs", style: "condensed" },
  { name: "Pinecrest", style: "light" },
] as const;

export const heroStats = [
  { value: 164, suffix: "+", label: "websites launched since 2016" },
  { value: 97, suffix: "", label: "average Lighthouse score on delivery" },
];

export const capabilities = [
  "Strategy",
  "UX research",
  "UI design",
  "Copywriting",
  "Motion",
  "Next.js",
  "Webflow",
  "Headless CMS",
  "SEO",
  "Analytics",
];

export const services = [
  {
    no: "01",
    title: "Strategy & UX",
    text: "Workshops, audits and user interviews that turn fuzzy goals into a sitemap, wireframes and a plan everyone signs off on.",
    tags: ["Discovery", "Information architecture", "Wireframes"],
    image: "/media/work/fieldnote.webp",
  },
  {
    no: "02",
    title: "Web design",
    text: "Distinctive interfaces with a real design system behind them — typography, components and motion that scale past launch day.",
    tags: ["UI design", "Design systems", "Prototyping"],
    image: "/media/work/halcyon.webp",
  },
  {
    no: "03",
    title: "Development",
    text: "Hand-built Next.js and Webflow sites that load in under a second, score 95+ on Lighthouse and are a joy to edit.",
    tags: ["Next.js", "Webflow", "Headless CMS"],
    image: "/media/work/voltline.webp",
  },
  {
    no: "04",
    title: "Growth & care",
    text: "A/B tests, landing pages, SEO and monthly improvements, so the site keeps earning its keep long after launch.",
    tags: ["CRO", "SEO", "Retainers"],
    image: "/media/work/orbital.webp",
  },
];

export const steps = [
  {
    no: "01",
    title: "Discover",
    duration: "Week 1",
    text: "A two-hour workshop, a teardown of your current site and competitors, and interviews with your best customers. You get a one-page brief and a clear definition of success.",
    deliverables: ["Kick-off workshop", "Site & analytics audit", "Project brief"],
  },
  {
    no: "02",
    title: "Structure",
    duration: "Week 2",
    text: "We map every page to a goal, write the key messages and wireframe the flows. Nothing gets designed until the structure makes sense on paper.",
    deliverables: ["Sitemap", "Messaging framework", "Wireframes"],
  },
  {
    no: "03",
    title: "Design",
    duration: "Weeks 3–4",
    text: "Two visual directions, one winner. We refine it into a full component system with real copy, motion studies and a clickable prototype.",
    deliverables: ["2 art directions", "UI kit", "Interactive prototype"],
  },
  {
    no: "04",
    title: "Build",
    duration: "Weeks 4–6",
    text: "Clean, accessible code on Next.js or Webflow, wired to a CMS your team will actually enjoy. Every page is tested on real devices before you see it.",
    deliverables: ["Production build", "CMS & integrations", "QA on 14 devices"],
  },
  {
    no: "05",
    title: "Launch & grow",
    duration: "Ongoing",
    text: "We launch, monitor and measure. Then we keep shipping improvements based on what your analytics — not our opinions — tell us.",
    deliverables: ["Launch plan", "Analytics dashboard", "30–90 days care"],
  },
];

export const work = [
  {
    slug: "fieldnote",
    client: "Fieldnote",
    title: "Product analytics that reads like a story",
    sector: "B2B SaaS",
    year: "2026",
    services: ["Strategy", "UI design", "Next.js"],
    result: "+64% demo requests",
    image: "/media/work/fieldnote.webp",
    alt: "Fieldnote website homepage with an analytics dashboard and bold headline",
  },
  {
    slug: "voltline",
    client: "Voltline",
    title: "Charging network for the electric decade",
    sector: "Mobility",
    year: "2026",
    services: ["Web design", "Motion", "Webflow"],
    result: "2.1× app installs",
    image: "/media/work/voltline.webp",
    alt: "Voltline website with a dark map of charging routes and live station stats",
  },
  {
    slug: "northwind",
    client: "Northwind Roasters",
    title: "Specialty coffee, delivered on your schedule",
    sector: "E-commerce",
    year: "2025",
    services: ["E-commerce", "UI design", "Shopify"],
    result: "+212% subscriptions",
    image: "/media/work/northwind.webp",
    alt: "Northwind Roasters shop page with illustrated coffee bags in warm tones",
  },
  {
    slug: "halcyon",
    client: "Halcyon Health",
    title: "Booking a doctor in under a minute",
    sector: "Healthcare",
    year: "2025",
    services: ["UX research", "Web design", "Next.js"],
    result: "−48% booking drop-off",
    image: "/media/work/halcyon.webp",
    alt: "Halcyon Health website with an appointment booking card on a calm green layout",
  },
  {
    slug: "kiln",
    client: "Kiln & Co",
    title: "Handmade ceramics with a digital home",
    sector: "Retail",
    year: "2025",
    services: ["Art direction", "E-commerce", "CMS"],
    result: "+87% average order value",
    image: "/media/work/kiln.webp",
    alt: "Kiln & Co online store showing sculpted vases on a sand-coloured page",
  },
  {
    slug: "orbital",
    client: "Orbital",
    title: "Banking for people who build things",
    sector: "Fintech",
    year: "2024",
    services: ["Brand site", "Motion", "Next.js"],
    result: "38k waitlist sign-ups",
    image: "/media/work/orbital.webp",
    alt: "Orbital fintech website with gradient payment cards and a phone app preview",
  },
];

export const plans = [
  {
    name: "Launch",
    tags: ["Startups", "4–5 weeks"],
    price: 7900,
    blurb: "A sharp, fast marketing site that makes a small team look like the category leader.",
    features: [
      "Discovery workshop & sitemap",
      "Up to 6 unique page templates",
      "Custom UI design, 2 concepts",
      "Responsive Next.js or Webflow build",
      "CMS setup & team training",
      "Technical SEO & analytics",
      "30 days of post-launch care",
    ],
    featured: false,
  },
  {
    name: "Growth",
    tags: ["Scale-ups", "8–10 weeks"],
    price: 16500,
    blurb: "A conversion-led website system for brands that are ready to scale marketing.",
    features: [
      "Everything in Launch, plus:",
      "UX research & customer interviews",
      "Up to 14 templates + component library",
      "Motion & interaction design",
      "Landing page kit for campaigns",
      "CRM, booking & payment integrations",
      "90 days of care + A/B testing setup",
    ],
    featured: true,
  },
];

export const team = [
  {
    name: "Aria Novak",
    role: "Founder & Creative Director",
    years: "14 yrs",
    focus: "Art direction",
    portrait: "/media/team/aria.svg",
  },
  {
    name: "Dev Malhotra",
    role: "Head of Engineering",
    years: "11 yrs",
    focus: "Next.js · WebGL",
    portrait: "/media/team/dev.svg",
  },
  {
    name: "Lena Ortiz",
    role: "Senior UX Strategist",
    years: "9 yrs",
    focus: "Research",
    portrait: "/media/team/lena.svg",
  },
  {
    name: "Theo Brandt",
    role: "Motion Designer",
    years: "7 yrs",
    focus: "Interaction",
    portrait: "/media/team/theo.svg",
  },
];

export const metrics = [
  { value: 164, suffix: "", label: "websites shipped" },
  { value: 38, suffix: "", label: "industries served" },
  { value: 2.4, suffix: "×", label: "average lift in qualified leads", decimals: 1 },
  { value: 0.9, suffix: "s", label: "median LCP on launched sites", decimals: 1 },
];

export const testimonials = [
  {
    quote: "They rebuilt our site in five weeks and demo requests went up 64% the following quarter. The calmest launch I've ever been part of.",
    name: "Maya Chen",
    role: "VP Marketing, Fieldnote",
  },
  {
    quote: "Webtreo asked better questions about our customers than we did. The new booking flow paid for the whole project in a month.",
    name: "Dr. Samuel Reyes",
    role: "COO, Halcyon Health",
  },
  {
    quote: "Fixed price, weekly demos, zero surprises. Our team edits the site daily now — we used to dread touching it.",
    name: "Jonas Weber",
    role: "Founder, Northwind Roasters",
  },
  {
    quote: "The motion work made our product feel inevitable. Investors kept mentioning the website in our raise.",
    name: "Priya Raman",
    role: "CEO, Orbital",
  },
  {
    quote: "Senior people from the first call to launch day. No hand-offs, no juniors learning on our budget.",
    name: "Elliot Park",
    role: "Head of Brand, Voltline",
  },
  {
    quote: "Our old site took six seconds to load. The new one takes under one, and organic traffic doubled.",
    name: "Hana Kobayashi",
    role: "Owner, Kiln & Co",
  },
];

export const budgets = ["< $10k", "$10–25k", "$25–50k", "$50k +"];
export const projectTypes = ["New website", "Redesign", "E-commerce", "Landing page", "Ongoing care"];

export const cases: Record<
  string,
  { summary: string; challenge: string; approach: string[]; metrics: { value: string; label: string }[]; quote: number }
> = {
  fieldnote: {
    summary: "A narrative-led marketing site and demo funnel for a product analytics platform selling to product teams.",
    challenge:
      "Fieldnote's old site listed forty features and explained none of them. Visitors bounced before reaching the product tour, and sales calls opened with “so what does it actually do?”",
    approach: [
      "Rebuilt the story around three jobs-to-be-done instead of a feature list",
      "Designed an interactive dashboard hero that demos the product in eight seconds",
      "Shipped on Next.js with a headless CMS so marketing can launch pages without engineering",
    ],
    metrics: [
      { value: "+64%", label: "demo requests in the first quarter" },
      { value: "−38%", label: "bounce rate on paid landing pages" },
      { value: "0.8s", label: "largest contentful paint on mobile" },
    ],
    quote: 0,
  },
  voltline: {
    summary: "Brand site and live station map for a fast-growing EV charging network across 28 countries.",
    challenge:
      "Drivers didn't trust that a Voltline charger would be free when they arrived. The site had to prove reliability before asking anyone to install another app.",
    approach: [
      "Put live availability front and centre with a real-time station card",
      "Built a dark, map-first art direction with motion that mirrors charging",
      "Created separate journeys for drivers, fleets and site hosts",
    ],
    metrics: [
      { value: "2.1×", label: "app installs from the website" },
      { value: "+46%", label: "host enquiries from businesses" },
      { value: "99", label: "Lighthouse accessibility score" },
    ],
    quote: 4,
  },
  northwind: {
    summary: "A subscription-first coffee shop that makes picking beans feel like talking to a barista.",
    challenge:
      "Most of Northwind's revenue came from one-off orders that never repeated. Subscriptions were buried three clicks deep behind a confusing form.",
    approach: [
      "Made the subscription the hero, with a 30-second taste quiz",
      "Illustrated packaging system that scales to every new origin",
      "Simplified checkout to a single page with saved preferences",
    ],
    metrics: [
      { value: "+212%", label: "active subscriptions in six months" },
      { value: "+31%", label: "average order value" },
      { value: "4.8/5", label: "post-purchase satisfaction" },
    ],
    quote: 2,
  },
  halcyon: {
    summary: "Patient-facing booking for a network of 40 clinics — from symptom to confirmed appointment in under a minute.",
    challenge:
      "Halcyon lost nearly half of its patients during online booking. Prices were hidden, availability was unclear and the flow broke on older phones.",
    approach: [
      "Ran twelve patient interviews and usability tests before designing a screen",
      "Designed a calm, high-contrast booking card that works one-handed",
      "Showed prices and insurance coverage before the final step",
    ],
    metrics: [
      { value: "−48%", label: "booking drop-off" },
      { value: "52s", label: "median time to book" },
      { value: "AA", label: "WCAG 2.2 conformance" },
    ],
    quote: 1,
  },
  kiln: {
    summary: "An editorial online store for a small-batch ceramics studio in Lisbon.",
    challenge:
      "Every piece Kiln & Co makes is one of a kind, but their template store made handmade work look mass-produced — and it took six seconds to load.",
    approach: [
      "Art-directed a slow, editorial layout that gives each piece room to breathe",
      "Built drop-based collections with waitlists for sold-out glazes",
      "Optimised every image pipeline for sub-second loads",
    ],
    metrics: [
      { value: "+87%", label: "average order value" },
      { value: "2×", label: "organic search traffic" },
      { value: "0.9s", label: "page load, down from 6.1s" },
    ],
    quote: 5,
  },
  orbital: {
    summary: "Pre-launch brand site and waitlist for a business bank built for founders and studios.",
    challenge:
      "Orbital needed to look as trustworthy as a bank and as fast as a startup — with no product screenshots ready on launch day.",
    approach: [
      "Developed a motion language around cards, orbits and momentum",
      "Designed product UI previews in collaboration with the founding team",
      "Built a referral-powered waitlist with live position updates",
    ],
    metrics: [
      { value: "38k", label: "waitlist sign-ups before launch" },
      { value: "27%", label: "of sign-ups came from referrals" },
      { value: "3", label: "investor intros that cited the site" },
    ],
    quote: 3,
  },
};
