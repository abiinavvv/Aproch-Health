import type { Psychologist } from "@/types";
import { getWhatsAppNumber, SITE_EMAIL } from "@/lib/site";

const sharedWhatsApp = getWhatsAppNumber();
const sharedEmail = SITE_EMAIL;

export const psychologists: Psychologist[] = [
  {
    name: "Safiyath T S",
    slug: "safiyath-t-s",
    designation: "Consultant Psychologist",
    credentials: "M.Sc. Applied Psychology",
    rciNumber: "",
    photo: "/images/psychologists/safiyath-t-s.png",
    photoWebp: "/images/psychologists/safiyath-t-s.webp",
    languages: ["English", "Malayalam"],
    experience: "Consultant",
    sessionHours: "250+",
    sessionFee: 799,
    specialties: [
      "Anxiety Spectrum",
      "Mood Swings",
      "Personality Disorders",
      "Emotional Outburst",
      "Anger Issues",
      "Relationship Issues",
      "Trust Issues",
    ],
    bio: `Safiyath T S is a compassionate psychologist who believes in creating a safe, supportive space where individuals feel heard and understood. With experience working across rehabilitation, child guidance, and mental health settings, she supports children, adolescents, and adults through life's emotional and behavioral challenges. Her approach combines empathy with evidence-based care, helping clients build resilience, confidence, and meaningful change. At Aproch Health, she shares our belief that mental well-being is deeply connected to overall health, making care more holistic, accessible, and human.`,
    philosophy:
      "Mental well-being is deeply connected to overall health.",
    tagline: "Healing starts here",
    sessionFormat: "Online via Google Meet (video or audio call)",
    whatsappNumber: sharedWhatsApp,
    email: sharedEmail,
  },
  {
    name: "Swathija Das K V",
    slug: "swathija-das-kv",
    designation: "Consultant Psychologist",
    credentials: "M.Sc. Psychology",
    rciNumber: "",
    photo: "/images/psychologists/swathija-das-kv.png",
    photoWebp: "/images/psychologists/swathija-das-kv.webp",
    languages: ["English", "Malayalam"],
    experience: "Professional",
    sessionHours: "1000+",
    sessionFee: 999,
    specialties: [
      "Anxiety",
      "Depression",
      "Stress Disorders",
      "Grief",
      "Relationship Issues",
      "Family Therapy",
      "Anger Issues",
    ],
    bio: `Swathija Das K V believes that everyone deserves a safe space to be heard without judgment. She is passionate about supporting people through life's challenges with empathy, understanding, and practical guidance. Her goal is to help individuals feel more confident, balanced, and emotionally well, one conversation at a time. As part of Aproch Health, she shares our vision of making mental healthcare more accessible, compassionate, and connected to overall well-being.`,
    philosophy:
      "Everyone deserves a safe space to be heard without judgment.",
    tagline: "One conversation at a time",
    sessionFormat: "Online via Google Meet (video or audio call)",
    whatsappNumber: sharedWhatsApp,
    email: sharedEmail,
  },
  {
    name: "Parvathi R",
    slug: "parvathi-r",
    designation: "Consultant Psychologist & Certified Clinical Hypnotherapist",
    credentials: "MA Psychology",
    rciNumber: "",
    photo: "/images/psychologists/parvathi-r.png",
    photoWebp: "/images/psychologists/parvathi-r.webp",
    languages: ["English", "Malayalam"],
    experience: "Consultant",
    sessionHours: "250+",
    sessionFee: 799,
    specialties: [
      "Anxiety",
      "Depression",
      "Stress Disorders",
      "Grief",
      "Relationship Issues",
      "Family Therapy",
      "Anger Issues",
    ],
    bio: `Parvathi R is a Consultant Psychologist and Certified Clinical Hypnotherapist who is passionate about helping children, adolescents, and adults navigate emotional and behavioral challenges with empathy and understanding. She combines evidence-based psychological practices with hypnotherapy to create a supportive, personalized space where individuals can grow, heal, and build resilience. At Aproch Health, she believes in making mental healthcare approachable, compassionate, and centered around each person's unique journey.`,
    philosophy:
      "Mental healthcare should be approachable, compassionate, and centered around each person's unique journey.",
    tagline: "Healing starts here",
    sessionFormat: "Online via Google Meet (video or audio call)",
    whatsappNumber: sharedWhatsApp,
    email: sharedEmail,
  },
  {
    name: "Gopika Muraleedhran",
    slug: "gopika-muraleedhran",
    designation: "Consultant Psychologist",
    credentials: "M.Sc. Psychology",
    rciNumber: "",
    photo: "/images/psychologists/gopika-muraleedhran.png?v=2",
    photoWebp: "/images/psychologists/gopika-muraleedhran.webp?v=2",
    languages: ["English", "Malayalam"],
    experience: "Consultant",
    sessionHours: "200+",
    sessionFee: 799,
    specialties: [
      "Anxiety",
      "Depression",
      "Stress Disorders",
      "Grief",
      "Relationship Issues",
      "Family Therapy",
      "Anger Issues",
    ],
    bio: `Gopika Muraleedhran is a Consultant Psychologist specializing in psychotherapy, counseling, and hypnotherapy. With experience in clinical and online mental health settings, she is dedicated to providing compassionate, evidence-based care while helping individuals overcome emotional and psychological challenges. At Aproch Health, she is committed to creating a safe, non-judgmental space where every individual feels heard, supported, and empowered to take meaningful steps toward lasting mental well-being.`,
    philosophy:
      "Every individual deserves to feel heard, supported, and empowered toward lasting well-being.",
    tagline: "Lasting well-being begins here",
    sessionFormat: "Online via Google Meet (video or audio call)",
    whatsappNumber: sharedWhatsApp,
    email: sharedEmail,
  },
  {
    name: "Nidhuna Narayanan",
    slug: "nidhuna-narayanan",
    designation: "Consultant Psychologist",
    credentials: "M.Sc. Psychology",
    rciNumber: "",
    photo: "/images/psychologists/nidhuna-narayanan.png?v=2",
    photoWebp: "/images/psychologists/nidhuna-narayanan.webp?v=2",
    languages: ["English", "Malayalam"],
    experience: "Consultant",
    sessionHours: "250+",
    sessionFee: 799,
    specialties: [
      "Relationship Difficulties",
      "Anxiety",
      "Stress",
      "Marital Problems",
      "Lack of Motivation",
      "Burnout",
    ],
    bio: `I believe that healing is not about becoming someone different—it is about rediscovering your strength, understanding your experiences, and moving forward with confidence. My goal is to provide a supportive and confidential environment where you feel safe to speak openly, without fear of judgment. Together, we will work toward meaningful, evidence-based solutions that respect your unique experiences, values, and aspirations. Every step forward, no matter how small, is a step toward a healthier and more fulfilling life. I am honored to be a part of your journey through Aproch Health.`,
    philosophy: "Your story matters. Let's move forward, together.",
    tagline: "Your story matters",
    sessionFormat: "Online via Google Meet (video or audio call)",
    whatsappNumber: sharedWhatsApp,
    email: sharedEmail,
  },
  {
    name: "Sagar M",
    slug: "sagar-m",
    designation: "Psychologist",
    credentials: "M.Sc. Clinical Psychology",
    rciNumber: "",
    photo: "/images/psychologists/sagar-m.jpg",
    languages: ["English", "Kannada", "Hindi", "Telugu", "Tamil"],
    experience: "School-based & clinical",
    sessionHours: "200+",
    sessionFee: 799,
    specialties: [
      "Anxiety & Stress Management",
      "Emotional Regulation",
      "Overthinking & Negative Thought Patterns",
      "Self-Esteem & Confidence",
      "Academic & Performance Stress",
      "Behavioural Concerns",
      "Adjustment Difficulties",
      "Interpersonal & Relationship Concerns",
      "Adolescent Mental Health",
      "Emotional & Social Difficulties",
    ],
    bio: `Sagar M is a Psychologist with a Master's degree in Clinical Psychology and experience in school-based mental health support, individual counselling and short-term therapeutic interventions, along with clinical exposure in psychiatric and rehabilitation settings.

He believes in creating a safe, empathetic and non-judgmental space where individuals feel comfortable expressing their thoughts and emotions. His approach focuses on understanding each individual's unique experiences, identifying emotional and behavioural patterns, and helping them develop healthier coping strategies.

With an emphasis on Cognitive Behavioural Therapy (CBT), Rational Emotive Behaviour Therapy (REBT), supportive counselling and trauma-informed approaches, he aims to help individuals improve emotional well-being, build self-awareness and navigate life's challenges with greater confidence. He works with children, adolescents, young adults and adults.`,
    philosophy:
      "A safe, empathetic space to understand your patterns and grow with confidence.",
    tagline: "A safe space to understand and grow",
    sessionFormat: "Online via Google Meet (video or audio call)",
    whatsappNumber: sharedWhatsApp,
    email: sharedEmail,
  },
  {
    name: "Madhav Chaturvedi",
    slug: "madhav-chaturvedi",
    designation: "Consultant Psychologist",
    credentials: "MSc Counselling Psychology",
    rciNumber: "",
    photo: "/images/psychologists/madhav-chaturvedi.jpg",
    languages: ["English", "Hindi"],
    experience: "Consultant",
    sessionHours: "150+",
    sessionFee: 749,
    specialties: [
      "Anger Management",
      "Relationship Difficulties",
      "Burnout",
      "Anxiety",
      "Depression",
      "Grief",
    ],
    bio: `Madhav welcomes you to a safe, warm space where your lived experience is truly honored and you are respected as the expert of your own life. Madhav integrates a collaborative, feminist lens with person centered empathy, narrative storytelling, and practical cognitive tools to help you navigate life's challenges. Together, we will look beyond labels to untangle societal pressures, uncover your natural resilience, and re-author your story on your own terms.`,
    philosophy: "A warm space to re-author your story on your own terms.",
    tagline: "A warm space to re-author your story",
    sessionFormat: "Online via Google Meet (video or audio call)",
    whatsappNumber: sharedWhatsApp,
    email: sharedEmail,
  },
  {
    name: "Ranjeeta Shantappa R. Patil",
    slug: "ranjeeta-patil",
    designation: "Consultant Psychologist",
    credentials: "M.Sc. Clinical Psychology",
    rciNumber: "",
    photo: "/images/psychologists/ranjeeta-patil.jpg",
    languages: ["English"],
    experience: "College & clinical",
    sessionHours: "200+",
    sessionFee: 799,
    specialties: [
      "Anxiety and Stress Management",
      "Depression and Emotional Wellbeing",
      "Women's Mental Health",
      "Relationship and Interpersonal Concerns",
      "Self-Esteem and Identity",
      "Emotional Regulation",
      "Adolescent and Young Adult Mental Health",
    ],
    bio: `I am a Consultant Psychologist with a postgraduate background in Clinical Psychology and experience across educational and clinical settings. My work and interests centre around understanding human behaviour, emotional experiences and the factors that influence psychological wellbeing.

I have worked as a College Psychologist and completed clinical internships at KR Hospital, Mind and Brain Hospital, Spandana Nursing Home and Maarga Mindcare Hospital, with experience in student counselling, mental health awareness and psychological wellbeing initiatives.

I am particularly interested in women's mental health, relationship dynamics, self-esteem and the emotional challenges individuals experience at different stages of life. I value an individualised approach to counselling, with an emphasis on understanding each person's concerns, background and perspectives.

My aim is to help individuals make sense of their experiences, identify patterns that may be affecting their wellbeing and develop practical ways of navigating their concerns.`,
    philosophy:
      "An individualised space to make sense of your experiences and move forward.",
    tagline: "Make sense of your experiences",
    sessionFormat: "Online via Google Meet (video or audio call)",
    whatsappNumber: sharedWhatsApp,
    email: sharedEmail,
  },
  {
    name: "Theertha",
    slug: "theertha",
    designation: "Psychologist",
    credentials: "M.Sc. Clinical & Counselling Psychology",
    rciNumber: "",
    photo: "/images/psychologists/theertha.jpg",
    languages: ["English", "Malayalam"],
    experience: "Clinical & research",
    sessionHours: "200+",
    sessionFee: 799,
    specialties: [
      "Psychological Assessment",
      "CBT-based Interventions",
      "Individual Therapy",
      "Mental Health Care",
    ],
    bio: `Theertha is a Psychologist with an M.Sc. in Clinical & Counselling Psychology from Kannur University and a B.Sc. in Psychology from the University of Kerala.

She has clinical experience in psychological assessment, CBT-based interventions, individual therapy, and mental health care, with additional research experience at Amrita Hospital.`,
    philosophy:
      "Evidence-informed care grounded in assessment, CBT, and individual therapy.",
    tagline: "Assessment, CBT, and individual care",
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

export function getPsychologistFirstName(name: string): string {
  const cleaned = name.replace(/^Dr\.?\s+/i, "").trim();
  return cleaned.split(/\s+/)[0] || name;
}

export function formatTherapyHours(sessionHours: string): string {
  return `${sessionHours} hours of therapy experience`;
}

export function formatSessionFee(fee: number): string {
  return `₹${fee.toLocaleString("en-IN")}`;
}

export function getPsychologistSessionFee(slug: string | null): number {
  if (slug) {
    const psychologist = getPsychologistBySlug(slug);
    if (psychologist) return psychologist.sessionFee;
  }
  return getDefaultPsychologist().sessionFee;
}
