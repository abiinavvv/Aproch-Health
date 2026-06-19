import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeMain from "@/components/home/HomeMain";
import Hero from "@/components/home/Hero";
import { homeFAQ } from "@/lib/faq";

const MissionStats = dynamic(() => import("@/components/home/MissionStats"));
const WhatWeDo = dynamic(() => import("@/components/home/WhatWeDo"));
const HowItWorksSteps = dynamic(() => import("@/components/home/HowItWorksSteps"));
const PsychologistPreviewCard = dynamic(
  () => import("@/components/home/PsychologistPreviewCard")
);
const TestimonialsCarousel = dynamic(
  () => import("@/components/home/TestimonialsCarousel")
);
const FAQAccordion = dynamic(() => import("@/components/home/FAQAccordion"));

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
