"use client";

import AnimatedWordText, { type WordToken } from "./AnimatedWordText";

interface HighlightHeadingProps {
  words: WordToken[];
  className?: string;
  stagger?: number;
  delay?: number;
}

export default function HighlightHeading({
  words,
  className = "",
  stagger = 0.07,
  delay = 0,
}: HighlightHeadingProps) {
  return (
    <AnimatedWordText
      as="h2"
      words={words}
      className={className}
      wordClassName="text-dark-text"
      highlightClassName="text-primary"
      stagger={stagger}
      delay={delay}
    />
  );
}
