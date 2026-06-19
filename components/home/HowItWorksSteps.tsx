"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CalendarCheck, Clock, MessageCircle, Check } from "lucide-react";
import Button from "@/components/ui/Button";

const WARM_ACCENT = "#C4622D";
const WARM_ACCENT_SOFT = "rgba(196,98,45,0.08)";
const WARM_MUTED = "#8A7262";

const TIMING = {
  step1: 100,
  conn1: 500,
  step1Check: 680,
  step2: 700,
  conn2: 1200,
  step2Check: 1380,
  step3: 1400,
  step3Check: 2080,
  cta: 2200,
};

const steps = [
  {
    icon: CalendarCheck,
    number: "Step 1",
    title: "Choose your session",
    description: "Pick a 30 min introductory or 60 min full session",
  },
  {
    icon: Clock,
    number: "Step 2",
    title: "Pick a date & time",
    description: "Select from available slots that fit your schedule",
  },
  {
    icon: MessageCircle,
    number: "Step 3",
    title: "Confirm on WhatsApp",
    description: "Send your booking details to us — we'll confirm your slot",
  },
];

interface StepCardProps {
  step: (typeof steps)[number];
  visible: boolean;
  done: boolean;
  motionAxis: "y" | "x";
  className?: string;
}

function StepCard({
  step,
  visible,
  done,
  motionAxis,
  className = "",
}: StepCardProps) {
  const Icon = step.icon;
  const hidden = motionAxis === "y" ? { opacity: 0, y: 24 } : { opacity: 0, x: -20 };
  const shown = motionAxis === "y" ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 };

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      initial={hidden}
      animate={visible ? shown : hidden}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="relative">
        <motion.div
          className="flex h-[88px] w-[88px] items-center justify-center rounded-full border-2 lg:h-[96px] lg:w-[96px]"
          animate={
            visible
              ? {
                  borderColor: WARM_ACCENT,
                  backgroundColor: WARM_ACCENT_SOFT,
                }
              : {
                  borderColor: "#E8DDD0",
                  backgroundColor: "#FFFFFF",
                }
          }
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <motion.div
            animate={visible ? { color: WARM_ACCENT } : { color: "#B4A99E" }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Icon className="h-8 w-8 lg:h-9 lg:w-9" strokeWidth={2} />
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {done && (
            <motion.div
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Check size={11} color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.span
        className="mt-4 text-[11px] font-medium uppercase tracking-widest"
        animate={{ color: visible ? WARM_ACCENT : WARM_MUTED }}
        transition={{ duration: 0.4 }}
      >
        {step.number}
      </motion.span>

      <span className="mt-1.5 text-center text-base font-semibold text-dark-text lg:text-lg">
        {step.title}
      </span>
      <span className="mt-1.5 px-2 text-center text-sm leading-relaxed text-body-text lg:text-base">
        {step.description}
      </span>
    </motion.div>
  );
}

function HorizontalConnector({ active }: { active: boolean }) {
  return (
    <div className="relative mx-2 mt-[44px] h-[2px] min-w-[32px] max-w-[100px] flex-1 overflow-hidden bg-border lg:mt-[48px] lg:max-w-[120px]">
      <motion.div
        className="absolute inset-y-0 left-0 bg-primary"
        initial={{ width: "0%" }}
        animate={{ width: active ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
}

function VerticalConnector({ active }: { active: boolean }) {
  return (
    <div className="relative my-2 h-[56px] w-[2px] overflow-hidden bg-border">
      <motion.div
        className="absolute inset-x-0 top-0 bg-primary"
        initial={{ height: "0%" }}
        animate={{ height: active ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function HowItWorksSteps() {
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);
  const hasPlayedRef = useRef(false);

  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [doneSteps, setDoneSteps] = useState<number[]>([]);
  const [activeConns, setActiveConns] = useState<number[]>([]);
  const [showCTA, setShowCTA] = useState(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timersRef.current.push(id);
  }, []);

  const runSequence = useCallback(() => {
    clearTimers();

    if (shouldReduce) {
      setVisibleSteps([0, 1, 2]);
      setDoneSteps([0, 1, 2]);
      setActiveConns([0, 1]);
      setShowCTA(true);
      return;
    }

    schedule(() => setVisibleSteps((v) => [...v, 0]), TIMING.step1);
    schedule(() => setActiveConns((c) => [...c, 0]), TIMING.conn1);
    schedule(() => setDoneSteps((d) => [...d, 0]), TIMING.step1Check);
    schedule(() => setVisibleSteps((v) => [...v, 1]), TIMING.step2);
    schedule(() => setActiveConns((c) => [...c, 1]), TIMING.conn2);
    schedule(() => setDoneSteps((d) => [...d, 1]), TIMING.step2Check);
    schedule(() => setVisibleSteps((v) => [...v, 2]), TIMING.step3);
    schedule(() => setDoneSteps((d) => [...d, 2]), TIMING.step3Check);
    schedule(() => setShowCTA(true), TIMING.cta);
  }, [clearTimers, schedule, shouldReduce]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedRef.current) {
          hasPlayedRef.current = true;
          runSequence();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [runSequence, clearTimers]);

  return (
    <section
      ref={sectionRef}
      className="theme-surface min-h-[520px] bg-white px-4 py-16 lg:min-h-[480px] lg:px-6 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-primary">
          Simple process
        </p>

        <h2 className="mb-12 text-center font-display text-3xl font-semibold text-dark-text lg:mb-20 lg:text-4xl">
          Book your first session in 3 steps
        </h2>

        {/* Desktop: horizontal row */}
        <div className="hidden items-start justify-center md:flex">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-start">
              <StepCard
                step={step}
                visible={visibleSteps.includes(i)}
                done={doneSteps.includes(i)}
                motionAxis="y"
                className="w-[240px] lg:w-[280px]"
              />
              {i < steps.length - 1 && (
                <HorizontalConnector active={activeConns.includes(i)} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col items-center md:hidden">
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center">
              <StepCard
                step={step}
                visible={visibleSteps.includes(i)}
                done={doneSteps.includes(i)}
                motionAxis="x"
                className="w-full max-w-[260px]"
              />
              {i < steps.length - 1 && (
                <VerticalConnector active={activeConns.includes(i)} />
              )}
            </div>
          ))}
        </div>

        <motion.div
          className="mt-16 flex justify-center lg:mt-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showCTA ? 1 : 0, y: showCTA ? 0 : 10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Button href="/book" variant="primary">
            Book a Session
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
