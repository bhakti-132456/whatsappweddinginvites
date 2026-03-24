"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tiers = [
  {
    name: "The Essential",
    subtitle: "Pure Impact",
    price: "₹500",
    description: "High-fidelity digital cards designed with editorial precision.",
    features: [
      "1 Custom Image Invite",
      "4K Resolution (1080×1920)",
      "WhatsApp Optimized",
      "2 Revision Rounds",
      "24-Hour Delivery",
    ],
    cta: "Select Essential",
    accent: "pearl",
    tier: "essential",
  },
  {
    name: "The Signature",
    subtitle: "The Masterpiece",
    price: "₹1,500",
    description: "Your choice of Cinematic Motion or the Interactive Folio.",
    features: [
      "Cinematic Video OR Interactive PDF",
      "Studio Grade Audio / Live Maps",
      "Story-driven Narrative",
      "Unlimited Refinements",
      "24-Hour Delivery",
      "Social Media Kit",
    ],
    cta: "Select Signature",
    popular: true,
    accent: "champagne",
    tier: "signature",
  },
  {
    name: "The Couture",
    subtitle: "The Ecosystem",
    price: "Custom",
    description: "The complete digital heirloom, tailored to your legacy.",
    features: [
      "Image + Video + PDF Bundle",
      "Dedicated Creative Lead",
      "Bespoke Visual Identity",
      "Animated RSVP Micro-site",
      "Priority 12-Hour Crafting",
      "Lifetime Asset Archive",
    ],
    cta: "Inquire Now",
    accent: "antique-gold",
    tier: "couture",
  },
];

// Inquiry Modal Component
function InquiryModal({ isOpen, onClose, selectedTier }: { isOpen: boolean; onClose: () => void; selectedTier: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const tierLabel = tiers.find(t => t.tier === selectedTier)?.name || selectedTier;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry for ${tierLabel} — WhatsApp Wedding Invites`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nSelected Tier: ${tierLabel}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:concierge@whatsappweddinginvites.com?subject=${subject}&body=${body}`;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-backdrop"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[90vw] max-w-lg bg-imperial-maroon border border-antique-gold/20 rounded-[2rem] p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-off-white/30 hover:text-antique-gold transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mb-8">
            <p className="body-serif text-antique-gold/40 text-[9px] uppercase tracking-[0.4em] mb-2">Selected Tier</p>
            <h3 className="heading-invite text-4xl text-antique-gold">{tierLabel}</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="body-serif text-antique-gold/40 text-[9px] uppercase tracking-widest">Your Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full bg-transparent border-b border-antique-gold/20 py-3 text-lg text-off-white outline-none focus:border-antique-gold transition-colors body-serif"
                placeholder="e.g. Priya Sharma"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="body-serif text-antique-gold/40 text-[9px] uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full bg-transparent border-b border-antique-gold/20 py-3 text-sm text-off-white outline-none focus:border-antique-gold transition-colors body-serif"
                  placeholder="you@email.com"
                />
              </div>
              <div className="space-y-2">
                <label className="body-serif text-antique-gold/40 text-[9px] uppercase tracking-widest">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  className="w-full bg-transparent border-b border-antique-gold/20 py-3 text-sm text-off-white outline-none focus:border-antique-gold transition-colors body-serif"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="body-serif text-antique-gold/40 text-[9px] uppercase tracking-widest">Message (Optional)</label>
              <textarea
                rows={3}
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className="w-full bg-maroon/30 border border-antique-gold/10 rounded-2xl p-4 text-sm text-off-white outline-none focus:border-antique-gold transition-colors body-serif resize-none"
                placeholder="Tell us about your wedding..."
              />
            </div>
            <button
              type="submit"
              className="btn-gold w-full text-center !bg-antique-gold !text-imperial-maroon hover:!bg-saffron !rounded-2xl"
            >
              Send Inquiry
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("");

  const openInquiry = (tier: string) => {
    setSelectedTier(tier);
    setModalOpen(true);
  };

  return (
    <>
      <section id="pricing" className="relative py-40 px-4 md:px-20 bg-imperial-maroon border-t border-antique-gold/5">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-24">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="body-serif text-antique-gold/60 text-xs uppercase tracking-[0.4em] mb-4"
            >
              Investment
            </motion.p>
            <h2 className="heading-invite text-[clamp(3rem,6vw,5rem)] text-off-white">
              Select Your <span className="heading-serif italic text-antique-gold font-light">Heritage Tier.</span>
            </h2>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`group relative p-8 md:p-12 flex flex-col border rounded-[40px] backdrop-blur-md transition-all duration-700 ${
                  tier.popular 
                    ? "bg-maroon/20 border-antique-gold/30 shadow-[0_0_60px_rgba(212,175,55,0.08)] md:scale-[1.03] hover:shadow-[0_0_80px_rgba(212,175,55,0.12)] hover:border-antique-gold/50" 
                    : tier.tier === "couture"
                    ? "bg-gradient-to-b from-maroon/10 to-maroon/30 border-antique-gold/15 hover:border-antique-gold/40"
                    : "bg-maroon/5 border-antique-gold/10 hover:bg-maroon/20 hover:border-antique-gold/30"
                }`}
                data-cursor="premium"
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-gradient-to-r from-antique-gold to-saffron text-imperial-maroon text-[9px] font-bold tracking-[0.15em] uppercase rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
                    ✦ Most Requested
                  </div>
                )}

                {tier.tier === "couture" && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-2 border border-antique-gold/40 text-antique-gold text-[9px] font-bold tracking-[0.15em] uppercase rounded-full bg-imperial-maroon">
                    By Appointment
                  </div>
                )}

                <div className="mb-10">
                  <p className="body-serif text-antique-gold/40 text-[10px] uppercase tracking-widest mb-1">{tier.subtitle}</p>
                  <h3 className="heading-invite text-4xl text-off-white group-hover:text-antique-gold transition-colors duration-500">{tier.name}</h3>
                </div>

                <div className="mb-8">
                  <span className="heading-serif italic text-4xl text-antique-gold">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="body-serif text-off-white/20 text-xs ml-2">/ creation</span>}
                </div>

                <p className="body-serif text-off-white/50 text-sm mb-10 leading-relaxed min-h-[3rem]">
                  {tier.description}
                </p>

                <ul className="space-y-4 mb-12 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-xs body-serif text-off-white/40">
                      <div className={`w-1 h-1 rounded-full mt-1.5 ${tier.popular ? "bg-antique-gold/60" : "bg-antique-gold/30"}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => openInquiry(tier.tier)}
                  className={`w-full text-center py-4 font-bold tracking-[0.15em] uppercase text-sm transition-all duration-500 rounded-2xl ${
                    tier.popular
                      ? "bg-antique-gold text-imperial-maroon hover:bg-saffron shadow-[0_4px_20px_rgba(212,175,55,0.2)]"
                      : "btn-gold !rounded-2xl"
                  }`}
                  data-cursor="cta"
                >
                  {tier.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} selectedTier={selectedTier} />
    </>
  );
}
