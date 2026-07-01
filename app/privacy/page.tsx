import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { pageMetadata } from "@/lib/metadata";
import { BUSINESS_HOURS, SITE_EMAIL, formatDisplayPhone, getWhatsAppNumber } from "@/lib/site";
import {
  privacyPolicyContactSection,
  privacyPolicyPurpose,
  privacyPolicySections,
} from "@/lib/privacy-policy";
import PolicyBlocks from "@/components/legal/PolicyBlocks";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Aproch collects, uses, stores, protects, and shares personal information when you use the Platform.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const whatsappDigits = getWhatsAppNumber();
  const displayPhone = formatDisplayPhone(whatsappDigits);
  const whatsappUrl = `https://wa.me/${whatsappDigits}`;

  return (
    <>
      <Navbar />
      <main className="flex-1 px-4 py-12 lg:px-6 lg:py-20">
        <article className="prose-policy mx-auto max-w-[800px]">
          <h1 className="font-display text-3xl font-bold text-dark-text">
            Aproch Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-muted">Last updated: June 2026</p>

          <section className="mt-8 space-y-4 leading-[1.7]">
            <h2 className="font-display text-xl font-semibold text-dark-text">Purpose</h2>
            {privacyPolicyPurpose.map((paragraph) => (
              <p key={paragraph} className="text-body-text">
                {paragraph}
              </p>
            ))}
          </section>

          {privacyPolicySections.map((section) => (
            <section key={section.id} className="mt-10 space-y-6">
              <h2 className="font-display text-xl font-semibold text-dark-text">
                {section.title}
              </h2>

              {section.subsections.map((subsection) => (
                <div key={subsection.number} className="space-y-3">
                  <h3 className="font-display text-lg font-semibold text-dark-text">
                    {subsection.number}. {subsection.title}
                  </h3>
                  <PolicyBlocks blocks={subsection.blocks} />
                </div>
              ))}
            </section>
          ))}

          <section className="mt-10 space-y-4 leading-[1.7]">
            <h2 className="font-display text-xl font-semibold text-dark-text">Contact</h2>
            <div className="space-y-3 text-body-text">
              <h3 className="font-display text-lg font-semibold text-dark-text">
                {privacyPolicyContactSection.number}. {privacyPolicyContactSection.title}
              </h3>
              <p>{privacyPolicyContactSection.intro}</p>
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
                <li>
                  <span className="font-medium text-dark-text">Business Hours: </span>
                  {BUSINESS_HOURS}
                </li>
              </ul>
              <p>
                See also our{" "}
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
                You may also reach us via our{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  contact page
                </Link>
                .
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
