"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Leaf, CalendarCheck } from "lucide-react";
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

  return (
    <header
      className={`theme-surface fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-hero-cream/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="group flex items-start gap-1.5">
          <div className="flex flex-col leading-none">
            <span className="flex items-center gap-1.5 font-body text-[22px] font-bold text-hero-brown">
              Aproch
              <Leaf
                size={18}
                className="text-hero-accent"
                strokeWidth={2}
                aria-hidden
              />
            </span>
            <span className="mt-0.5 font-body text-[11px] font-semibold tracking-[0.22em] text-hero-nav">
              HEALTH
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
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

        <div className="flex items-center gap-3 lg:hidden">
          <NavbarClock />
          <ThemeToggle />
          <button
            type="button"
            className="text-hero-nav"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={shouldReduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-hero-cream p-6 shadow-lg lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <ThemeToggle />
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
    </header>
  );
}
