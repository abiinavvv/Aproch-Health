import type { Nutritionist } from "@/types";
import { getWhatsAppNumber, SITE_EMAIL } from "@/lib/site";

const sharedWhatsApp = getWhatsAppNumber();
const sharedEmail = SITE_EMAIL;

export const nutritionists: Nutritionist[] = [
  {
    name: "Prathyusha K. V.",
    slug: "prathyusha-k-v",
    designation: "Clinical Dietitian",
    credentials: "Clinical Dietitian",
    photo: "/images/nutritionists/prathyusha-k-v.png",
    photoWebp: "/images/nutritionists/prathyusha-k-v.webp",
    languages: ["Malayalam", "English", "Hindi"],
    experience: "Clinical Dietitian",
    sessionHours: "100+",
    sessionFee: 400,
    packageFee: 3499,
    specialties: [
      "Nutritional Assessment",
      "Diet Planning",
      "Dietary Counselling",
    ],
    bio: `Prathyusha K. V. is a Clinical Dietitian with experience in nutritional assessment, diet planning, and dietary counselling. She is passionate about promoting healthy eating habits and helping individuals make informed food choices to support their overall well-being.`,
    philosophy:
      "Informed food choices support lasting well-being.",
    tagline: "Informed food choices, lasting well-being",
    sessionFormat: "Online via Google Meet (video or audio call)",
    whatsappNumber: sharedWhatsApp,
    email: sharedEmail,
  },
];

export function getAllNutritionists(): Nutritionist[] {
  return nutritionists;
}

export function getNutritionistBySlug(slug: string): Nutritionist | undefined {
  return nutritionists.find((n) => n.slug === slug);
}

export function getDefaultNutritionist(): Nutritionist {
  return nutritionists[0];
}

export function isValidNutritionistSlug(slug: string): boolean {
  return nutritionists.some((n) => n.slug === slug);
}

export function formatNutritionHours(hours: string): string {
  return `${hours} hours of nutrition practice`;
}
