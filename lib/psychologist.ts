import { getDefaultPsychologist } from "@/lib/psychologists";

/** @deprecated Prefer getPsychologistBySlug / getAllPsychologists from lib/psychologists */
export const psychologist = getDefaultPsychologist();

export {
  psychologists,
  getAllPsychologists,
  getPsychologistBySlug,
  getDefaultPsychologist,
  isValidPsychologistSlug,
} from "@/lib/psychologists";
