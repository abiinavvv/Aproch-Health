import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PsychologistCardGrid from "@/components/psychologists/PsychologistCardGrid";
import { getAllPsychologists } from "@/lib/psychologists";

export default function OurPsychologistPage() {
  const psychologists = getAllPsychologists();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="hero-gradient px-4 pt-24 pb-8 md:pb-12 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-[800px] text-center">
            <h1 className="font-display text-3xl font-bold leading-snug text-dark-text md:text-[clamp(3rem,5vw,5rem)]">
              Our Psychologists
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-body-text md:mt-4 md:text-lg">
              RCI-registered clinical psychologists who specialise in supporting students
              and young adults across India — online, confidential, and at your pace.
            </p>
          </div>
        </section>

        <section className="px-4 py-8 md:py-12 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <PsychologistCardGrid psychologists={psychologists} />
          </div>
        </section>

        <section className="px-4 pb-10 md:pb-16 lg:px-6">
          <div className="mx-auto max-w-[600px] text-center">
            <p className="text-sm text-body-text md:text-base">
              Not sure who to choose?{" "}
              <Link href="/book" className="font-semibold text-primary hover:underline">
                Start a general booking
              </Link>{" "}
              and pick your psychologist in the first step.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
