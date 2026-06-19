"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold text-dark-text">Something went wrong</h1>
        <p className="mt-4 max-w-md text-body-text">
          We hit an unexpected error. Please try again, or return to the home page.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" onClick={reset}>
            Try again
          </Button>
          <Button href="/" variant="secondary">
            Back to Home
          </Button>
        </div>
        <Link href="/contact" className="mt-4 text-sm text-primary hover:underline">
          Need help? Contact us
        </Link>
      </main>
      <Footer />
    </>
  );
}
