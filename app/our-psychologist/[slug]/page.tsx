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
        <section className="hero-gradient px-4 pt-24 pb-4 lg:px-6 lg:pt-24 lg:pb-6">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-[minmax(200px,280px)_1fr] md:items-start md:gap-x-8">
            <div className="psychologist-photo-profile-frame relative mx-auto aspect-[14/15] w-full max-w-[280px] overflow-hidden rounded-2xl ring-2 ring-hero-accent/25 md:col-start-1 md:row-start-1 md:mx-0 md:self-start">
              <PsychologistPhoto
                photo={psychologist.photo}
                photoWebp={psychologist.photoWebp}
                alt={psychologist.name}
                priority
                fill
                className="psychologist-photo psychologist-photo-profile"
              />
            </div>
            <div className="flex flex-col gap-3 md:col-start-2 md:row-start-1">
              <div className="text-center md:pt-0 md:text-left">
                <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-dark-text">
                  {psychologist.name}
                </h1>
                <p className="mt-2 text-lg text-body-text">{psychologist.designation}</p>
                <p className="mt-1 text-body-text">{psychologist.credentials}</p>
                <p className="mt-2 text-sm text-muted">
                  {formatTherapyHours(psychologist.sessionHours)}
                </p>
                {psychologist.rciNumber && (
                  <div className="mt-4 flex items-center justify-center gap-2 md:justify-start">
                    <Badge variant="verified">✓ Verified by RCI</Badge>
                    <span className="text-sm text-muted">{psychologist.rciNumber}</span>
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-dark-text">About</h2>
                <p className="mt-2 leading-[1.8] text-body-text">{psychologist.bio}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-10 lg:px-6 lg:pb-12">
          <div className="mx-auto max-w-[800px]">
            <div className="border-t border-border pt-6 lg:pt-8">
              <h2 className="font-display text-2xl font-semibold text-dark-text">Specialties</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {psychologist.specialties.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-6 lg:px-6 lg:py-8">
          <div className="mx-auto max-w-[800px] rounded-2xl bg-light-green/30 p-6 md:p-8 lg:p-8">
            <span className="font-display text-5xl text-primary opacity-40">&ldquo;</span>
            <p className="mt-2 font-display text-xl italic leading-relaxed text-dark-text md:text-2xl">
              {psychologist.philosophy}
            </p>
            <p className="mt-6 font-medium text-body-text">— {psychologist.name}</p>
          </div>
        </section>

        <section className="px-4 py-6 lg:px-6 lg:py-8">
          <div className="mx-auto max-w-[800px] rounded-2xl border border-border bg-white p-6 shadow-sm lg:p-8">
            <h2 className="font-display text-xl font-semibold text-dark-text">Session details</h2>
            <dl className="mt-4 space-y-4 text-body-text">
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted">Duration</dt>
                <dd>30 min (Introductory) / 60 min (Full Session)</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted">Session fee</dt>
                <dd>{formatSessionFee(psychologist.sessionFee)}</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted">Mode</dt>
                <dd>Video or audio (same fee)</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted">Platform</dt>
                <dd>Google Meet (video or audio)</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted">Language</dt>
                <dd>{psychologist.languages.join(", ")}</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted">Therapy experience</dt>
                <dd>{psychologist.sessionHours} hours</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Availability</dt>
                <dd>Updated weekly</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="px-4 pb-10 pt-4 lg:px-6 lg:pb-12 lg:pt-6">
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
