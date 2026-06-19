"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Tag from "@/components/ui/Tag";
import { psychologist } from "@/lib/psychologist";
import ScrollReveal from "./ScrollReveal";

export default function PsychologistPreviewCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-hero-cream/30 px-4 py-12 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <ScrollReveal>
          <h2 className="mb-12 text-center font-display text-[2.25rem] font-semibold text-dark-text">
            Meet your psychologist
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <motion.div
            whileHover={
              shouldReduceMotion ? {} : { y: -4, boxShadow: "0 12px 32px rgba(28,16,8,0.1)" }
            }
            transition={{ duration: 0.2 }}
            className="mx-auto max-w-[480px] rounded-2xl border border-border bg-white p-8 shadow-md"
          >
            <div className="flex flex-col items-center text-center">
              <Image
                src={psychologist.photo}
                alt={psychologist.name}
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold text-dark-text">
                {psychologist.name}
              </h3>
              <p className="text-sm text-body-text">{psychologist.designation}</p>
              <Badge variant="verified" className="mt-2">
                ✓ {psychologist.rciNumber}
              </Badge>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {psychologist.specialties.slice(0, 4).map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
              <p className="mt-4 line-clamp-2 text-sm leading-[1.7] text-body-text">
                {psychologist.bio}
              </p>
              <div className="mt-6">
                <Button href="/our-psychologist" variant="outline">
                  View Full Profile
                </Button>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
