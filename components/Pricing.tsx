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
    accent: "champagne",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative section-padding bg-onyx-light">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-champagne text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Investment
          </motion.p>
          <h2 className="heading-lg">Select Your Tier</h2>
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
              className={`group relative p-10 flex flex-col border border-pearl/5 rounded-[40px] bg-onyx transition-all duration-500 hover:border-champagne/20 ${
                tier.popular ? "shadow-[0_0_50px_rgba(212,189,142,0.05)]" : ""
              }`}
              data-cursor="premium"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-champagne text-onyx text-[10px] font-bold tracking-widest uppercase rounded-full">
                  Most Requested
                </div>
              )}

              <div className="mb-10">
                <p className="text-pearl/40 text-[10px] uppercase tracking-widest mb-1">{tier.subtitle}</p>
                <h3 className="heading-md text-2xl text-pearl">{tier.name}</h3>
              </div>

              <div className="mb-8">
                <span className="heading-lg text-4xl text-champagne">{tier.price}</span>
                {tier.price !== "Custom" && <span className="text-pearl/20 text-xs ml-2">/ creation</span>}
              </div>

              <p className="text-pearl/50 text-sm mb-10 leading-relaxed min-h-[3rem]">
                {tier.description}
              </p>

              <ul className="space-y-4 mb-12 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-xs text-pearl/40">
                    <div className="w-1.5 h-1.5 rounded-full bg-champagne/40 mt-1" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full ${tier.popular ? "btn-premium" : "btn-premium-outline"} !py-4 transition-transform active:scale-95`}
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
