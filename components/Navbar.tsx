"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "Journey", href: "#onboarding" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing", accent: "antique-gold" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-6xl transition-all duration-500 rounded-full border border-antique-gold/10 ${
          scrolled ? "bg-maroon/80 backdrop-blur-xl py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" : "bg-transparent py-6"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group" data-cursor="premium">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-antique-gold/30 bg-maroon flex items-center justify-center text-antique-gold heading-invite text-xl md:text-2xl transition-transform group-hover:rotate-12 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              W
            </div>
            <span className="heading-serif text-xl md:text-2xl tracking-tight text-off-white group-hover:text-antique-gold transition-colors">
              Heritage
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] font-bold text-pearl/40 hover:text-champagne transition-colors duration-300 tracking-[0.2em] uppercase"
                data-cursor="premium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollTo("#studio")}
            className="hidden md:flex btn-gold !py-2.5 !px-8 text-[10px] magnetic-target !rounded-full"
            data-cursor="cta"
          >
            Get Started
          </button>

          {/* Mobile Menu Button — visible hamburger with gold lines */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-full border border-antique-gold/20 bg-maroon/40"
            aria-label="Menu"
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
              className="w-4 h-[1.5px] bg-antique-gold rounded-full"
            />
            <motion.div
              animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
              className="w-4 h-[1.5px] bg-antique-gold rounded-full"
            />
            <motion.div
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
              className="w-4 h-[1.5px] bg-antique-gold rounded-full"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu — Full screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-imperial-maroon/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {/* Decorative background */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-antique-gold/[0.02] blur-[100px]" />
            </div>

            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="heading-invite text-5xl text-off-white hover:text-antique-gold transition-colors duration-300"
              >
                {link.label}
              </motion.button>
            ))}

            {/* Mobile CTA */}
            <motion.button
              onClick={() => scrollTo("#studio")}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: navLinks.length * 0.08, duration: 0.5 }}
              className="mt-4 btn-gold !bg-antique-gold !text-imperial-maroon !rounded-full !px-12 text-sm"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
