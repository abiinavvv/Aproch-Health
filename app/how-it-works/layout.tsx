import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "How It Works",
  description:
    "Learn how to book an online therapy session with Aproch Health — from choosing a slot to meeting your psychologist on Google Meet.",
  path: "/how-it-works",
});

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
