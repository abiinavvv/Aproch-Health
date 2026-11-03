import Link from "next/link";
import SiteLogo from "@/components/brand/SiteLogo";
import SocialLinks from "@/components/layout/SocialLinks";
import { AGENCY_NAME, getAgencyUrl, showAgencyCredit } from "@/lib/site";

const footerLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/our-psychologist", label: "Our Psychologists" },
  { href: "/therapy", label: "Therapy" },
  { href: "/nutrition", label: "Food & Nutrition" },
  { href: "/book", label: "Book a Session" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/minor-safety-policy", label: "Minor Safety" },
  { href: "/security-policy", label: "Security Policy" },
];

export default function Footer() {
  return (
    <footer className="theme-surface border-t border-border bg-hero-cream/70 px-4 py-8 md:py-12 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-5 md:mb-8">
          <Link href="/" className="inline-flex">
            <SiteLogo className="h-7 md:h-10" />
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

        <SocialLinks className="mb-5 flex gap-3 md:mb-8 md:gap-4" />

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
