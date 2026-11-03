import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import PsychologistPhoto from "@/components/ui/PsychologistPhoto";
import {
  getAllNutritionists,
  getNutritionistBySlug,
  formatNutritionHours,
} from "@/lib/nutritionists";
import {
  formatNutritionFee,
  nutritionConsultOffer,
  nutritionPackageOffer,
} from "@/lib/nutrition";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllNutritionists().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const nutritionist = getNutritionistBySlug(slug);
  if (!nutritionist) return { title: "Nutritionist not found" };

  return pageMetadata({
    title: nutritionist.name,
    description: `${nutritionist.designation}. Book online nutrition support with ${nutritionist.name} at Aproch Health.`,
    path: `/nutrition/${slug}`,
  });
}

function firstName(name: string) {
  return name.split(" ")[0] ?? name;
}

export default async function NutritionistProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const nutritionist = getNutritionistBySlug(slug);
  if (!nutritionist) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="hero-gradient px-4 pt-24 pb-6 md:pb-8 lg:px-6 lg:pt-24 lg:pb-6">
          <div className="mx-auto max-w-[1200px] md:grid md:grid-cols-[minmax(200px,280px)_1fr] md:items-start md:gap-x-8 md:gap-y-6">
            <div className="flex items-start gap-3.5 md:contents">
              <div className="psychologist-photo-profile-frame relative h-[120px] w-[112px] shrink-0 overflow-hidden rounded-xl ring-2 ring-hero-accent/25 md:col-start-1 md:row-start-1 md:h-auto md:aspect-[14/15] md:w-full md:max-w-[280px] md:rounded-2xl md:self-start">
                <PsychologistPhoto
                  photo={nutritionist.photo}
                  photoWebp={nutritionist.photoWebp}
                  alt={nutritionist.name}
                  priority
                  fill
                  className="psychologist-photo psychologist-photo-profile"
                />
              </div>
              <div className="min-w-0 flex-1 text-left md:col-start-2 md:row-start-1 md:flex md:flex-col md:gap-5">
                <div className="md:pt-0">
                  <h1 className="font-display text-xl font-bold leading-snug text-dark-text md:text-[clamp(2rem,4vw,3rem)]">
                    {nutritionist.name}
                  </h1>
                  <p className="mt-1.5 text-xs text-body-text md:mt-2 md:text-lg">
                    {nutritionist.designation}
                  </p>
                  <p className="mt-1 text-xs text-body-text md:mt-1 md:text-base">
                    {nutritionist.credentials}
                  </p>
                  <p className="mt-1.5 text-[11px] text-muted md:mt-2 md:text-sm">
                    {formatNutritionHours(nutritionist.sessionHours)}
                  </p>
                </div>
                <div className="hidden md:block">
                  <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
                    About
                  </h2>
                  <p className="mt-2 text-sm leading-[1.7] text-body-text md:mt-2 md:text-base md:leading-[1.8]">
                    {nutritionist.bio}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 md:hidden">
              <h2 className="font-display text-xl font-semibold text-dark-text">
                About
              </h2>
              <p className="mt-2 text-sm leading-[1.7] text-body-text">
                {nutritionist.bio}
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 pb-8 md:pb-10 lg:px-6 lg:pb-12">
          <div className="mx-auto max-w-[800px]">
            <div className="border-t border-border pt-5 md:pt-6 lg:pt-8">
              <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
                Specialties
              </h2>
              <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
                {nutritionist.specialties.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-4 md:py-6 lg:px-6 lg:py-8">
          <div className="mx-auto max-w-[800px] rounded-2xl bg-light-green/30 p-5 md:p-6 lg:p-8">
            <span className="font-display text-3xl text-primary opacity-40 md:text-5xl">
              &ldquo;
            </span>
            <p className="mt-1 font-display text-base italic leading-relaxed text-dark-text md:mt-2 md:text-xl md:leading-relaxed lg:text-2xl">
              {nutritionist.philosophy}
            </p>
            <p className="mt-4 text-sm font-medium text-body-text md:mt-6 md:text-base">
              — {nutritionist.name}
            </p>
          </div>
        </section>

        <section className="px-4 py-4 md:py-6 lg:px-6 lg:py-8">
          <div className="mx-auto max-w-[800px] rounded-2xl border border-border bg-white p-5 shadow-sm md:p-6 lg:p-8">
            <h2 className="font-display text-lg font-semibold text-dark-text md:text-xl">
              Session details
            </h2>
            <dl className="mt-3 space-y-3 text-sm text-body-text md:mt-4 md:space-y-4 md:text-base">
              <div className="flex flex-col gap-1 border-b border-border pb-3 max-md:pb-4 md:flex-row md:justify-between md:gap-4 md:pb-3">
                <dt className="text-xs text-muted max-md:font-medium md:text-sm">
                  Initial consultation
                </dt>
                <dd className="max-md:text-sm max-md:leading-relaxed">
                  {nutritionConsultOffer.duration} min ·{" "}
                  {formatNutritionFee(nutritionConsultOffer.price)}
                </dd>
              </div>
              <div className="flex flex-col gap-1 border-b border-border pb-3 max-md:pb-4 md:flex-row md:justify-between md:gap-4 md:pb-3">
                <dt className="text-xs text-muted max-md:font-medium md:text-sm">
                  1-month package
                </dt>
                <dd className="max-md:text-sm max-md:leading-relaxed">
                  {formatNutritionFee(nutritionPackageOffer.price)}
                </dd>
              </div>
              <div className="flex flex-col gap-1 border-b border-border pb-3 max-md:pb-4 md:flex-row md:justify-between md:gap-4 md:pb-3">
                <dt className="text-xs text-muted max-md:font-medium md:text-sm">
                  Mode
                </dt>
                <dd className="max-md:text-sm max-md:leading-relaxed">
                  Video or audio (same fee)
                </dd>
              </div>
              <div className="flex flex-col gap-1 border-b border-border pb-3 max-md:pb-4 md:flex-row md:justify-between md:gap-4 md:pb-3">
                <dt className="text-xs text-muted max-md:font-medium md:text-sm">
                  Platform
                </dt>
                <dd className="max-md:text-sm max-md:leading-relaxed">
                  Google Meet (video or audio)
                </dd>
              </div>
              <div className="flex flex-col gap-1 border-b border-border pb-3 max-md:pb-4 md:flex-row md:justify-between md:gap-4 md:pb-3">
                <dt className="text-xs text-muted max-md:font-medium md:text-sm">
                  Language
                </dt>
                <dd className="max-md:text-sm max-md:leading-relaxed">
                  {nutritionist.languages.join(", ")}
                </dd>
              </div>
              <div className="flex flex-col gap-1 max-md:pb-1 md:flex-row md:justify-between md:gap-4">
                <dt className="text-xs text-muted max-md:font-medium md:text-sm">
                  Availability
                </dt>
                <dd className="max-md:text-sm max-md:leading-relaxed">
                  Updated weekly
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="px-4 pb-8 pt-2 md:pb-10 md:pt-4 lg:px-6 lg:pb-12 lg:pt-6">
          <div className="mx-auto max-w-[800px] space-y-4">
            <Button
              href={`/book?service=nutrition&nutritionist=${nutritionist.slug}`}
              variant="primary"
              fullWidth
            >
              Book with {firstName(nutritionist.name)}
            </Button>
            <p className="text-center text-sm text-muted">
              <Link href="/nutrition" className="text-primary hover:underline">
                ← Back to Food & Nutrition
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
