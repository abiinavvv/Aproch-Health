import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { getAllPsychologists } from "@/lib/psychologists";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  const routes = [
    "",
    "/how-it-works",
    "/our-psychologist",
    "/book",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/book" ? 0.9 : 0.7,
  }));

  const profileEntries: MetadataRoute.Sitemap = getAllPsychologists().map((p) => ({
    url: `${baseUrl}/our-psychologist/${p.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticEntries, ...profileEntries];
}
