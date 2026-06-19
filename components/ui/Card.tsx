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

  const baseClass = `rounded-2xl bg-white shadow-sm ${selected ? "border-2 border-primary bg-primary/5" : "border border-border"} ${onClick ? "cursor-pointer" : ""} ${className}`;

  if (hover && !shouldReduceMotion) {
    return (
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
        transition={{ duration: 0.2 }}
        className={baseClass}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseClass} ${hover ? "hover:shadow-md transition-shadow duration-200" : ""}`} onClick={onClick}>
      {children}
    </div>
  );
}
