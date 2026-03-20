"use client";

import { motion } from "framer-motion";

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
  },
];

export function Pricing() {
  return (
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
              className={`group relative p-8 md:p-12 flex flex-col border border-antique-gold/10 rounded-[40px] bg-maroon/10 hover:bg-maroon/30 backdrop-blur-md transition-all duration-700 hover:border-antique-gold/40 ${
                tier.popular ? "shadow-[0_0_50px_rgba(212,175,55,0.05)] border-antique-gold/20" : ""
              }`}
              data-cursor="premium"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-antique-gold text-imperial-maroon text-[10px] font-bold tracking-widest uppercase rounded-full">
                  Most Requested
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
                    <div className="w-1 h-1 rounded-full bg-antique-gold/40 mt-1.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className="btn-gold w-full text-center"
                data-cursor="cta"
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
