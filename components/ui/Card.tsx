"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  selected?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = false,
  onClick,
  selected = false,
}: CardProps) {
  const shouldReduceMotion = useReducedMotion();

  const baseClass = `rounded-3xl bg-white shadow-[0_8px_30px_rgba(26,26,26,0.05)] ${selected ? "border-2 border-primary bg-primary/5" : "border border-border/80"} ${onClick ? "cursor-pointer" : ""} ${className}`;

  if (hover && !shouldReduceMotion) {
    return (
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 14px 36px rgba(26,26,26,0.1)" }}
        transition={{ duration: 0.2 }}
        className={baseClass}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={`${baseClass} ${hover ? "hover:shadow-[0_14px_36px_rgba(26,26,26,0.1)] transition-shadow duration-200" : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
