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
import {
  informationSecurityPurpose,
  informationSecuritySections,
} from "@/lib/information-security-policy";

export const metadata: Metadata = pageMetadata({
  title: "Information Security Policy",
  description:
    "Aproch information security and confidentiality policy for protecting platform data, communications, and systems.",
  path: "/security-policy",
});

export default function SecurityPolicyPage() {
  const whatsappDigits = getWhatsAppNumber();
  const displayPhone = formatDisplayPhone(whatsappDigits);
  const whatsappUrl = `https://wa.me/${whatsappDigits}`;

  return (
    <>
      <Navbar />
      <main className="flex-1 px-4 py-12 lg:px-6 lg:py-20">
        <article className="prose-policy mx-auto max-w-[800px]">
          <h1 className="font-display text-3xl font-bold text-dark-text">
            Aproch Information Security & Confidentiality Policy
          </h1>
          <p className="mt-2 text-sm text-muted">Last updated: June 2026</p>

          <section className="mt-8 space-y-4 leading-[1.7]">
            <h2 className="font-display text-xl font-semibold text-dark-text">Purpose</h2>
            {informationSecurityPurpose.map((paragraph) => (
              <p key={paragraph} className="text-body-text">
                {paragraph}
              </p>
            ))}
          </section>

          {informationSecuritySections.map((section) => (
            <section key={section.id} className="mt-10 space-y-6">
              <h2 className="font-display text-xl font-semibold text-dark-text">
                {section.title}
              </h2>

              {section.subsections.map((subsection) => (
                <div key={subsection.number} className="space-y-3 leading-[1.7]">
                  <h3 className="font-display text-lg font-semibold text-dark-text">
                    {subsection.number}. {subsection.title}
                  </h3>
                  <PolicyBlocks blocks={subsection.blocks} />
                  {subsection.number === 27 && (
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
          ))}

          <section className="mt-10 space-y-4 leading-[1.7] text-body-text">
            <h2 className="font-display text-xl font-semibold text-dark-text">
              Related policies
            </h2>
            <p>
              See also our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              ,{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms and Conditions
              </Link>
              ,{" "}
              <Link href="/refund-policy" className="text-primary hover:underline">
                Refund & Cancellation Policy
              </Link>
              , and{" "}
              <Link href="/minor-safety-policy" className="text-primary hover:underline">
                Minor Safety Policy
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
