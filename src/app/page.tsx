import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { QuickBooking } from "@/components/sections/QuickBooking";
import { WhyUs } from "@/components/sections/WhyUs";
import { PopularProducts } from "@/components/sections/PopularProducts";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * problem → solution → action → trust → products → reassurance → proof → action
 *
 * The hero headline is the page's only h1; there is deliberately no
 * visible "Domov" title.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <QuickBooking />
      <WhyUs />
      <PopularProducts />
      <Process />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
