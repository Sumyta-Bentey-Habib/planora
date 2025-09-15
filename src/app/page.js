"use client";

import HomeEvents from "@/components/HomeEvents";
import { MainNav } from "@/components/MainNav";
import Slider from "@/components/Slider";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import FAQAccordion from "@/components/Accordion";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <>
    
      <MainNav />

      <Slider />

      <section className="py-16">
       
        <HomeEvents />
      </section>

      <Testimonials />

    
      <Reviews />

     
      <FAQAccordion />

      <Footer />
    </>
  );
}
