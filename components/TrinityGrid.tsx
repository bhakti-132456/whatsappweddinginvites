"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Love Stories Told", value: "500+" },
  { label: "Masterpiece Delivery", value: "24-Hour" },
  { label: "Bespoke Craftsmanship", value: "100%" },
];

const services = [
  {
    id: "01",
    title: "Static Elegance",
    type: "Image",
    copy: "High-fidelity digital cards designed with editorial precision. Perfect for instant, effortless sharing.",
    specs: "4K Resolution • Custom Typography • WhatsApp Optimized",
    price: "₹500",
    className: "lg:col-span-2 lg:row-span-1",
    bg: "bg-onyx-light",
  },
  {
    id: "02",
    title: "Cinematic Motion",
    type: "Video",
    copy: "A sensory journey. We combine fluid animation, curated soundscapes, and your personal imagery into a 30-second masterpiece.",
    specs: "Studio Grade Audio • Parallax Visuals • Story-driven Narrative",
    price: "₹1,500",
    className: "lg:col-span-1 lg:row-span-2",
    bg: "bg-onyx-light",
    isPopular: true,
  },
  {
    id: "03",
    title: "Interactive Folio",
    type: "PDF",
    copy: "The complete concierge. A multi-page interactive document featuring live maps, RSVP integration, and your full itinerary.",
    specs: "Dynamic RSVP • Live Map Links • Multi-device Compatibility",
    price: "₹1,500",
    className: "lg:col-span-2 lg:row-span-1",
    bg: "bg-onyx-light",
  },
];

export function TrinityGrid() {
  return (
    <section id="services" className="relative section-padding bg-onyx">
      <div className="max-w-7xl mx-auto">
        {/* Stats / Numbers Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 border-b border-pearl/10 pb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center md:items-start"
            >
              <span className="text-champagne font-serif italic text-sm mb-2">0{i + 1}</span>
              <span className="heading-md md:text-4xl text-pearl mb-1">{stat.value}</span>
              <span className="text-pearl/40 text-xs tracking-widest uppercase">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Section Header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-champagne text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Collections
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-lg"
          >
            Select Your Medium
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`group relative overflow-hidden p-8 flex flex-col justify-between border border-pearl/5 ${service.className} ${service.bg} rounded-[40px] hover:border-champagne/20 transition-colors duration-500`}
              data-cursor="premium"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-champagne text-xs font-medium tracking-widest uppercase block mb-1">
                      {service.type}
                    </span>
                    <h3 className="heading-md text-2xl text-pearl">{service.title}</h3>
                  </div>
                  {service.isPopular && (
                    <span className="px-3 py-1 bg-champagne text-onyx text-[10px] font-bold tracking-tighter rounded-full uppercase">
                      Most Bespoke
                    </span>
                  )}
                </div>
                <p className="text-pearl/50 text-base max-w-sm mb-6 leading-relaxed">
                  {service.copy}
                </p>
                <div className="text-pearl/30 text-[10px] tracking-wider uppercase font-medium">
                  {service.specs}
                </div>
              </div>

              <div className="relative z-10 flex items-end justify-between mt-8">
                <span className="heading-md text-3xl text-champagne">{service.price}</span>
                <button className="btn-premium-outline !py-2 !px-6 text-[10px] magnetic-target" data-cursor="cta">
                  Explore
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 p-8 text-pearl/5 font-serif italic text-8xl pointer-events-none group-hover:text-champagne/5 transition-colors duration-500">
                {service.id}
              </div>
              
              {/* Organic border decoration */}
              <div className="absolute inset-0 border-[20px] border-onyx opacity-10 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
