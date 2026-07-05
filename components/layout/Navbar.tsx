"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, CalendarCheck } from "lucide-react";
import SiteLogo from "@/components/brand/SiteLogo";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ThemeToggle from "@/components/theme/ThemeToggle";
import NavbarClock from "@/components/layout/NavbarClock";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/our-psychologist", label: "Our Psychologists" },
  { href: "/book", label: "Book a Session" },
  { href: "/contact", label: "Contact" },
];

const crisisHelpBase =
  "inline-flex items-center justify-center rounded-full border border-red-500/80 font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-400/70 dark:text-red-400 dark:hover:bg-red-950/30";

const crisisHelpMobileClassName = `${crisisHelpBase} h-8 shrink-0 px-2 text-xs`;

const crisisHelpDesktopClassName = `${crisisHelpBase} px-3 py-1.5 text-sm`;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = (href: string) =>
    `nav-link-warm text-[15px] font-medium ${
      isActive(pathname, href) ? "nav-link-warm-active" : ""
    }`;

  const headerBackgroundClass = menuOpen
    ? "bg-hero-cream/95 shadow-sm"
    : scrolled
      ? "bg-hero-cream/95 shadow-sm backdrop-blur-sm"
      : "bg-transparent";

  return (
    <>
      <header
        className={`theme-surface fixed top-0 z-50 w-full transition-all duration-300 ${headerBackgroundClass}`}
      >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="group inline-flex items-center">
          <SiteLogo priority className="h-8 md:h-9" />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/crisis-help" className={crisisHelpDesktopClassName}>
            Crisis Help
          </Link>
          <NavbarClock />
          <ThemeToggle />
          <Link
            href="/book"
            className="glass-btn-warm inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium"
          >
            <CalendarCheck size={16} aria-hidden />
            Book a Session
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
          <Link href="/crisis-help" className={crisisHelpMobileClassName}>
            Crisis Help
          </Link>
          <div className="max-[400px]:hidden">
            <NavbarClock className="h-8 min-w-[5.5rem] px-2 text-xs sm:h-10 sm:min-w-[6.75rem] sm:px-3 sm:text-sm" />
          </div>
          <ThemeToggle className="h-8 w-8 sm:h-10 sm:w-10" />
          <button
            type="button"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-hero-nav sm:h-10 sm:w-10"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/30 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={shouldReduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="theme-surface fixed right-0 top-0 z-[70] flex h-full w-72 flex-col bg-surface p-6 shadow-lg backdrop-blur-none lg:hidden"
            >
              <div className="mb-8 flex items-center justify-end">
                <button
                  type="button"
                  className="text-hero-nav"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border-b border-border py-4 text-base font-medium ${linkClass(link.href)}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/crisis-help"
                className={`mt-4 border-b border-border py-4 text-base font-semibold text-red-600 ${linkClass("/crisis-help")}`}
                onClick={() => setMenuOpen(false)}
              >
                Crisis Help
              </Link>
              <Link
                href="/book"
                className="glass-btn-warm mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                <CalendarCheck size={16} aria-hidden />
                Book a Session
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
