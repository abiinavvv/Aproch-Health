export type SessionTypeId = "introductory" | "full";

export type SessionMode = "video" | "audio";

export type BookingStep = 1 | 2 | 3 | 4 | 5;

export interface BookingState {
  psychologistSlug: string | null;
  sessionType: SessionTypeId | null;
  date: string | null;
  timeSlot: string | null;
  sessionMode: SessionMode | null;
  name: string;
  email: string;
  phone: string;
  age: string;
  intakeMessage: string;
  currentStep: BookingStep;
}

export interface SessionType {
  id: SessionTypeId;
  label: string;
  duration: number;
  price: number;
  tagline: string;
  description: string;
}

export interface Psychologist {
  name: string;
  slug: string;
  designation: string;
  credentials: string;
  rciNumber: string;
  photo: string;
  photoWebp?: string;
  languages: string[];
  experience: string;
  sessionHours: string;
  specialties: string[];
  bio: string;
  philosophy: string;
  sessionFormat: string;
  whatsappNumber: string;
  email: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  city: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface SendConfirmationRequest {
  name: string;
  email: string;
  date: string;
  time: string;
  sessionType: string;
  psychologistName: string;
  sessionMode?: string;
  duration?: number;
}
