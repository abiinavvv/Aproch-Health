import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Tag from "@/components/ui/Tag";
import PsychologistPhoto from "@/components/ui/PsychologistPhoto";
import {
  getAllPsychologists,
  getPsychologistBySlug,
  getPsychologistFirstName,
  formatTherapyHours,
  formatSessionFee,
} from "@/lib/psychologists";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPsychologists().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const psychologist = getPsychologistBySlug(slug);
  if (!psychologist) return { title: "Psychologist not found" };

  return pageMetadata({
    title: psychologist.name,
    description: `${psychologist.designation} — ${psychologist.credentials}. Book an online session with ${psychologist.name} at Aproch Health.`,
    path: `/our-psychologist/${slug}`,
  });
}

export default async function PsychologistProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const psychologist = getPsychologistBySlug(slug);
  if (!psychologist) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="hero-gradient px-4 pt-24 pb-6 md:pb-8 lg:px-6 lg:pt-24 lg:pb-6">
          <div className="mx-auto max-w-[1200px] md:grid md:grid-cols-[minmax(200px,280px)_1fr] md:items-start md:gap-x-8 md:gap-y-6">
            <div className="flex items-start gap-3.5 md:contents">
              <div className="psychologist-photo-profile-frame relative h-[120px] w-[112px] shrink-0 overflow-hidden rounded-xl ring-2 ring-hero-accent/25 md:col-start-1 md:row-start-1 md:h-auto md:aspect-[14/15] md:w-full md:max-w-[280px] md:rounded-2xl md:self-start">
                <PsychologistPhoto
                  photo={psychologist.photo}
                  photoWebp={psychologist.photoWebp}
                  alt={psychologist.name}
                  priority
                  fill
                  className="psychologist-photo psychologist-photo-profile"
                />
              </div>
              <div className="min-w-0 flex-1 text-left md:col-start-2 md:row-start-1 md:flex md:flex-col md:gap-5">
                <div className="md:pt-0">
                  <h1 className="font-display text-xl font-bold leading-snug text-dark-text md:text-[clamp(2rem,4vw,3rem)]">
                    {psychologist.name}
                  </h1>
                  <p className="mt-1.5 text-xs text-body-text md:mt-2 md:text-lg">{psychologist.designation}</p>
                  <p className="mt-1 text-xs text-body-text md:mt-1 md:text-base">{psychologist.credentials}</p>
                  <p className="mt-1.5 text-[11px] text-muted md:mt-2 md:text-sm">
                    {formatTherapyHours(psychologist.sessionHours)}
                  </p>
                  {psychologist.rciNumber && (
                    <div className="mt-2 flex flex-wrap items-center justify-start gap-1.5 md:mt-4 md:gap-2">
                      <Badge variant="verified">✓ Verified by RCI</Badge>
                      <span className="text-[11px] text-muted md:text-sm">{psychologist.rciNumber}</span>
                    </div>
                  )}
                </div>
                <div className="hidden md:block">
                  <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">About</h2>
                  <p className="mt-2 text-sm leading-[1.7] text-body-text md:mt-2 md:text-base md:leading-[1.8]">{psychologist.bio}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 md:hidden">
              <h2 className="font-display text-xl font-semibold text-dark-text">About</h2>
              <p className="mt-2 text-sm leading-[1.7] text-body-text">{psychologist.bio}</p>
            </div>
          </div>
        </section>

        <section className="px-4 pb-8 md:pb-10 lg:px-6 lg:pb-12">
          <div className="mx-auto max-w-[800px]">
            <div className="border-t border-border pt-5 md:pt-6 lg:pt-8">
              <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">Specialties</h2>
              <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
                {psychologist.specialties.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-4 md:py-6 lg:px-6 lg:py-8">
          <div className="mx-auto max-w-[800px] rounded-2xl bg-light-green/30 p-5 md:p-6 lg:p-8">
            <span className="font-display text-3xl text-primary opacity-40 md:text-5xl">&ldquo;</span>
            <p className="mt-1 font-display text-base italic leading-relaxed text-dark-text md:mt-2 md:text-xl md:leading-relaxed lg:text-2xl">
              {psychologist.philosophy}
            </p>
            <p className="mt-4 text-sm font-medium text-body-text md:mt-6 md:text-base">— {psychologist.name}</p>
          </div>
        </section>

        <section className="px-4 py-4 md:py-6 lg:px-6 lg:py-8">
          <div className="mx-auto max-w-[800px] rounded-2xl border border-border bg-white p-5 shadow-sm md:p-6 lg:p-8">
            <h2 className="font-display text-lg font-semibold text-dark-text md:text-xl">Session details</h2>
            <dl className="mt-3 space-y-3 text-sm text-body-text md:mt-4 md:space-y-4 md:text-base">
              <div className="flex flex-col gap-1 border-b border-border pb-3 max-md:pb-4 md:flex-row md:justify-between md:gap-4 md:pb-3">
                <dt className="text-xs text-muted max-md:font-medium md:text-sm">Duration</dt>
                <dd className="max-md:text-sm max-md:leading-relaxed">30 min (Introductory) / 60 min (Full Session)</dd>
              </div>
              <div className="flex flex-col gap-1 border-b border-border pb-3 max-md:pb-4 md:flex-row md:justify-between md:gap-4 md:pb-3">
                <dt className="text-xs text-muted max-md:font-medium md:text-sm">Session fee</dt>
                <dd className="max-md:text-sm max-md:leading-relaxed">{formatSessionFee(psychologist.sessionFee)}</dd>
              </div>
              <div className="flex flex-col gap-1 border-b border-border pb-3 max-md:pb-4 md:flex-row md:justify-between md:gap-4 md:pb-3">
                <dt className="text-xs text-muted max-md:font-medium md:text-sm">Mode</dt>
                <dd className="max-md:text-sm max-md:leading-relaxed">Video or audio (same fee)</dd>
              </div>
              <div className="flex flex-col gap-1 border-b border-border pb-3 max-md:pb-4 md:flex-row md:justify-between md:gap-4 md:pb-3">
                <dt className="text-xs text-muted max-md:font-medium md:text-sm">Platform</dt>
                <dd className="max-md:text-sm max-md:leading-relaxed">Google Meet (video or audio)</dd>
              </div>
              <div className="flex flex-col gap-1 border-b border-border pb-3 max-md:pb-4 md:flex-row md:justify-between md:gap-4 md:pb-3">
                <dt className="text-xs text-muted max-md:font-medium md:text-sm">Language</dt>
                <dd className="max-md:text-sm max-md:leading-relaxed">{psychologist.languages.join(", ")}</dd>
              </div>
              <div className="flex flex-col gap-1 border-b border-border pb-3 max-md:pb-4 md:flex-row md:justify-between md:gap-4 md:pb-3">
                <dt className="text-xs text-muted max-md:font-medium md:text-sm">Therapy experience</dt>
                <dd className="max-md:text-sm max-md:leading-relaxed">{psychologist.sessionHours} hours</dd>
              </div>
              <div className="flex flex-col gap-1 max-md:pb-1 md:flex-row md:justify-between md:gap-4">
                <dt className="text-xs text-muted max-md:font-medium md:text-sm">Availability</dt>
                <dd className="max-md:text-sm max-md:leading-relaxed">Updated weekly</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="px-4 pb-8 pt-2 md:pb-10 md:pt-4 lg:px-6 lg:pb-12 lg:pt-6">
          <div className="mx-auto max-w-[800px] space-y-4">
            <Button
              href={`/book?psychologist=${psychologist.slug}`}
              variant="primary"
              fullWidth
            >
              Book a session with {getPsychologistFirstName(psychologist.name)}
            </Button>
            <p className="text-center text-sm text-muted">
              <Link href="/our-psychologist" className="text-primary hover:underline">
                ← View all psychologists
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
