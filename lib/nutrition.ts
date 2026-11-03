import type { NutritionOffer, NutritionOfferId } from "@/types";

export const nutritionConsultOffer: NutritionOffer = {
  id: "nutrition-consult",
  label: "Initial consultation",
  duration: 60,
  price: 400,
  tagline: "A single consultation to discuss your goals and nutrition needs",
  description:
    "A one-to-one online consultation to understand your goals, lifestyle, and nutrition needs — and decide the right next step.",
};

export const nutritionPackageOffer: NutritionOffer = {
  id: "nutrition-package",
  label: "1-month package",
  duration: 60,
  price: 3499,
  tagline: "Personalized plan with food logging, feedback, and check-ins",
  description:
    "A personalized plan with food logging, scheduled feedback, check-ins and reviews over the month. Book a preferred kickoff time; details are confirmed on WhatsApp.",
};

export const nutritionOffers: NutritionOffer[] = [
  nutritionConsultOffer,
  nutritionPackageOffer,
];

export function getNutritionOfferById(
  id: NutritionOfferId | string | null | undefined
): NutritionOffer | undefined {
  if (!id) return undefined;
  return nutritionOffers.find((o) => o.id === id);
}

export function formatNutritionFee(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

export const nutritionValueProps = [
  {
    title: "Build a healthier relationship with food",
    body: "Move beyond rigid rules. Learn what works for your body, schedule, and preferences — with guidance that feels practical, not punishing.",
  },
  {
    title: "Support that fits student life",
    body: "Mess food, late nights, exams, and irregular routines are part of the picture. Plans are shaped around real student and young-adult life in India.",
  },
] as const;

export const nutritionProgramSteps = [
  {
    title: "Day 1 · Understand your needs",
    body: "A Google Meet consultation to discuss your goals, lifestyle, and what support would help most.",
  },
  {
    title: "Day 2–3 · Your personalized plan",
    body: "Your dietitian prepares a plan tailored to you and shares it on WhatsApp.",
  },
  {
    title: "Day 4–7 · Settle into the plan",
    body: "Start following your plan with light check-ins so early questions get answered quickly.",
  },
  {
    title: "Day 8 · First progress check",
    body: "A short review of how the first week felt — energy, adherence, and anything that needs adjusting.",
  },
  {
    title: "Day 9–14 · Log and monitor",
    body: "Continue food logging and progress monitoring as you follow your plan.",
  },
  {
    title: "Day 15 · Mid-month review",
    body: "Review your progress with the dietitian and adjust the plan if needed.",
  },
  {
    title: "Day 16–28 · Ongoing guidance",
    body: "Continue food logging, guidance and weekly check-ins to review how things are going.",
  },
  {
    title: "Day 29–30 · Review and next steps",
    body: "Final progress review, recommendations and feedback to help you decide your next steps.",
  },
] as const;

export const nutritionProgramDisclaimer =
  "Agree on feedback timing with your dietitian. Progress varies; this program does not guarantee a particular outcome.";

export const nutritionWhyImportant = [
  {
    title: "Make room for everyday nourishment",
    body: "Student life can make regular eating difficult. Personalized guidance can help you explore practical habits rather than follow one-size-fits-all advice.",
  },
  {
    title: "Build understanding, not pressure",
    body: "Reflect on food choices and what feels workable for you. Reviews create space to ask questions and adjust the plan as your needs change.",
  },
] as const;

export const nutritionCta = {
  title: "Ready to get started?",
  body: "Choose a single consultation or ask about the 1-month package. Confirm your preferred option before payment.",
  buttonLabel: "Book your dietitian now",
} as const;
