import {
  getFacebookUrl,
  getInstagramUrl,
  getLinkedInUrl,
} from "@/lib/site";

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="md:h-5 md:w-5"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="md:h-5 md:w-5"
      aria-hidden
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V23h-4v-7.1c0-1.7-.03-3.88-2.37-3.88-2.37 0-2.73 1.85-2.73 3.76V23h-4V8.5z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="md:h-5 md:w-5"
      aria-hidden
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", href: getInstagramUrl, Icon: InstagramIcon },
  { label: "LinkedIn", href: getLinkedInUrl, Icon: LinkedInIcon },
  { label: "Facebook", href: getFacebookUrl, Icon: FacebookIcon },
] as const;

type SocialLinksProps = {
  className?: string;
};

export default function SocialLinks({ className = "flex gap-3 md:gap-4" }: SocialLinksProps) {
  return (
    <div className={className}>
      {socials.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-muted transition-colors hover:text-hero-accent"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
