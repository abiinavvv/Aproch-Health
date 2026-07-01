import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PolicyBlocks from "@/components/legal/PolicyBlocks";
import { pageMetadata } from "@/lib/metadata";
import {
  BUSINESS_HOURS,
  SITE_EMAIL,
  formatDisplayPhone,
  getWhatsAppNumber,
} from "@/lib/site";
import { refundPolicySubsections } from "@/lib/refund-policy";

export const metadata: Metadata = pageMetadata({
  title: "Refund & Cancellation Policy",
  description:
    "Aproch return, refund, cancellation, and rescheduling policy for appointments booked through the Platform.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  const whatsappDigits = getWhatsAppNumber();
  const displayPhone = formatDisplayPhone(whatsappDigits);
  const whatsappUrl = `https://wa.me/${whatsappDigits}`;

  return (
    <>
      <Navbar />
      <main className="flex-1 px-4 py-12 lg:px-6 lg:py-20">
        <article className="prose-policy mx-auto max-w-[800px]">
          <h1 className="font-display text-3xl font-bold text-dark-text">
            Aproch Return, Refund, Cancellation & Rescheduling Policy
          </h1>
          <p className="mt-2 text-sm text-muted">Last updated: June 2026</p>

          <section className="mt-8 space-y-8">
            {refundPolicySubsections.map((subsection) => (
              <div key={subsection.number} className="space-y-3 leading-[1.7]">
                <h2 className="font-display text-lg font-semibold text-dark-text">
                  {subsection.number}. {subsection.title}
                </h2>
                <PolicyBlocks blocks={subsection.blocks} />
                {subsection.number === 17 && (
                  <ul className="list-none space-y-2 pl-0 text-body-text">
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
                    <li>
                      <span className="font-medium text-dark-text">Business Hours: </span>
                      {BUSINESS_HOURS}
                    </li>
                  </ul>
                )}
              </div>
            ))}
          </section>

          <section className="mt-10 space-y-4 leading-[1.7] text-body-text">
            <h2 className="font-display text-xl font-semibold text-dark-text">
              Related policies
            </h2>
            <p>
              See also our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms and Conditions
              </Link>
              , and{" "}
              <Link href="/minor-safety-policy" className="text-primary hover:underline">
                Minor Safety Policy
              </Link>
              , and{" "}
              <Link href="/security-policy" className="text-primary hover:underline">
                Security Policy
              </Link>
              . You may also reach us via our{" "}
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
