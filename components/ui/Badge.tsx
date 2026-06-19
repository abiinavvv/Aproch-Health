import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "green" | "muted" | "verified";
  className?: string;
}

const variants = {
  green: "bg-primary/10 text-primary",
  muted: "bg-border text-body-text",
  verified: "bg-success/10 text-success",
};

export default function Badge({
  children,
  variant = "green",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
