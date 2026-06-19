"use client";

import StackCard, { type StackCardItem } from "@/components/ui/stack-card";
import ScrollReveal from "./ScrollReveal";

const trustCards: StackCardItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
    alt: "Students in a supportive group setting",
    title: "Confidential & safe",
    description:
      "Sessions are private, online, and conducted by an RCI-registered clinical psychologist.",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop",
    alt: "Planning and scheduling on a laptop",
    title: "Flexible scheduling",
    description:
      "Book around your classes and hostel life — evenings and weekends available.",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop",
    alt: "Young professional smiling confidently",
    title: "Affordable support",
    description:
      "Introductory sessions from ₹500, designed for students and young adults.",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
    alt: "Online video call therapy session",
    title: "100% online",
    description:
      "Meet your psychologist from anywhere — video or audio via Google Meet.",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=500&fit=crop",
    alt: "Students studying together on campus",
    title: "Built for students",
    description:
      "Care tailored to academic stress, transitions, and life as a young adult in India.",
  },
];

export default function TestimonialsCarousel() {
  return (
    <section className="bg-hero-start px-4 py-12 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="relative z-20 mb-6 text-center font-display text-[2.25rem] font-semibold text-dark-text">
          Why students choose us
        </h2>

        <ScrollReveal delay={0.1} className="relative z-0">
          <StackCard
            cards={trustCards}
            hint="Drag the top card upward to see the next reason"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
