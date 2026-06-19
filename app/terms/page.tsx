import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { pageMetadata } from "@/lib/metadata";
import { SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms of use for booking online therapy sessions with Aproch Health, including cancellation, conduct, and liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-4 py-12 lg:px-6 lg:py-20">
        <article className="prose-policy mx-auto max-w-[800px]">
          <h1 className="font-display text-3xl font-bold text-dark-text">Terms & Conditions</h1>
          <p className="mt-2 text-sm text-muted">Last updated: June 2026</p>

          <section className="mt-8 space-y-4 leading-[1.7] text-body-text">
            <p>
              These Terms & Conditions (&quot;Terms&quot;) govern your use of the Aproch Health website and
              booking services. By using our website or booking a session, you agree to these Terms.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">About our services</h2>
            <p>
              Aproch Health provides an online platform to book confidential therapy sessions with a
              registered clinical psychologist. Sessions are conducted via Google Meet (video or audio).
              We are not an emergency service and do not provide crisis intervention.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Eligibility</h2>
            <p>
              You must be at least 18 years old to book independently. Users aged 16–17 may use our
              services with verifiable parental or guardian consent. By booking, you confirm that the
              information you provide is accurate.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Booking process</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Select your session type, date, time, and mode on our booking page.</li>
              <li>Review your details and confirm via WhatsApp with a pre-filled booking message.</li>
              <li>Our team will confirm availability and share a Google Meet link before your session.</li>
              <li>Session fees are communicated during booking (e.g. ₹500 introductory / full session rates).</li>
            </ul>

            <h2 className="font-display text-xl font-semibold text-dark-text">Cancellation and rescheduling</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Please notify us at least 24 hours before your session to reschedule without charge.</li>
              <li>Cancellations with less than 24 hours&apos; notice may forfeit the session fee at our discretion.</li>
              <li>If we need to cancel or reschedule, we will offer an alternative slot or a full refund.</li>
              <li>Contact us via WhatsApp or email to cancel or reschedule.</li>
            </ul>

            <h2 className="font-display text-xl font-semibold text-dark-text">Payment</h2>
            <p>
              Payment instructions are shared after booking confirmation via WhatsApp. Fees must be
              settled as agreed before or at the time of your session unless otherwise communicated.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Session conduct</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Attend sessions from a private, quiet location with a stable internet connection.</li>
              <li>Treat your psychologist and our team with respect. Abusive behaviour may result in termination of services.</li>
              <li>Do not record sessions without explicit written consent from all parties.</li>
              <li>Therapy is a collaborative process; outcomes depend on many factors and cannot be guaranteed.</li>
            </ul>

            <h2 className="font-display text-xl font-semibold text-dark-text">Not for emergencies</h2>
            <p>
              Aproch Health is not equipped to handle psychiatric emergencies, suicidal crises, or
              situations requiring immediate medical intervention. If you or someone you know is in
              crisis, contact iCall (9152987821), Vandrevala Foundation (1860-2662-345), or emergency
              services (112) immediately.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, Aproch Health and its practitioners shall not be
              liable for indirect, incidental, or consequential damages arising from use of our website
              or services. Our total liability for any claim shall not exceed the fee paid for the
              session in question. Nothing in these Terms limits liability that cannot be excluded under
              applicable Indian law.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Intellectual property</h2>
            <p>
              All content on this website — including text, images, and branding — is owned by Aproch
              Health or used under licence. You may not copy, reproduce, or distribute our content
              without written permission.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Privacy</h2>
            <p>
              Your use of our services is also governed by our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. Material changes will be reflected in the
              &quot;Last updated&quot; date. Continued use after changes constitutes acceptance.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Governing law</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes shall be subject to the
              exclusive jurisdiction of courts in India.
            </p>

            <h2 className="font-display text-xl font-semibold text-dark-text">Contact</h2>
            <p>
              Questions about these Terms? Email{" "}
              <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">
                {SITE_EMAIL}
              </a>{" "}
              or visit our{" "}
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
