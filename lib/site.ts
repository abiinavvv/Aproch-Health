export const SITE_NAME = "Aproch Health";
export const SITE_TAGLINE = "Mental wellness support for young India";
export const SITE_DESCRIPTION =
  "Book a session with a verified clinical psychologist. Online. Affordable. Confidential.";
export const SITE_EMAIL = "hello@aprochhealth.com";

export const DEFAULT_WHATSAPP_NUMBER = "919562170975";

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (url) return url.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://aprochhealth.com";
}

/** Digits-only WhatsApp number with India country code (91…) */
export function normalizeWhatsAppNumber(raw?: string): string {
  const input = raw?.trim() || DEFAULT_WHATSAPP_NUMBER;
  const digits = input.replace(/\D/g, "");

  if (digits.length === 10) return `91${digits}`;
  if (digits.startsWith("91") && digits.length === 12) return digits;
  return digits || DEFAULT_WHATSAPP_NUMBER;
}

export function getWhatsAppNumber(): string {
  return normalizeWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
}

export function getRciNumber(): string {
  return process.env.NEXT_PUBLIC_RCI_NUMBER?.trim() || "";
}

export function getInstagramUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim();
  return url || null;
}

export function getLinkedInUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim();
  return url || null;
}
