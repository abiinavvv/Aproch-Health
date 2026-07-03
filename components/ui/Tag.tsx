import { type ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export default function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block rounded-full border border-hero-accent/15 bg-hero-cream/60 px-3 py-1.5 text-[15px] text-hero-subtext max-md:py-1.5 md:py-1 md:text-sm ${className}`}
    >
      {children}
    </span>
  );
}
