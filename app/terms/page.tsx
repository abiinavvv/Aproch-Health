import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PolicyBlocks from "@/components/legal/PolicyBlocks";
import { pageMetadata } from "@/lib/metadata";
import { SITE_EMAIL, formatDisplayPhone, getWhatsAppNumber } from "@/lib/site";
import { termsPurpose, termsSections } from "@/lib/terms";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms governing access to and use of the Aproch platform, including bookings, conduct, safety, and legal provisions.",
  path: "/terms",
});

export default function TermsPage() {
  const whatsappDigits = getWhatsAppNumber();
  const displayPhone = formatDisplayPhone(whatsappDigits);
  const whatsappUrl = `https://wa.me/${whatsappDigits}`;

  return (
    <>
      <Navbar />
      <main className="flex-1 px-4 pt-24 pb-8 md:py-12 lg:px-6 lg:py-20">
        <article className="prose-policy mx-auto max-w-[800px]">
          <h1 className="font-display text-2xl font-bold text-dark-text md:text-3xl">
            Aproch Terms and Conditions
          </h1>
          <p className="mt-2 text-sm text-muted">Last updated: June 2026</p>

          <section className="mt-6 space-y-4 leading-[1.7] md:mt-8">
            <h2 className="font-display text-lg font-semibold text-dark-text md:text-xl">Purpose</h2>
            {termsPurpose.map((paragraph) => (
              <p key={paragraph} className="text-sm text-body-text md:text-base">
                {paragraph}
              </p>
            ))}
          </section>

          {termsSections.map((section) => (
            <section key={section.id} className="mt-8 space-y-5 md:mt-10 md:space-y-6">
              <h2 className="font-display text-lg font-semibold text-dark-text md:text-xl">
                {section.title}
              </h2>

              {section.subsections.map((subsection) => (
                <div key={subsection.number} className="space-y-3">
                  <h3 className="font-display text-base font-semibold text-dark-text md:text-lg">
                    {subsection.number}. {subsection.title}
                  </h3>
                  <PolicyBlocks blocks={subsection.blocks} />
                </div>
              ))}
            </section>
          ))}

          <section className="mt-8 space-y-4 leading-[1.7] text-sm text-body-text md:mt-10 md:text-base">
            <h2 className="font-display text-lg font-semibold text-dark-text md:text-xl">
              Related policies & contact
            </h2>
            <p>
              Your use of the Platform is also governed by our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/refund-policy" className="text-primary hover:underline">
                Refund & Cancellation Policy
              </Link>{" "}
              and{" "}
              <Link href="/minor-safety-policy" className="text-primary hover:underline">
                Minor Safety Policy
              </Link>{" "}
              and{" "}
              <Link href="/security-policy" className="text-primary hover:underline">
                Security Policy
              </Link>
              .
            </p>
            <p>
              For questions about these Terms, reporting concerns, or support, contact us:
            </p>
            <ul className="list-none space-y-2 pl-0">
              <li>
                <span className="font-medium text-dark-text">WhatsApp: </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {displayPhone}
                </a>
              </li>
              <li>
                <span className="font-medium text-dark-text">Contact Number: </span>
                <a href={`tel:+${whatsappDigits}`} className="text-primary hover:underline">
                  {displayPhone}
                </a>
              </li>
              <li>
                <span className="font-medium text-dark-text">Email: </span>
                <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">
                  {SITE_EMAIL}
                </a>
              </li>
            </ul>
            <p>
              You may also reach us via our{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact page
              </Link>
              .
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
