import type { FAQItem } from "@/types";

export const homeFAQ: FAQItem[] = [
  {
    question: "Is my session confidential?",
    answer:
      "Absolutely. Everything you share in your session stays between you and your psychologist. We follow strict professional confidentiality standards, and your information is never shared without your explicit consent.",
  },
  {
    question: "What platform is the session conducted on?",
    answer:
      "Sessions are held on Google Meet, which works directly in your browser — no app download needed. You can choose video or audio-only based on your comfort.",
  },
  {
    question: "Can I cancel or reschedule?",
    answer:
      "Yes. We understand plans change. Reach out to us on WhatsApp or email at least 24 hours before your session, and we'll help you find a new time that works.",
  },
  {
    question: "What qualifications do our psychologists have?",
    answer:
      "All psychologists on Aproch Health are RCI-registered with M.Phil or equivalent qualifications in Clinical Psychology. RCI (Rehabilitation Council of India) registration ensures verified, professional credentials.",
  },
  {
    question: "How do I book and pay?",
    answer:
      "Complete the booking form on our website, then send your details to us on WhatsApp. We'll confirm your slot and share payment instructions if needed. UPI and other common methods are accepted once your booking is confirmed.",
  },
  {
    question: "What happens after I book?",
    answer:
      "After you send your booking request on WhatsApp, we'll confirm your slot. About 30 minutes before your session, your psychologist will share the Google Meet link. Just click the link when it's time — that's it.",
  },
  {
    question: "How long is a session?",
    answer:
      "We offer two options: a 30-minute introductory session (₹500) for your first conversation, and a 60-minute full session (₹999) for deeper work. You can choose what feels right for you.",
  },
  {
    question: "Can I switch psychologists later?",
    answer:
      "Yes. You can choose a different psychologist when booking a new session. If you'd like guidance on who might be the best fit, reach out to us on WhatsApp and we'll help you decide.",
  },
];

export const contactFAQ: FAQItem[] = [
  {
    question: "What if I need to cancel last minute?",
    answer:
      "We know life happens. Contact us as soon as you can via WhatsApp or email. While we appreciate 24 hours notice, we'll always try to accommodate you and find a new slot.",
  },
  {
    question: "Is the platform safe for minors?",
    answer:
      "Aproch Health is designed for adults aged 18–30. If you're under 18, we recommend seeking support through a parent, guardian, or a youth-focused mental health service.",
  },
  {
    question: "Do you offer sliding scale pricing?",
    answer:
      "We're working on making therapy even more accessible. For now, our introductory session at ₹500 is our most affordable option. Reach out if cost is a barrier — we're happy to talk.",
  },
];

export const allFAQ: FAQItem[] = [...homeFAQ, ...contactFAQ];
