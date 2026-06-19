import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { psychologist } from "@/lib/psychologist";

export const metadata: Metadata = pageMetadata({
  title: "Our Psychologist",
  description: `Meet ${psychologist.name}, ${psychologist.designation}. RCI-registered clinical psychologist for students and young adults.`,
  path: "/our-psychologist",
});

export default function OurPsychologistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
