"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PreviewType = "image" | "video" | "pdf";

const previews: Record<PreviewType, { content: React.ReactNode; label: string }> = {
  image: {
    label: "Image",
    content: (
      <div className="w-full aspect-[3/4] rounded-lg overflow-hidden relative bg-gradient-to-br from-charcoal-light to-charcoal">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mb-3">
            <span className="text-xl">💍</span>
          </div>
          <p className="font-serif text-lg text-offwhite">Priya & Arjun</p>
          <p className="text-gold text-[10px] tracking-widest uppercase mt-1">Wedding Celebration</p>
          <div className="w-8 h-px bg-gold/30 mt-3 mb-2" />
          <p className="text-offwhite/50 text-[10px]">Dec 28, 2025 · Jaipur</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
      </div>
    ),
  },
  video: {
    label: "Video",
    content: (
      <div className="w-full aspect-[9/16] rounded-lg overflow-hidden relative">
        <div
          className="w-full h-full animate-gradient"
          style={{
            background: "linear-gradient(135deg, #1A2E2E 0%, #2D1B3D 33%, #2E1A1A 66%, #1A1A2E 100%)",
            backgroundSize: "400% 400%",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mb-2 animate-pulse-glow">
            <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="font-serif text-sm text-offwhite">Priya & Arjun</p>
          <p className="text-gold text-[8px] tracking-widest uppercase">Save the Date</p>
        </div>
      </div>
    ),
  },
  pdf: {
    label: "PDF",
    content: (
      <div className="w-full aspect-[3/4] rounded-lg overflow-hidden relative bg-offwhite/5">
        <div className="p-4">
          <div className="border-b border-offwhite/10 pb-3 mb-3">
            <p className="font-serif text-sm text-gold text-center">Wedding Invitation</p>
          </div>
          <div className="space-y-3 text-[9px] text-offwhite/50">
            <div className="text-center">
              <p className="font-serif text-base text-offwhite mb-1">Priya & Arjun</p>
              <p className="text-gold text-[8px] tracking-wider uppercase">Request your presence</p>
            </div>
            <div className="w-6 h-px bg-gold/30 mx-auto" />
            <div className="space-y-1">
              <p className="flex items-center gap-1"><span className="text-gold">📅</span> December 28, 2025</p>
              <p className="flex items-center gap-1"><span className="text-gold">📍</span> Grand Palace, Jaipur</p>
              <p className="flex items-center gap-1"><span className="text-gold">🕐</span> 6:00 PM Onwards</p>
            </div>
            <div className="glass rounded-lg p-2 text-center">
              <p className="text-[8px] text-gold">RSVP by Dec 15</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

export function WhatsAppPreview() {
  const [activeType, setActiveType] = useState<PreviewType>("video");

  return (
    <section id="preview" className="relative section-padding overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Live Preview
          </p>
          <h2 className="heading-lg mb-4">
            See It in{" "}
            <span className="text-gold-gradient italic">WhatsApp</span>
          </h2>
          <p className="text-offwhite/50 max-w-2xl mx-auto">
            Toggle between formats to see exactly how your invite will look inside a WhatsApp chat.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="space-y-4 mb-8">
              {(Object.keys(previews) as PreviewType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeType === type
                      ? "glass-intense border-gold/30 shadow-[0_0_20px_rgba(201,169,110,0.1)]"
                      : "glass hover:border-offwhite/10"
                  }`}
                  data-cursor="premium"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium text-sm ${activeType === type ? "text-gold" : "text-offwhite/60"}`}>
                        {previews[type].label} Invite
                      </p>
                      <p className="text-offwhite/30 text-xs mt-0.5">
                        {type === "image" && "Static high-res card"}
                        {type === "video" && "Animated motion invite"}
                        {type === "pdf" && "Multi-page document"}
                      </p>
                    </div>
                    <div className={`w-3 h-3 rounded-full transition-all ${
                      activeType === type ? "bg-gold shadow-[0_0_10px_var(--gold)]" : "bg-offwhite/10"
                    }`} />
                  </div>
                </button>
              ))}
            </div>

            <div className="glass p-6 rounded-xl">
              <p className="text-offwhite/40 text-xs uppercase tracking-wider mb-2">How it works</p>
              <p className="text-offwhite/60 text-sm leading-relaxed">
                Your invite is optimized for WhatsApp&apos;s compression. We ensure it looks crisp on any device — 
                from budget smartphones to the latest flagships.
              </p>
            </div>
          </motion.div>

          {/* Phone Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
            data-cursor="premium"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-gold/5 rounded-[50px] blur-3xl scale-110" />

              <div className="phone-mockup glass-intense relative">
                {/* WhatsApp header */}
                <div className="absolute top-0 left-0 right-0 bg-[#202C33] z-20 rounded-t-[33px] md:rounded-t-[37px]">
                  <div className="h-7" /> {/* Notch space */}
                  <div className="flex items-center gap-3 px-4 py-2">
                    <svg className="w-5 h-5 text-offwhite/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-xs">
                      💒
                    </div>
                    <div>
                      <p className="text-offwhite text-xs font-medium">Family Group</p>
                      <p className="text-offwhite/40 text-[10px]">52 members</p>
                    </div>
                  </div>
                </div>

                {/* Chat area */}
                <div className="absolute inset-0 pt-24 pb-14 px-3 wa-chat-bg rounded-[33px] md:rounded-[37px] overflow-hidden">
                  <div className="flex flex-col gap-2 h-full overflow-y-auto">
                    {/* Incoming message */}
                    <div className="wa-bubble max-w-[85%]">
                      <p className="text-[10px] text-emerald-400 font-medium mb-1">Mom ❤️</p>
                      <p className="text-[11px]">Look what came! 🎉✨</p>
                      <p className="text-[8px] text-offwhite/40 text-right mt-1">11:42 AM</p>
                    </div>

                    {/* The invite preview */}
                    <div className="wa-bubble max-w-[85%]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeType}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                        >
                          {previews[activeType].content}
                        </motion.div>
                      </AnimatePresence>
                      <p className="text-[8px] text-offwhite/40 text-right mt-1">11:42 AM</p>
                    </div>

                    {/* Reaction */}
                    <div className="wa-bubble wa-bubble-sent max-w-[60%]">
                      <p className="text-[11px]">This is SO beautiful! 😍🥹</p>
                      <p className="text-[8px] text-offwhite/40 text-right mt-1">11:43 AM</p>
                    </div>
                  </div>
                </div>

                {/* Input bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#202C33] rounded-b-[33px] md:rounded-b-[37px] px-3 py-2 flex items-center gap-2">
                  <div className="flex-1 bg-[#2A3942] rounded-full px-3 py-1.5">
                    <p className="text-offwhite/30 text-[10px]">Type a message</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
