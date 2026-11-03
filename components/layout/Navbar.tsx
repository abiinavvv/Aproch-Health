"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, CalendarCheck } from "lucide-react";
import SiteLogo from "@/components/brand/SiteLogo";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ThemeToggle from "@/components/theme/ThemeToggle";
import NavbarClock from "@/components/layout/NavbarClock";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/our-psychologist", label: "Our Psychologists" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/therapy", label: "Therapy" },
  { href: "/nutrition", label: "Food & Nutrition" },
];

const crisisHelpBase =
  "inline-flex items-center justify-center rounded-full border border-red-500/80 font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-400/70 dark:text-red-400 dark:hover:bg-red-950/30";

const crisisHelpMobileClassName = `${crisisHelpBase} h-8 shrink-0 px-2 text-xs`;

const crisisHelpDesktopClassName = `${crisisHelpBase} px-3 py-1.5 text-sm`;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function isServicesActive(pathname: string) {
  return pathname.startsWith("/therapy") || pathname.startsWith("/nutrition");
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  const linkClass = (href: string) =>
    `nav-link-warm whitespace-nowrap text-sm font-medium xl:text-[15px] ${
      isActive(pathname, href) ? "nav-link-warm-active" : ""
    }`;

  const servicesTriggerClass = `nav-link-warm inline-flex items-center gap-0.5 whitespace-nowrap text-sm font-medium xl:text-[15px] ${
    isServicesActive(pathname) ? "nav-link-warm-active" : ""
  }`;

  const headerBackgroundClass = menuOpen
    ? "bg-hero-cream/95 shadow-sm"
    : scrolled
      ? "bg-hero-cream/95 shadow-sm backdrop-blur-sm"
      : "bg-transparent";

  const renderDesktopLink = (link: (typeof navLinks)[number]) => (
    <Link key={link.href} href={link.href} className={linkClass(link.href)}>
      {link.label}
    </Link>
  );

  return (
    <>
      <header
        className={`theme-surface fixed top-0 z-50 w-full transition-all duration-300 ${headerBackgroundClass}`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 lg:gap-4 lg:px-6 lg:py-3.5 xl:gap-6 xl:px-8">
          <Link href="/" className="group inline-flex shrink-0 items-center">
            <SiteLogo priority className="h-11 md:h-12 lg:h-13 xl:h-14" />
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-x-4 xl:gap-x-6 lg:flex">
            {navLinks.slice(0, 3).map(renderDesktopLink)}

            <div className="relative shrink-0" ref={servicesRef}>
              <button
                type="button"
                className={servicesTriggerClass}
                aria-expanded={servicesOpen}
                aria-haspopup="menu"
                onClick={() => setServicesOpen((open) => !open)}
              >
                Our Services
                <ChevronDown
                  size={14}
                  className={`shrink-0 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    role="menu"
                    className="absolute left-1/2 top-full z-50 mt-3 w-[220px] -translate-x-1/2 rounded-2xl border border-border bg-white p-2 shadow-lg"
                  >
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-hero-cream/80 ${
                          isActive(pathname, link.href)
                            ? "text-primary"
                            : "text-dark-text"
                        }`}
                        onClick={() => setServicesOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(3).map(renderDesktopLink)}
          </div>

          <div className="ml-auto hidden shrink-0 items-center gap-2.5 xl:gap-3 lg:flex">
            <Link href="/crisis-help" className={crisisHelpDesktopClassName}>
              Crisis Help
            </Link>
            <NavbarClock />
            <ThemeToggle />
            <Link
              href="/book"
              className="glass-btn-warm inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium xl:px-5"
            >
              <CalendarCheck size={16} aria-hidden />
              Book a Session
            </Link>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
            <Link href="/crisis-help" className={crisisHelpMobileClassName}>
              Crisis Help
            </Link>
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
              className="theme-surface fixed right-0 top-0 z-[70] flex h-full w-72 flex-col overflow-y-auto bg-surface p-6 shadow-lg backdrop-blur-none lg:hidden"
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

              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border-b border-border py-4 text-base font-medium ${linkClass(link.href)}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-b border-border">
                <button
                  type="button"
                  className={`flex w-full items-center justify-between py-4 text-left text-base font-medium ${
                    isServicesActive(pathname)
                      ? "nav-link-warm-active"
                      : "nav-link-warm"
                  }`}
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen((open) => !open)}
                >
                  Our Services
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="pb-3 pl-3">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block py-2.5 text-sm font-medium ${
                          isActive(pathname, link.href)
                            ? "text-primary"
                            : "text-body-text"
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.slice(3).map((link) => (
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
