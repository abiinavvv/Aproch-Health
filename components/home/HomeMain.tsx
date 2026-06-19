"use client";

import { useRef, type ReactNode } from "react";

interface HomeMainProps {
  children: ReactNode;
}

export default function HomeMain({ children }: HomeMainProps) {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main ref={mainRef} className="relative flex-1">
      {children}
    </main>
  );
}
