import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Tag from "@/components/ui/Tag";
import { psychologist } from "@/lib/psychologist";

export default function OurPsychologistPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="hero-gradient px-4 py-12 lg:px-6 lg:py-20">
          <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 md:flex-row md:gap-16">
            <Image
              src={psychologist.photo}
              alt={psychologist.name}
              width={280}
              height={280}
              className="rounded-2xl object-cover shadow-md"
              priority
            />
            <div>
              <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-dark-text">
                {psychologist.name}
              </h1>
              <p className="mt-2 text-lg text-body-text">
                {psychologist.designation}
              </p>
              <p className="mt-1 text-body-text">{psychologist.credentials}</p>
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="verified">✓ Verified by RCI</Badge>
                <span className="text-sm text-muted">{psychologist.rciNumber}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-[800px]">
            <h2 className="font-display text-2xl font-semibold text-dark-text">About</h2>
            <p className="mt-6 leading-[1.8] text-body-text">{psychologist.bio}</p>
          </div>
        </section>

        <section className="bg-hero-start px-4 py-12 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-[800px]">
            <h2 className="font-display text-2xl font-semibold text-dark-text">Specialties</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {psychologist.specialties.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-[800px] rounded-2xl bg-light-green/30 p-8 md:p-12">
            <span className="font-display text-6xl text-primary opacity-40">&ldquo;</span>
            <p className="mt-2 font-display text-xl italic leading-relaxed text-dark-text md:text-2xl">
              {psychologist.philosophy}
            </p>
            <p className="mt-6 font-medium text-body-text">— {psychologist.name}</p>
          </div>
        </section>

        <section className="px-4 py-12 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-[800px] rounded-2xl border border-border bg-white p-8 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-dark-text">Session details</h2>
            <dl className="mt-6 space-y-4 text-body-text">
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted">Duration</dt>
                <dd>30 min (Introductory) / 60 min (Full Session)</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted">Platform</dt>
                <dd>Google Meet (video or audio)</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted">Language</dt>
                <dd>{psychologist.languages.join(", ")}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Availability</dt>
                <dd>Updated weekly</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="px-4 pb-16 lg:px-6">
          <div className="mx-auto max-w-[800px]">
            <Button href="/book" variant="primary" fullWidth>
              Book a session with {psychologist.name.split(" ").pop()}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
