"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export function Hero() {
  const videoSideRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videoSide = videoSideRef.current;
    const mask = maskRef.current;

    if (!videoSide || !mask) return;

    const moveMask = (e: MouseEvent) => {
      const rect = videoSide.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(mask, {
        x: x,
        y: y,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    videoSide.addEventListener("mousemove", moveMask);

    return () => {
      videoSide.removeEventListener("mousemove", moveMask);
    };
  }, []);

  const titleWords = "Love, Encapsulated in a Pixel.".split(" ");

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-onyx">
      {/* Left Side: Typography */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 py-20 z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-champagne text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-8"
        >
          Reimagining Tradition
        </motion.p>

        <h1 className="heading-xl mb-8 flex flex-wrap gap-x-4">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.2 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-pearl/60 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light"
        >
          The digital invitation, elevated. Cinematic motion, interactive
          folios, and bespoke artistry delivered to your guest’s palm in 24 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <button className="btn-premium btn-liquid" data-cursor="cta">
            <span className="relative z-10">Begin Your Story</span>
            <div className="liquid"></div>
          </button>
          <button className="btn-premium-outline" data-cursor="premium">
            View the Gallery
          </button>
        </motion.div>

        {/* Philosophy snippet */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-20 pt-10 border-t border-pearl/10"
        >
          <div className="flex items-start gap-6 max-w-lg">
            <span className="text-champagne text-xs font-serif italic">01 (Philosophy)</span>
            <p className="text-pearl/40 text-sm leading-relaxed">
              Beyond a Link. An Experience. By blending heritage aesthetics with
              modern interactivity, we create digital heirlooms that resonate far
              beyond the screen.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Video Mask following cursor */}
      <div
        ref={videoSideRef}
        className="hidden lg:block relative flex-1 bg-onyx-light overflow-hidden"
      >
        {/* Placeholder image/video for when not hovered */}
        <div 
          className="absolute inset-0 grayscale opacity-20 transition-opacity duration-700 hover:opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        {/* The Mask Element */}
        <div
          ref={maskRef}
          className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-20 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <div 
            className="absolute top-1/2 left-1/2 w-screen h-screen -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        </div>

        {/* Cinematic frame element */}
        <div className="absolute inset-0 border-[40px] border-onyx z-30 pointer-events-none opacity-50" />
      </div>

      {/* Mobile background/image (Hero) */}
      <div className="lg:hidden h-80 w-full relative">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx to-transparent" />
      </div>
    </section>
  );
}
