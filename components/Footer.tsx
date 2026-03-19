"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative bg-onyx pt-20">
      {/* CTA Banner */}
      <section className="section-padding relative overflow-hidden border-t border-pearl/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <h2 className="heading-xl text-5xl lg:text-7xl mb-8 text-pearl">
            Your Legacy, <br />
            <span className="text-champagne italic">Awaiting its Unveiling</span>
          </h2>
          <p className="text-pearl/40 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
            From the first pixel to the final Reveal, we craft invitations that 
            transcend the digital medium.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="btn-premium !px-12 !py-5 text-xs tracking-widest uppercase font-bold" data-cursor="cta">
              Craft My Invitation
            </button>
            <a
              href="#services"
              className="text-pearl/40 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-champagne transition-colors"
              data-cursor="premium"
            >
              Explore Collections
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer bar */}
      <div className="border-t border-pearl/5 mt-20">
        <div className="max-w-7xl mx-auto px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-champagne flex items-center justify-center text-onyx font-serif font-bold text-sm">
              W
            </div>
            <span className="font-serif text-lg text-pearl tracking-tight">Heritage Digital</span>
          </div>

          <p className="text-pearl/20 text-[10px] uppercase tracking-widest text-center">
            © {new Date().getFullYear()} Heritage. A Digital Heirloom Experience.
          </p>

          <div className="flex items-center gap-8">
            <a href="#" className="text-pearl/20 hover:text-champagne transition-colors text-[10px] uppercase tracking-widest font-bold" data-cursor="premium" aria-label="Instagram">Instagram</a>
            <a href="#" className="text-pearl/20 hover:text-champagne transition-colors text-[10px] uppercase tracking-widest font-bold" data-cursor="premium" aria-label="WhatsApp">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
