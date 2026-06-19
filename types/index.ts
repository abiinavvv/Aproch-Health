export type SessionTypeId = "introductory" | "full";

export type SessionMode = "video" | "audio";

export type BookingStep = 1 | 2 | 3 | 4 | 5;

export interface BookingState {
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

export interface CreateOrderRequest {
  amount: number;
  sessionType: string;
  name: string;
  email: string;
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
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

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: { color: string };
  modal: { backdropclose: boolean };
  handler: (response: RazorpaySuccessResponse) => void;
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
