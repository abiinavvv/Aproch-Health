import localFont from "next/font/local";

export const googleSans = localFont({
  src: [
    {
      path: "../app/fonts/google-sans/google-sans-latin-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../app/fonts/google-sans/google-sans-latin-500-normal.woff2",
      weight: "500",
    },
    {
      path: "../app/fonts/google-sans/google-sans-latin-600-normal.woff2",
      weight: "600",
    },
    {
      path: "../app/fonts/google-sans/google-sans-latin-700-normal.woff2",
      weight: "700",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});
