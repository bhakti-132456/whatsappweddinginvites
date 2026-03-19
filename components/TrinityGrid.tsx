"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Editorial Design",
    desc: "Vogue-inspired layouts curated with high-end typography and spatial awareness.",
    span: "md:col-span-2 md:row-span-2",
    icon: "📖",
  },
  {
    title: "Cinematic Motion",
    desc: "4K fluid motion experiences with orchestrated soundscapes.",
    span: "md:col-span-1 md:row-span-1",
    icon: "🎬",
  },
  {
    title: "Interactive Folio",
    desc: "The digital heirloom reimagined as a responsive interaction hub.",
    span: "md:col-span-1 md:row-span-2",
    icon: "✨",
  },
  {
    title: "Bespoke Branding",
    desc: "Every invitation is a unique identity system for your union.",
    span: "md:col-span-1 md:row-span-1",
    icon: "💎",
  },
];

export function TrinityGrid() {
  return (
    <section id="services" className="relative section-padding bg-onyx">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div>
              <p className="body-mono text-champagne mb-4">The Collections</p>
              <h2 className="heading-lg">Bespoke Design, <br /><span className="italic">Detached from the Ordinary</span></h2>
           </div>
           <div className="max-w-md">
              <p className="text-pearl/40 text-sm leading-relaxed">
                We don&apos;t build invitations; we craft digital legacies. Our Bento 2.0 system ensures spatial coherence and high-fidelity interaction across every device.
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className={`glass-2 p-12 flex flex-col justify-between group h-full min-h-[400px] ${service.span}`}
              data-cursor="premium"
            >
              <div>
                <span className="text-4xl mb-8 block">{service.icon}</span>
                <h3 className="heading-md mb-4 text-pearl group-hover:text-champagne transition-colors">{service.title}</h3>
                <p className="text-pearl/40 text-sm leading-relaxed max-w-xs">{service.desc}</p>
              </div>
              <div className="mt-8">
                 <div className="w-12 h-px bg-pearl/10 group-hover:w-24 group-hover:bg-matte-gold transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
