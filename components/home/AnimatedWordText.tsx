"use client";

import { motion, useReducedMotion } from "framer-motion";

export interface WordToken {
  text: string;
  highlight?: boolean;
  /** Overrides highlightClassName / wordClassName for this word */
  className?: string;
}

interface AnimatedWordTextProps {
  words: WordToken[];
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  wordClassName?: string;
  highlightClassName?: string;
  stagger?: number;
  delay?: number;
}

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
  span: motion.span,
} as const;

export default function AnimatedWordText({
  words,
  as = "h1",
  className = "",
  wordClassName = "",
  highlightClassName = "text-primary",
  stagger = 0.08,
  delay = 0,
}: AnimatedWordTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motionTags[as];

  const wordClass = (word: WordToken) =>
    word.className ?? (word.highlight ? highlightClassName : wordClassName);

  if (shouldReduceMotion) {
    const Tag = as;
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <span
            key={`${word.text}-${i}`}
            className={wordClass(word)}
          >
            {word.text}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word.text}-${i}`}
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, ease: "easeOut" },
            },
          }}
          className={`mr-[0.28em] inline-block last:mr-0 ${wordClass(word)}`}
        >
          {word.text}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export function toWords(
  text: string,
  options?: { highlight?: string[] }
): WordToken[] {
  const highlightSet = new Set(options?.highlight ?? []);
  return text.split(" ").map((text) => ({
    text,
    highlight: highlightSet.has(text.replace(/[.,]/g, "")) || highlightSet.has(text),
  }));
}
