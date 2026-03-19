"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "Upload", href: "#upload" },
  { label: "Preview", href: "#preview" },
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
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-6xl transition-all duration-500 ${
          scrolled ? "glass-intense" : "glass"
        }`}
        style={{ borderRadius: 20 }}
      >
        <div className="flex items-center justify-between px-6 py-3 md:py-4 md:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" data-cursor="premium">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-charcoal font-bold text-sm">
              W
            </div>
            <span className="font-serif text-lg md:text-xl font-semibold text-offwhite group-hover:text-gold transition-colors">
              WWI
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-offwhite/70 hover:text-gold transition-colors duration-300 tracking-wide"
                data-cursor="premium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20order%20a%20wedding%20invite!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex clay px-6 py-2.5 text-charcoal font-semibold text-sm tracking-wide hover:brightness-110"
            data-cursor="cta"
          >
            Order Now
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
              className="w-6 h-0.5 bg-offwhite rounded"
            />
            <motion.div
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              className="w-6 h-0.5 bg-offwhite rounded"
            />
            <motion.div
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
              className="w-6 h-0.5 bg-offwhite rounded"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-charcoal/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl font-serif font-medium text-offwhite hover:text-gold transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20order%20a%20wedding%20invite!"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="clay px-8 py-3 text-charcoal font-semibold text-lg mt-4"
            >
              Order Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
