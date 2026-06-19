import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeMain from "@/components/home/HomeMain";
import Hero from "@/components/home/Hero";
import MissionStats from "@/components/home/MissionStats";
import WhatWeDo from "@/components/home/WhatWeDo";
import HowItWorksSteps from "@/components/home/HowItWorksSteps";
import PsychologistPreviewCard from "@/components/home/PsychologistPreviewCard";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import FAQAccordion from "@/components/home/FAQAccordion";
import { homeFAQ } from "@/lib/faq";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeMain>
        <Hero />
        <MissionStats />
        <WhatWeDo />
        <HowItWorksSteps />
        <PsychologistPreviewCard />
        <TestimonialsCarousel />
        <FAQAccordion items={homeFAQ} />
      </HomeMain>
      <Footer />
    </>
  );
}
