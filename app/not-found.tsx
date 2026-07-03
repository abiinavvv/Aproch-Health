import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 pt-24 pb-12 text-center md:py-20">
        <h1 className="font-display text-4xl font-bold text-primary md:text-6xl">404</h1>
        <p className="mt-4 text-lg text-dark-text md:text-xl">Page not found</p>
        <p className="mt-2 max-w-md text-sm text-body-text md:text-base">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <div className="mt-8">
          <Button href="/" variant="primary">
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
