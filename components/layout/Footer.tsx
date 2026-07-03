import Link from "next/link";
import { Leaf } from "lucide-react";
import { AGENCY_NAME, getAgencyUrl, getInstagramUrl, getLinkedInUrl, showAgencyCredit } from "@/lib/site";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:h-5 md:w-5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="md:h-5 md:w-5">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V23h-4v-7.1c0-1.7-.03-3.88-2.37-3.88-2.37 0-2.73 1.85-2.73 3.76V23h-4V8.5z" />
    </svg>
  );
}

const footerLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/our-psychologist", label: "Our Psychologists" },
  { href: "/book", label: "Book a Session" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/minor-safety-policy", label: "Minor Safety" },
  { href: "/security-policy", label: "Security Policy" },
];

export default function Footer() {
  const instagramUrl = getInstagramUrl();
  const linkedInUrl = getLinkedInUrl();

  return (
    <footer className="theme-surface border-t border-border bg-hero-cream/70 px-4 py-8 md:py-12 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-5 md:mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 font-display text-lg font-bold text-hero-brown md:text-xl">
            Aproch
            <Leaf size={14} className="text-hero-accent md:h-4 md:w-4" strokeWidth={2} aria-hidden />
            <span className="sr-only">Health</span>
          </Link>
          <p className="mt-1.5 text-xs text-hero-subtext md:mt-2 md:text-sm">
            Mental wellness, made accessible.
          </p>
        </div>

        <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2 text-xs leading-relaxed text-hero-subtext md:mb-8 md:gap-x-5 md:gap-y-3 md:text-sm">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-hero-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {(instagramUrl || linkedInUrl) && (
          <div className="mb-5 flex gap-3 md:mb-8 md:gap-4">
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted transition-colors hover:text-hero-accent"
              >
                <InstagramIcon />
              </a>
            )}
            {linkedInUrl && (
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted transition-colors hover:text-hero-accent"
              >
                <LinkedInIcon />
              </a>
            )}
          </div>
        )}

        <p className="text-xs text-muted md:text-sm">
          © {new Date().getFullYear()} Aproch Health. All rights reserved.
        </p>
        {showAgencyCredit() && (
          <p className="mt-1.5 text-[11px] text-muted md:mt-2 md:text-xs">
            Website by{" "}
            <a
              href={getAgencyUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:text-hero-accent hover:underline"
            >
              {AGENCY_NAME}
            </a>
          </p>
        )}
        <p className="mt-3 max-w-xl text-[11px] leading-relaxed text-muted md:mt-4 md:text-xs">
          Aproch Health does not handle medical or psychological emergencies. If
          you are in crisis, see{" "}
          <Link href="/crisis-help" className="font-semibold text-primary hover:underline">
            Crisis Help
          </Link>{" "}
          or contact iCall:{" "}
          <a href="tel:919152987821" className="font-medium text-primary hover:underline">
            9152987821
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
