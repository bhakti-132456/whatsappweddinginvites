"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Upload Assets",
    description:
      "Share your photos, event details, and any design preferences. Drop your files in our upload portal or send them via WhatsApp.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Expert Crafting",
    description:
      "Our designers bring your vision to life. We blend traditional aesthetics with modern design, crafting every detail to perfection.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "24h Delivery",
    description:
      "Receive your polished digital invite within 24 hours, ready to share on WhatsApp, Instagram, and everywhere else.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
];

export function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="process" className="relative section-padding overflow-hidden">
      <div className="max-w-5xl mx-auto" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            How It Works
          </p>
          <h2 className="heading-lg mb-4">
            From Idea to Invite in{" "}
            <span className="text-gold-gradient italic">24 Hours</span>
          </h2>
          <p className="text-offwhite/50 max-w-2xl mx-auto">
            A simple, seamless process designed around you. No stress, no delays.
          </p>
        </motion.div>

        {/* Countdown accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-16"
        >
          <div className="glass-intense px-8 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center animate-pulse-glow">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-gold">24</p>
            </div>
            <div>
              <p className="text-offwhite/70 text-sm font-medium">HOURS</p>
              <p className="text-offwhite/40 text-xs">Guaranteed Delivery</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full origin-top"
              style={{
                background: "linear-gradient(to bottom, transparent, var(--gold), transparent)",
              }}
            />
          </div>

          {/* Mobile line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full origin-top"
              style={{
                background: "linear-gradient(to bottom, transparent, var(--gold), transparent)",
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`relative flex items-start gap-8 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <div className="glass p-6 md:p-8 group hover:border-gold/20 transition-all duration-500">
                    <div className={`flex items-center gap-3 mb-4 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                      <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gold group-hover:shadow-[0_0_15px_rgba(201,169,110,0.2)] transition-shadow">
                        {step.icon}
                      </div>
                      <span className="text-gold/40 font-mono text-sm">{step.number}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-offwhite mb-3">
                      {step.title}
                    </h3>
                    <p className="text-offwhite/50 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold shadow-[0_0_20px_rgba(201,169,110,0.5)] z-10" />

                {/* Mobile dot */}
                <div className="md:hidden absolute left-6 -translate-x-1/2 top-8 w-3 h-3 rounded-full bg-gold shadow-[0_0_15px_rgba(201,169,110,0.5)] z-10" />

                {/* Empty half for desktop layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
