import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Book a Session",
  description:
    "Book an online therapy session with a verified clinical psychologist. Choose your time, confirm on WhatsApp.",
  path: "/book",
});

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
