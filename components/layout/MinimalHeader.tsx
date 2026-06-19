import Link from "next/link";
import { Leaf } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function MinimalHeader() {
  return (
    <header className="theme-surface border-b border-border bg-hero-cream/80 px-4 py-4 backdrop-blur-sm lg:px-6">
      <div className="mx-auto flex max-w-[800px] items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1.5 font-display text-xl font-bold text-hero-brown">
          Aproch
          <Leaf size={16} className="text-hero-accent" strokeWidth={2} aria-hidden />
        </Link>
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-hero-accent transition-colors hover:text-primary-dark"
        >
          WhatsApp us
        </a>
      </div>
    </header>
  );
}
