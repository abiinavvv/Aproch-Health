import { type ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export default function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block rounded-full border border-hero-accent/15 bg-hero-cream/60 px-3 py-1 text-sm text-hero-subtext ${className}`}
    >
      {children}
    </span>
  );
}
