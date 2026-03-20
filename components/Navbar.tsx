"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Journey", href: "#onboarding" },
  { label: "Process", href: "#process" },
  { label: "Preview", href: "#preview" },
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
        <div className="flex items-center justify-between px-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group" data-cursor="premium">
            <div className="w-12 h-12 rounded-full border border-antique-gold/30 bg-maroon flex items-center justify-center text-antique-gold heading-invite text-2xl transition-transform group-hover:rotate-12 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              W
            </div>
            <span className="heading-serif text-2xl tracking-tight text-off-white group-hover:text-antique-gold transition-colors">
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
            className="hidden md:flex btn-gold !py-2.5 !px-8 text-[10px] magnetic-target"
            data-cursor="cta"
          >
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
              className="w-6 h-px bg-pearl"
            />
            <motion.div
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              className="w-6 h-px bg-pearl"
            />
            <motion.div
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
              className="w-6 h-px bg-pearl"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-onyx flex flex-col items-center justify-center gap-12 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-4xl font-serif text-pearl hover:text-champagne transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
