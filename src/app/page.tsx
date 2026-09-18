import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Works } from "@/components/sections/Works";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Works />
      <Process />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
