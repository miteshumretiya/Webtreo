import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Showreel } from "@/components/sections/Showreel";
import { Pricing } from "@/components/sections/Pricing";
import { Studio } from "@/components/sections/Studio";
import { Numbers } from "@/components/sections/Numbers";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { MotionRoot } from "@/components/motion/MotionRoot";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Services />
        <Process />
        <Work />
        <Showreel />
        <Pricing />
        <Studio />
        <Numbers />
        <Contact />
      </main>
      <Footer />
      {/* mounted last so its effect runs after every section above has hydrated */}
      <MotionRoot />
    </>
  );
}
