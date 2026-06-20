import Link from "next/link";
import { Leaf } from "lucide-react";
import { AGENCY_NAME, getAgencyUrl, getInstagramUrl, getLinkedInUrl, showAgencyCredit } from "@/lib/site";

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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
];

export default function Footer() {
  const instagramUrl = getInstagramUrl();
  const linkedInUrl = getLinkedInUrl();

  return (
    <footer className="theme-surface border-t border-border bg-hero-cream/70 px-4 py-12 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 font-display text-xl font-bold text-hero-brown">
            Aproch
            <Leaf size={16} className="text-hero-accent" strokeWidth={2} aria-hidden />
            <span className="sr-only">Health</span>
          </Link>
          <p className="mt-2 text-sm text-hero-subtext">
            Mental wellness, made accessible.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-4 text-sm">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-hero-subtext transition-colors hover:text-hero-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {(instagramUrl || linkedInUrl) && (
          <div className="mb-8 flex gap-4">
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

        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Aproch Health. All rights reserved.
        </p>
        {showAgencyCredit() && (
          <p className="mt-2 text-xs text-muted">
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
        <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted">
          Aproch Health does not handle medical or psychological emergencies. If
          you are in crisis, please contact iCall: 9152987821.
        </p>
      </div>
    </footer>
  );
}
