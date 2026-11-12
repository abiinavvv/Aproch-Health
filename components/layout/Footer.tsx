import Link from "next/link";
import SiteLogo from "@/components/brand/SiteLogo";
import SocialLinks from "@/components/layout/SocialLinks";
import { AGENCY_NAME, getAgencyUrl, showAgencyCredit } from "@/lib/site";

const exploreLinks = [
  { href: "/therapy", label: "Therapy" },
  { href: "/nutrition", label: "Food & Nutrition" },
  { href: "/our-psychologist", label: "Our Psychologists" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/book", label: "Book a Session" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/minor-safety-policy", label: "Minor Safety" },
  { href: "/security-policy", label: "Security Policy" },
  { href: "/crisis-help", label: "Crisis Help" },
];

export default function Footer() {
  return (
    <footer className="theme-surface border-t border-border bg-hero-cream px-4 py-12 md:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12">
          <div>
            <Link href="/" className="inline-flex">
              <SiteLogo className="h-8 md:h-10" />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-body-text">
              Mental wellness, made accessible — online therapy and nutrition
              support for students and young adults.
            </p>
            <SocialLinks className="mt-5 flex gap-3 md:gap-4" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Explore
            </p>
            <ul className="mt-3 space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-body-text transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Support
            </p>
            <ul className="mt-3 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-body-text transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 md:mt-12">
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
                className="underline-offset-2 hover:text-primary hover:underline"
              >
                {AGENCY_NAME}
              </a>
            </p>
          )}
          <p className="mt-3 max-w-xl text-[11px] leading-relaxed text-muted md:mt-4 md:text-xs">
            Aproch Health does not handle medical or psychological emergencies.
            If you are in crisis, see{" "}
            <Link
              href="/crisis-help"
              className="font-semibold text-primary hover:underline"
            >
              Crisis Help
            </Link>{" "}
            or contact iCall:{" "}
            <a
              href="tel:919152987821"
              className="font-medium text-primary hover:underline"
            >
              9152987821
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
