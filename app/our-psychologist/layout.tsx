import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Our Psychologists",
  description:
    "Meet our team of RCI-registered clinical psychologists. Online therapy for students and young adults across India.",
  path: "/our-psychologist",
});

export default function OurPsychologistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
