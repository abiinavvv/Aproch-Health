import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/context/ThemeContext";
import { googleSans } from "@/lib/fonts";
import { rootMetadata } from "@/lib/metadata";
import { themeInitScript } from "@/lib/theme-schedule";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="day"
      suppressHydrationWarning
      className={`${googleSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-body text-body-text transition-colors duration-[1000ms] ease-in-out">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
