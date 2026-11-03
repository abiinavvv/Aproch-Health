import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import PsychologistPhoto from "@/components/ui/PsychologistPhoto";
import {
  formatNutritionFee,
  nutritionConsultOffer,
  nutritionCta,
  nutritionPackageOffer,
  nutritionProgramDisclaimer,
  nutritionProgramSteps,
  nutritionValueProps,
  nutritionWhyImportant,
} from "@/lib/nutrition";
import { getDefaultNutritionist } from "@/lib/nutritionists";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Food & Nutrition",
  description:
    "Online nutrition consultation and 1-month support with a clinical dietitian. Book a consult for ₹400 or a package for ₹3,499.",
  path: "/nutrition",
});

export default function NutritionPage() {
  const nutritionist = getDefaultNutritionist();
  const bookHref = `/book?service=nutrition&nutritionist=${nutritionist.slug}`;

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

            <h1 className="mt-6 font-display text-3xl font-bold leading-snug text-dark-text md:mt-8 md:text-[clamp(2.25rem,4vw,3.25rem)]">
              Food & Nutrition
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-body-text md:mt-4 md:text-base md:leading-relaxed">
              Online support with a clinical dietitian — clear plans, practical
              guidance, and habits that fit your life.
            </p>

            <div className="mt-6 space-y-3 md:mt-8 md:space-y-4">
              {nutritionValueProps.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-white p-4 md:p-5"
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
                Meet your nutrition professional
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-4 shadow-sm md:mt-5 md:p-5">
                <div className="flex gap-3.5 md:gap-4">
                  <div className="psychologist-photo-avatar relative h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-24 md:w-24">
                    <PsychologistPhoto
                      photo={nutritionist.photo}
                      photoWebp={nutritionist.photoWebp}
                      alt={nutritionist.name}
                      fill
                      className="psychologist-photo"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg font-semibold text-dark-text md:text-xl">
                      {nutritionist.name}
                    </p>
                    <p className="mt-0.5 text-sm text-body-text">
                      {nutritionist.designation}
                    </p>
                    <p className="mt-1 text-xs text-muted md:text-sm">
                      {nutritionist.credentials}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-body-text">
                  {nutritionist.bio}
                </p>
                <p className="mt-2 text-xs text-muted">
                  Speaks {nutritionist.languages.join(", ")} · Consult from{" "}
                  {formatNutritionFee(nutritionist.sessionFee)}
                </p>
                <div className="mt-5 space-y-3">
                  <Button href={bookHref} variant="primary" fullWidth>
                    Book a consultation
                  </Button>
                  <p className="text-center text-sm">
                    <Link
                      href={`/nutrition/${nutritionist.slug}`}
                      className="font-medium text-primary hover:underline"
                    >
                      View full profile
                    </Link>
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-8 md:mt-10">
              <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
                Consultation & package pricing
              </h2>
              <div className="mt-4 space-y-3 md:mt-5 md:space-y-4">
                <div className="rounded-2xl border border-border bg-white p-4 md:p-5">
                  <h3 className="font-semibold text-dark-text md:text-lg">
                    {nutritionConsultOffer.label} ·{" "}
                    {formatNutritionFee(nutritionConsultOffer.price)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body-text">
                    {nutritionConsultOffer.description}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-4 md:p-5">
                  <h3 className="font-semibold text-dark-text md:text-lg">
                    {nutritionPackageOffer.label} ·{" "}
                    {formatNutritionFee(nutritionPackageOffer.price)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body-text">
                    {nutritionPackageOffer.description}
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-8 md:mt-10">
              <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
                Your month of nutrition support
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-body-text">
                How the 1-month package typically unfolds.
              </p>
              <div className="mt-4 space-y-3 md:mt-5 md:space-y-3.5">
                {nutritionProgramSteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-border bg-white p-4 md:p-5"
                  >
                    <h3 className="font-semibold text-dark-text md:text-base">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-body-text">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs leading-relaxed text-muted md:mt-5">
                {nutritionProgramDisclaimer}
              </p>
            </section>

            <section className="mt-8 md:mt-10">
              <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
                Why we think this is important
              </h2>
              <div className="mt-4 space-y-3 md:mt-5 md:space-y-4">
                {nutritionWhyImportant.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border bg-white p-4 md:p-5"
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
              <div className="rounded-2xl border border-border bg-hero-cream/80 p-5 md:p-6">
                <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
                  {nutritionCta.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-body-text md:text-base">
                  {nutritionCta.body}
                </p>
                <div className="mt-5">
                  <Button href={bookHref} variant="primary" fullWidth>
                    {nutritionCta.buttonLabel}
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
