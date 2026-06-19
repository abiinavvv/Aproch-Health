interface SectionTagProps {
  children: string;
  className?: string;
}

export default function SectionTag({ children, className = "" }: SectionTagProps) {
  return (
    <span
      className={`inline-block rounded-full bg-hero-accent/12 px-4 py-1.5 text-xs font-semibold tracking-wide text-hero-accent ${className}`}
    >
      {children}
    </span>
  );
}
