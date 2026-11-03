export const homeServicesIntro = {
  title: "Our mental health services",
  subtitle: "Online support for your mental wellbeing.",
} as const;

export const homeServiceCards = [
  {
    id: "therapy",
    title: "Therapy",
    tagline: "A space to talk, reflect and feel supported.",
    pricing: null as { label: string; lines: string[] } | null,
    features: [
      "100% online sessions",
      "Choose psychologist and slot → WhatsApp confirmation → payment before session",
      "Attend session with follow-up support",
    ],
    learnMoreHref: "/therapy",
  },
  {
    id: "nutrition",
    title: "Food & Nutrition",
    tagline: "Build a healthier relationship with food.",
    pricing: {
      label: "Pricing",
      lines: [
        "Initial consultation — ₹400",
        "1-month package — ₹3,499",
      ],
    },
    features: [
      "Initial goals consultation",
      "Personalized plan via WhatsApp",
      "Ongoing food logging, check-ins and reviews with adjustments",
    ],
    learnMoreHref: "/nutrition",
  },
] as const;

export const homeBookingWorksLink = {
  title: "How booking works",
  href: "/how-it-works",
} as const;
