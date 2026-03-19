"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Image Invite",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    description: "Stunning, high-resolution digital cards designed to captivate. Perfect for quick distribution across WhatsApp groups.",
    price: "Starting ₹500",
    features: ["HD Resolution", "Custom Design", "WhatsApp Optimized", "Unlimited Shares"],
    gradient: "from-gold/20 to-jewel-ruby/10",
  },
  {
    title: "Video Invite",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
      </svg>
    ),
    description: "Cinematic motion-designed invitations with music, animations, and your story. The ultimate luxury e-invite.",
    price: "Starting ₹1,500",
    features: ["4K Video", "Background Music", "Story Animation", "Shareable Link"],
    popular: true,
    gradient: "from-gold/20 to-jewel-emerald/10",
  },
  {
    title: "PDF Invite",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    description: "Elegant multi-page digital booklets with ceremony details, maps, RSVP, and more — all in one sharable document.",
    price: "Starting ₹1,500",
    features: ["Multi-Page", "Interactive Maps", "RSVP Section", "Print Ready"],
    gradient: "from-gold/20 to-gold-dark/10",
  },
];

export function TrinityGrid() {
  return (
    <section id="services" className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Our Services
          </p>
          <h2 className="heading-lg mb-4">
            Three Ways to Say{" "}
            <span className="text-gold-gradient italic">&ldquo;I Do&rdquo;</span>
          </h2>
          <p className="text-offwhite/50 max-w-2xl mx-auto">
            Choose the format that matches your celebration. Every invite is
            hand-crafted by our expert designers.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
              data-cursor="premium"
            >
              {/* Popular badge */}
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 clay px-4 py-1 text-charcoal text-xs font-bold tracking-wider uppercase">
                  Most Popular
                </div>
              )}

              <div
                className={`glass h-full p-8 transition-all duration-500 group-hover:border-gold/30 relative overflow-hidden ${
                  service.popular ? "border-gold/20" : ""
                }`}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-gold mb-6 group-hover:shadow-[0_0_20px_rgba(201,169,110,0.3)] transition-shadow duration-500">
                    {service.icon}
                  </div>

                  {/* Title & Description */}
                  <h3 className="heading-md text-xl mb-3">{service.title}</h3>
                  <p className="text-offwhite/50 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-offwhite/60"
                      >
                        <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-serif text-xl font-semibold">
                      {service.price}
                    </span>
                    <a
                      href="https://wa.me/919999999999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clay px-5 py-2 text-charcoal text-sm font-semibold"
                      data-cursor="cta"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
