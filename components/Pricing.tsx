"use client";

import { motion } from "framer-motion";

const tiers = [
  {
    name: "Base",
    subtitle: "Image Invite",
    price: "₹500",
    description: "Perfect for simple, elegant announcements",
    features: [
      "1 Custom Image Invite",
      "HD Resolution (1080×1920)",
      "WhatsApp Optimized",
      "2 Revision Rounds",
      "24-Hour Delivery",
    ],
    cta: "Start with Base",
    accent: "gold",
  },
  {
    name: "Premium",
    subtitle: "Video / PDF Invite",
    price: "₹1,500",
    description: "Cinematic motion or interactive documents",
    features: [
      "1 Video OR PDF Invite",
      "4K Resolution / Multi-page PDF",
      "Background Music / Interactive Maps",
      "Unlimited Revisions",
      "24-Hour Delivery",
      "WhatsApp Status Optimized",
    ],
    cta: "Go Premium",
    popular: true,
    accent: "gold",
  },
  {
    name: "Couture",
    subtitle: "Bespoke Package",
    price: "Custom",
    description: "The full experience, tailored to you",
    features: [
      "Image + Video + PDF Bundle",
      "Dedicated Designer",
      "Brand Identity Matching",
      "Animated RSVP Page",
      "Priority 12-Hour Delivery",
      "Social Media Kit",
      "Lifetime Asset Access",
    ],
    cta: "Contact Us",
    accent: "gold",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative section-padding">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/3 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Pricing
          </p>
          <h2 className="heading-lg mb-4">
            Invest in{" "}
            <span className="text-gold-gradient italic">Elegance</span>
          </h2>
          <p className="text-offwhite/50 max-w-2xl mx-auto">
            Premium design doesn&apos;t mean premium prices. Choose the plan that
            fits your celebration.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`group relative ${tier.popular ? "md:-mt-4 md:mb-4" : ""}`}
              data-cursor="premium"
            >
              <div
                className={`glass h-full p-8 transition-all duration-700 relative overflow-hidden hover:shadow-[0_0_40px_rgba(201,169,110,0.15)] ${
                  tier.popular
                    ? "border-gold/30 bg-gradient-to-b from-gold/5 to-transparent"
                    : ""
                }`}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-gold to-gold-dark text-charcoal text-xs font-bold px-4 py-1.5 rounded-bl-xl tracking-wider uppercase">
                      Popular
                    </div>
                  </div>
                )}

                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, rgba(201,169,110,0.1) 0%, transparent 70%)",
                  }}
                />

                <div className="relative z-10">
                  {/* Tier name */}
                  <p className="text-gold text-sm font-semibold tracking-[0.15em] uppercase mb-1">
                    {tier.name}
                  </p>
                  <p className="text-offwhite/40 text-xs mb-6">{tier.subtitle}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="font-serif text-5xl font-bold text-offwhite">
                      {tier.price}
                    </span>
                    {tier.price !== "Custom" && (
                      <span className="text-offwhite/40 text-sm ml-1">/ invite</span>
                    )}
                  </div>

                  <p className="text-offwhite/50 text-sm mb-8">{tier.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-offwhite/70"
                      >
                        <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center py-3.5 font-semibold text-sm tracking-wide transition-all duration-300 ${
                      tier.popular
                        ? "clay text-charcoal"
                        : "glass text-offwhite hover:border-gold/30"
                    }`}
                    data-cursor="cta"
                  >
                    {tier.cta}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
