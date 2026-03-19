"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center section-padding overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-jewel-ruby/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-gold text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-6">
              WhatsApp Wedding Invites
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="heading-xl mb-6"
          >
            Tradition,{" "}
            <span className="text-gold-gradient italic">Digitized.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-offwhite/60 text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Expert-crafted digital wedding invitations for WhatsApp.
            Image, Video & PDF — delivered in under{" "}
            <span className="text-gold font-semibold">24 hours</span>,
            starting at just{" "}
            <span className="text-gold font-semibold">₹500</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20order%20a%20wedding%20invite!"
              target="_blank"
              rel="noopener noreferrer"
              className="clay px-8 py-4 text-charcoal font-bold text-base tracking-wide text-center"
              data-cursor="cta"
            >
              Order Now — ₹500
            </a>
            <a
              href="#services"
              className="glass px-8 py-4 text-offwhite font-medium text-base tracking-wide text-center hover:bg-glass-hover transition-colors"
              data-cursor="premium"
            >
              Explore Services
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-6 mt-10 justify-center lg:justify-start text-offwhite/40 text-sm"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              500+ Invites
            </div>
            <div className="w-px h-4 bg-offwhite/20" />
            <div>24h Delivery</div>
            <div className="w-px h-4 bg-offwhite/20" />
            <div>100% Custom</div>
          </motion.div>
        </div>

        {/* Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
          data-cursor="premium"
        >
          <div className="relative">
            {/* Glow behind phone */}
            <div className="absolute inset-0 bg-gold/10 rounded-[50px] blur-3xl scale-110" />

            <div className="phone-mockup glass-intense relative">
              {/* Status bar */}
              <div className="absolute top-0 left-0 right-0 h-11 flex items-end justify-between px-6 z-20 text-[10px] text-offwhite/60">
                <span>9:41</span>
                <span className="flex gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
                </span>
              </div>

              {/* Video invite loop simulation */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[33px] md:rounded-[37px]">
                <div
                  className="w-full h-full animate-gradient"
                  style={{
                    background: "linear-gradient(135deg, #1A1A2E 0%, #2D1B3D 25%, #1A2E2E 50%, #2E1A1A 75%, #1A1A2E 100%)",
                    backgroundSize: "400% 400%",
                  }}
                />
                {/* Overlay content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-gold/40 flex items-center justify-center mb-4 animate-pulse-glow">
                    <span className="text-2xl">💍</span>
                  </div>
                  <p className="font-serif text-xl md:text-2xl text-offwhite mb-1">Priya & Arjun</p>
                  <p className="text-gold text-xs tracking-widest uppercase">Invite You To Their</p>
                  <p className="font-serif text-lg text-offwhite/80 mt-1">Wedding Celebration</p>
                  <div className="mt-4 w-12 h-px bg-gold/40" />
                  <p className="text-offwhite/50 text-xs mt-3">December 28, 2025</p>
                  <p className="text-offwhite/40 text-[10px]">The Grand Palace, Jaipur</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-offwhite/30 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-offwhite/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
