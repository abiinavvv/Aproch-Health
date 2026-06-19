"use client";

import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "yellow"
  | "white"
  | "outlineLight"
  | "glass"
  | "glassOutline";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button";
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark border-2 border-primary hover:border-primary-dark",
  secondary:
    "bg-hero-accent/15 text-hero-brown hover:bg-hero-accent/25 border-2 border-hero-accent/25 hover:border-hero-accent/40",
  outline:
    "bg-transparent text-dark-text border-2 border-border hover:border-primary hover:text-primary",
  yellow:
    "bg-primary text-white hover:bg-primary-dark border-2 border-primary hover:border-primary-dark",
  white:
    "bg-white text-primary hover:bg-white/90 border-2 border-white hover:border-white/90",
  outlineLight:
    "bg-transparent text-white border-2 border-white hover:bg-white/10 hover:text-white",
  glass: "glass-btn glass-btn-primary",
  glassOutline: "glass-btn glass-btn-outline",
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  disabled = false,
  className = "",
  fullWidth = false,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${variants[variant]} ${fullWidth ? "w-full" : ""} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"} ${className}`;

  if (href && !disabled) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
}
