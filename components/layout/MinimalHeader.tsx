import Link from "next/link";
import SiteLogo from "@/components/brand/SiteLogo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function MinimalHeader() {
  return (
    <header className="theme-surface border-b border-border bg-hero-cream/80 px-4 py-3 backdrop-blur-sm md:py-4 lg:px-6">
      <div className="mx-auto flex max-w-[800px] items-center justify-between">
        <Link href="/" className="inline-flex">
          <SiteLogo className="h-7 md:h-8" />
        </Link>
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-hero-accent transition-colors hover:text-primary-dark md:text-sm"
        >
          WhatsApp us
        </a>
      </div>
    </header>
  );
}
