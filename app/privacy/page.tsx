import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { pageMetadata } from "@/lib/metadata";
import { SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Aproch Health collects, uses, and protects your personal information when you book therapy sessions.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-4 py-12 lg:px-6 lg:py-20">
        <article className="prose-policy mx-auto max-w-[800px]">
          <h1 className="font-display text-3xl font-bold text-dark-text">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted">Last updated: June 2026</p>

          <section className="mt-8 space-y-4 leading-[1.7] text-body-text">
            <p>
              Aproch Health (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates an online mental wellness
              platform that connects students and young adults with licensed clinical psychologists.
              This Privacy Policy explains how we collect, use, store, and protect your information
              when you use our website and booking services.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Information we collect</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Booking details:</strong> name, email, phone number, age, preferred session
                type, date, time, session mode (video/audio), and optional message for the psychologist.
              </li>
              <li>
                <strong>Contact form:</strong> name, email, and message when you reach out via our
                contact page.
              </li>
              <li>
                <strong>Technical data:</strong> browser type, device information, and anonymised usage
                data collected through standard web server logs and analytics (if enabled).
              </li>
              <li>
                <strong>Theme preference:</strong> day/night mode stored locally in your browser
                (localStorage).
              </li>
            </ul>

            <h2 className="font-display text-xl font-semibold text-dark-text">How we use your information</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>To process and confirm session bookings via WhatsApp.</li>
              <li>To respond to enquiries submitted through our contact form.</li>
              <li>To send optional session confirmation emails when email delivery is enabled.</li>
              <li>To improve our website, services, and user experience.</li>
              <li>To comply with applicable legal obligations.</li>
            </ul>

            <h2 className="font-display text-xl font-semibold text-dark-text">WhatsApp communications</h2>
            <p>
              When you confirm a booking, you are redirected to WhatsApp with a pre-filled message
              containing your booking details. That message is sent directly to our team via WhatsApp&apos;s
              platform. WhatsApp&apos;s own privacy policy applies to messages sent through their service.
              We use WhatsApp solely to coordinate session bookings and related communication.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Session confidentiality</h2>
            <p>
              Therapy sessions are conducted online via Google Meet. Session content is confidential
              between you and your psychologist, subject to professional ethics and legal requirements
              (such as mandatory reporting in cases involving harm to self or others). We do not record
              therapy sessions unless explicitly agreed in advance.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Data sharing</h2>
            <p>
              We do not sell your personal data. We may share information only with:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Our registered clinical psychologist to deliver your session.</li>
              <li>Service providers that help us operate the website (e.g. hosting, email delivery).</li>
              <li>Authorities when required by applicable Indian law.</li>
            </ul>

            <h2 className="font-display text-xl font-semibold text-dark-text">Data retention</h2>
            <p>
              Booking and contact information is retained only as long as needed to provide services,
              resolve disputes, and meet legal obligations. You may request deletion of non-essential
              data by contacting us.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Your rights</h2>
            <p>
              Under applicable Indian data protection laws, you may have the right to access, correct,
              or request deletion of your personal data, and to withdraw consent where processing is
              consent-based. To exercise these rights, contact us at the email below.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Security</h2>
            <p>
              We use industry-standard measures including HTTPS encryption, secure hosting, and
              limited access to personal data. No method of transmission over the internet is 100%
              secure; we encourage you to use strong passwords and protect your device.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Children</h2>
            <p>
              Our services are intended for users aged 18 and above. Users under 18 may book only with
              parental or guardian consent. We do not knowingly collect data from children without
              appropriate consent.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top
              will reflect the latest version. Continued use of our services after changes constitutes
              acceptance of the updated policy.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Contact</h2>
            <p>
              For privacy-related questions, contact us at{" "}
              <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">
                {SITE_EMAIL}
              </a>{" "}
              or via our{" "}
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
