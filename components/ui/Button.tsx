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
  primary: "btn-coral",
  secondary: "bg-primary/10 text-primary hover:bg-primary/15 border-0 rounded-2xl",
  outline:
    "bg-transparent text-dark-text border border-border hover:border-primary hover:text-primary rounded-2xl",
  yellow: "btn-coral",
  white: "bg-white text-primary hover:bg-white/90 border-0 shadow-sm rounded-2xl",
  outlineLight:
    "bg-transparent text-white border border-white/70 hover:bg-white/10 hover:text-white rounded-2xl",
  glass: "glass-btn glass-btn-primary rounded-2xl",
  glassOutline: "glass-btn glass-btn-outline rounded-2xl",
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
  const base = `inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-tight ${variants[variant]} ${fullWidth ? "w-full" : ""} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"} ${className}`;

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
