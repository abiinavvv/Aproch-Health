import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Crisis Helplines",
  description:
    "India crisis and emergency helplines — suicide support, domestic violence, childline, and emergency services. Aproch Health does not provide emergency care.",
  path: "/crisis-help",
});

export default function CrisisHelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
