import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import PsychologistPhoto from "@/components/ui/PsychologistPhoto";
import {
  therapyBookingSteps,
  therapyCta,
  therapyUnderstanding,
  therapyValueProps,
} from "@/lib/therapy";
import {
  formatSessionFee,
  formatTherapyHours,
  getAllPsychologists,
} from "@/lib/psychologists";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Therapy",
  description:
    "Online therapy with qualified psychologists for students and young adults. Book a confidential introductory session with Aproch Health.",
  path: "/therapy",
});

export default function TherapyPage() {
  const psychologists = getAllPsychologists();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="hero-gradient px-4 pb-12 pt-24 md:pb-16 lg:px-6 lg:pb-20 lg:pt-28">
          <div className="mx-auto w-full max-w-[760px]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-body-text transition-colors hover:text-primary"
            >
              <ArrowLeft size={16} aria-hidden />
              Back to services
            </Link>

            <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-dark-text md:mt-8">
              Therapy
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-body-text md:mt-4 md:text-base md:leading-relaxed">
              Online, confidential sessions with psychologists who specialise in
              supporting students and young adults across India.
            </p>

            <div className="mt-6 space-y-3 md:mt-8 md:space-y-4">
              {therapyValueProps.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-border bg-white p-4 md:p-5"
                >
                  <h2 className="font-display text-base font-semibold text-dark-text md:text-lg">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-body-text">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <section className="mt-8 md:mt-10">
              <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
                Meet our psychologists
              </h2>
              <p className="mt-2 text-sm text-body-text">
                Available for online sessions.
              </p>
              <div className="mt-4 space-y-4 md:mt-5 md:space-y-5">
                {psychologists.map((psychologist) => (
                  <div
                    key={psychologist.slug}
                    className="rounded-3xl border border-border bg-white p-4 shadow-sm md:p-5"
                  >
                    <div className="flex gap-3.5 md:gap-4">
                      <div className="psychologist-photo-avatar relative h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-24 md:w-24">
                        <PsychologistPhoto
                          photo={psychologist.photo}
                          photoWebp={psychologist.photoWebp}
                          alt={psychologist.name}
                          fill
                          className="psychologist-photo"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-lg font-semibold text-dark-text md:text-xl">
                          {psychologist.name}
                        </p>
                        <p className="mt-0.5 text-sm text-body-text">
                          {psychologist.designation}
                        </p>
                        <p className="mt-1 text-xs text-muted md:text-sm">
                          {psychologist.credentials}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-body-text">
                      {formatTherapyHours(psychologist.sessionHours)}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-dark-text">
                      {formatSessionFee(psychologist.sessionFee)} per session ·
                      video or audio
                    </p>
                    {psychologist.tagline && (
                      <p className="mt-2 text-sm leading-relaxed text-body-text">
                        {psychologist.tagline}
                      </p>
                    )}
                    <div className="mt-5 space-y-3">
                      <Button
                        href={`/book?psychologist=${psychologist.slug}`}
                        variant="primary"
                        fullWidth
                      >
                        Book a Session
                      </Button>
                      <p className="text-center text-sm">
                        <Link
                          href={`/our-psychologist/${psychologist.slug}`}
                          className="font-medium text-primary hover:underline"
                        >
                          View full profile
                        </Link>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8 md:mt-10">
              <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
                Understanding therapy
              </h2>
              <div className="mt-4 space-y-3 md:mt-5 md:space-y-4">
                {therapyUnderstanding.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-border bg-white p-4 md:p-5"
                  >
                    <h3 className="font-semibold text-dark-text md:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-body-text">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8 md:mt-10">
              <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
                How to book your session
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-body-text">
                A few simple steps from choose to confirm.
              </p>
              <div className="mt-4 space-y-3 md:mt-5 md:space-y-3.5">
                {therapyBookingSteps.map((step, i) => (
                  <div
                    key={step.title}
                    className="rounded-3xl border border-border bg-white p-4 md:p-5"
                  >
                    <h3 className="font-semibold text-dark-text md:text-base">
                      {i + 1}. {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-body-text">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8 md:mt-10">
              <div className="rounded-3xl border border-border bg-hero-cream/80 p-5 md:p-6">
                <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
                  {therapyCta.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-body-text md:text-base">
                  {therapyCta.body}
                </p>
                <div className="mt-5">
                  <Button href="/book" variant="primary" fullWidth>
                    {therapyCta.buttonLabel}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
