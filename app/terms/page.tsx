import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-4 py-12 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[800px]">
          <h1 className="font-display text-3xl font-bold text-dark-text">Terms & Conditions</h1>
          {/* ⚠️ Replace with legal copy before launch */}
          <p className="mt-6 leading-[1.7] text-body-text">
            This is a placeholder terms and conditions page for Aproch Health. Before
            going live, replace this content with complete terms reviewed by legal counsel.
            The terms should cover booking policies, cancellation and rescheduling,
            payment terms, session conduct, limitations of liability, and consent to
            therapy services.
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
