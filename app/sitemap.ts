import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { getAllPsychologists } from "@/lib/psychologists";
import { getAllNutritionists } from "@/lib/nutritionists";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  const routes = [
    "",
    "/how-it-works",
    "/our-psychologist",
    "/therapy",
    "/nutrition",
    "/book",
    "/contact",
    "/crisis-help",
    "/privacy",
    "/terms",
    "/refund-policy",
    "/minor-safety-policy",
    "/security-policy",
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

  const nutritionEntries: MetadataRoute.Sitemap = getAllNutritionists().map(
    (n) => ({
      url: `${baseUrl}/nutrition/${n.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })
  );

  return [...staticEntries, ...profileEntries, ...nutritionEntries];
}
