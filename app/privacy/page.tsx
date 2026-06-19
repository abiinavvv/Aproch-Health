import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-4 py-12 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[800px]">
          <h1 className="font-display text-3xl font-bold text-dark-text">Privacy Policy</h1>
          {/* ⚠️ Replace with legal copy before launch */}
          <p className="mt-6 leading-[1.7] text-body-text">
            This is a placeholder privacy policy for Aproch Health. Before going live,
            replace this content with a complete privacy policy reviewed by legal counsel.
            The policy should cover data collection, session confidentiality, payment
            processing through Razorpay, email communications via Resend, and user rights
            under applicable Indian data protection laws.
          </p>
          <p className="mt-4 leading-[1.7] text-body-text">
            For questions, contact us at{" "}
            <Link href="/contact" className="text-primary hover:underline">
              hello@aprochhealth.com
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
