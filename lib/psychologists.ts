import type { Psychologist } from "@/types";
import { getWhatsAppNumber, SITE_EMAIL } from "@/lib/site";

const sharedWhatsApp = getWhatsAppNumber();
const sharedEmail = SITE_EMAIL;

export const psychologists: Psychologist[] = [
  {
    name: "Dr. Priya Nair",
    slug: "dr-priya-nair",
    designation: "Consultant Clinical Psychologist",
    credentials: "M.Phil Clinical Psychology",
    rciNumber: "RCI/CL/2021/10482",
    photo: "/images/psychologists/dr-priya-nair.png",
    photoWebp: "/images/psychologists/dr-priya-nair.webp",
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
    whatsappNumber: sharedWhatsApp,
    email: sharedEmail,
  },
  {
    name: "Dr. Ananya Sharma",
    slug: "dr-ananya-sharma",
    designation: "Clinical Psychologist",
    credentials: "M.Phil Clinical Psychology",
    rciNumber: "RCI/CL/2020/98741",
    photo: "/images/psychologists/dr-ananya-sharma.png",
    photoWebp: "/images/psychologists/dr-ananya-sharma.webp",
    languages: ["English", "Hindi"],
    experience: "4+ years",
    sessionHours: "600+",
    specialties: ["Anxiety", "Depression", "Young Adults", "Sleep Issues", "Burnout"],
    bio: `I work with young adults who feel overwhelmed by expectations — from family, college, or themselves. My approach is warm, structured, and focused on practical coping skills you can use between sessions.`,
    philosophy: "Small, consistent steps create lasting change.",
    sessionFormat: "Online via Google Meet (video or audio call)",
    whatsappNumber: sharedWhatsApp,
    email: sharedEmail,
  },
  {
    name: "Dr. Rohit Mehta",
    slug: "dr-rohit-mehta",
    designation: "Consultant Psychologist",
    credentials: "M.A. Clinical Psychology",
    rciNumber: "RCI/CL/2019/87653",
    photo: "/images/psychologists/dr-rohit-mehta.png",
    photoWebp: "/images/psychologists/dr-rohit-mehta.webp",
    languages: ["English", "Hindi", "Marathi"],
    experience: "5+ years",
    sessionHours: "700+",
    specialties: ["Career Stress", "Relationships", "Self-confidence", "Life Transitions"],
    bio: `Many of my clients are navigating their first job, a breakup, or the pressure to "have it all figured out." I help you clarify what you want and build confidence to move toward it.`,
    philosophy: "Clarity comes before change — and both are possible.",
    sessionFormat: "Online via Google Meet (video or audio call)",
    whatsappNumber: sharedWhatsApp,
    email: sharedEmail,
  },
  {
    name: "Dr. Meera Kapoor",
    slug: "dr-meera-kapoor",
    designation: "Clinical Psychologist",
    credentials: "M.Phil Clinical Psychology",
    rciNumber: "RCI/CL/2021/11209",
    photo: "/images/psychologists/dr-meera-kapoor.png",
    photoWebp: "/images/psychologists/dr-meera-kapoor.webp",
    languages: ["English", "Hindi"],
    experience: "3+ years",
    sessionHours: "450+",
    specialties: ["Academic Stress", "Self-esteem", "Body Image", "Perfectionism"],
    bio: `I specialise in supporting students who push themselves hard — sometimes too hard. Together we work on self-compassion, realistic goals, and tools to manage exam and social pressure.`,
    philosophy: "You don't have to earn your right to rest or be kind to yourself.",
    sessionFormat: "Online via Google Meet (video or audio call)",
    whatsappNumber: sharedWhatsApp,
    email: sharedEmail,
  },
  {
    name: "Dr. Vikram Singh",
    slug: "dr-vikram-singh",
    designation: "Consultant Clinical Psychologist",
    credentials: "M.Phil Clinical Psychology",
    rciNumber: "RCI/CL/2018/76542",
    photo: "/images/psychologists/dr-vikram-singh.png",
    photoWebp: "/images/psychologists/dr-vikram-singh.webp",
    languages: ["English", "Hindi", "Punjabi"],
    experience: "6+ years",
    sessionHours: "800+",
    specialties: ["Trauma", "Grief", "Anxiety", "Men's Mental Health", "Stress Management"],
    bio: `I create a steady, non-judgmental space for clients processing difficult experiences or chronic stress. My work integrates evidence-based therapy with a calm, grounded presence.`,
    philosophy: "Safety and trust are where healing begins.",
    sessionFormat: "Online via Google Meet (video or audio call)",
    whatsappNumber: sharedWhatsApp,
    email: sharedEmail,
  },
];

export function getAllPsychologists(): Psychologist[] {
  return psychologists;
}

export function getPsychologistBySlug(slug: string): Psychologist | undefined {
  return psychologists.find((p) => p.slug === slug);
}

export function getDefaultPsychologist(): Psychologist {
  return psychologists[0];
}

export function isValidPsychologistSlug(slug: string): boolean {
  return psychologists.some((p) => p.slug === slug);
}
