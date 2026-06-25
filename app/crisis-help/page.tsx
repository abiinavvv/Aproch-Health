import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CrisisHelplinesPanel from "@/components/crisis/CrisisHelplinesPanel";
import { CRISIS_LOCATION } from "@/lib/crisis-helplines";

export default function CrisisHelpPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-hero-cream/40 px-4 py-10 lg:px-8 lg:py-16">
        <div className="mx-auto w-full max-w-lg lg:max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-body-text transition-colors hover:text-primary lg:text-base"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to home
          </Link>

          <div className="mt-6 lg:mt-8 lg:flex lg:items-end lg:justify-between lg:gap-8">
            <h1 className="text-center font-display text-3xl font-bold text-dark-text sm:text-4xl lg:text-left lg:text-5xl">
              Crisis Helplines
            </h1>

            <div className="mt-6 flex justify-center lg:mt-0 lg:shrink-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-body-text shadow-sm lg:px-5 lg:py-2.5 lg:text-base">
                <MapPin size={16} className="text-muted" aria-hidden />
                I am in {CRISIS_LOCATION}
              </span>
            </div>
          </div>

          <div className="mt-8 lg:mt-10">
            <CrisisHelplinesPanel />
          </div>

          <p className="mt-8 text-center text-sm leading-relaxed text-muted lg:mt-10 lg:text-base">
            Aproch Health does not handle medical or psychological emergencies.
            If you or someone you know is in immediate danger, call{" "}
            <a href="tel:112" className="font-medium text-primary hover:underline">
              112
            </a>{" "}
            or your local emergency number.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
