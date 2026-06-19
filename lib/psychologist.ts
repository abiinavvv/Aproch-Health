import type { Psychologist } from "@/types";

// ⚠️ Replace with real name, RCI number, photo, and WhatsApp before launch
export const psychologist: Psychologist = {
  name: "Dr. Priya Nair",
  slug: "dr-priya-nair",
  designation: "Consultant Clinical Psychologist",
  credentials: "M.Phil Clinical Psychology",
  rciNumber: "RCI/CL/2021/XXXXX",
  photo: "/images/psychologist.svg",
  languages: ["English", "Hindi"],
  experience: "3+ years",
  sessionHours: "500+",
  specialties: [
    "Anxiety",
    "Academic Stress",
    "Relationships",
    "Self-esteem",
    "Depression",
    "Career Stress",
  ],
  bio: `I believe therapy should feel like a conversation, not a diagnosis. I've spent the last 3 years working with students and young adults navigating anxiety, academic pressure, and life transitions — and I'm here to help you do the same.`,
  philosophy:
    "Healing isn't linear, and that's okay. My job is to walk with you, not ahead of you.",
  sessionFormat: "Online via Google Meet (video or audio call)",
  whatsappNumber: "91XXXXXXXXXX",
  email: "hello@aprochhealth.com",
};
