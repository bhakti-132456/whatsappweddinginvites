"use client";

export function Footer() {
  return (
    <footer className="h-[80vh] w-full bg-imperial-maroon flex items-center justify-center border-t border-antique-gold/10 relative overflow-hidden">
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
         <p className="body-serif text-[10px] text-antique-gold mb-12 uppercase tracking-[0.5em]">Experience the Heirloom</p>
         <h2 className="heading-invite text-[clamp(4rem,10vw,8rem)] leading-none text-off-white/80">
            Love, <br />
            <span className="heading-serif italic text-antique-gold font-light">Digitized.</span>
          </h2>
          
          <div className="mt-20 flex flex-wrap justify-center gap-12 md:gap-24">
             <div className="flex flex-col gap-6">
                <span className="body-serif text-[10px] text-antique-gold/40 text-left uppercase tracking-widest">Navigation</span>
                <div className="flex flex-col items-start gap-3">
                   {[
                     { label: "Live Studio", href: "#studio" },
                     { label: "Our Craft", href: "#services" },
                     { label: "The Journey", href: "#onboarding" },
                     { label: "Pricing", href: "#pricing" },
                   ].map((link) => (
                      <a key={link.label} href={link.href} className="body-serif text-sm text-off-white/60 hover:text-antique-gold transition-colors duration-300">{link.label}</a>
                   ))}
                </div>
             </div>
             
             <div className="flex flex-col gap-6">
                <span className="body-serif text-[10px] text-antique-gold/40 text-left uppercase tracking-widest">Connect</span>
                <div className="flex flex-col items-start gap-3">
                   <a href="mailto:concierge@whatsappweddinginvites.com" className="body-serif text-sm text-off-white/80 hover:text-antique-gold transition-colors duration-300">
                     concierge@whatsappweddinginvites.com
                   </a>
                   <a href="tel:+919425012345" className="body-serif text-[10px] text-antique-gold/60 uppercase tracking-widest hover:text-antique-gold transition-colors duration-300">
                     +91 94250 12345
                   </a>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 mt-2">
                  {/* Instagram */}
                  <a 
                    href="https://instagram.com/whatsappweddinginvites" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 rounded-full border border-antique-gold/20 hover:border-antique-gold/60 hover:bg-antique-gold/10 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 text-antique-gold/50 group-hover:text-antique-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a 
                    href="https://wa.me/919425012345?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20a%20wedding%20invitation" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 rounded-full border border-antique-gold/20 hover:border-antique-gold/60 hover:bg-antique-gold/10 transition-all duration-300"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-4 h-4 text-antique-gold/50 group-hover:text-antique-gold transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>
             </div>
          </div>

          {/* Trust Signals */}
          <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3 text-antique-gold/30">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
              <span className="body-serif text-[10px] uppercase tracking-widest">500+ Designs Delivered</span>
            </div>
            <div className="flex items-center gap-3 text-antique-gold/30">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="body-serif text-[10px] uppercase tracking-widest">5★ Client Reviews</span>
            </div>
            <div className="flex items-center gap-3 text-antique-gold/30">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span className="body-serif text-[10px] uppercase tracking-widest">24-Hour Delivery</span>
            </div>
          </div>
          
          <div className="mt-20 pt-12 border-t border-antique-gold/5 flex flex-col md:flex-row justify-between items-center gap-4 body-serif text-[9px] text-antique-gold/20 uppercase tracking-widest">
             <span>© 2026 WhatsApp Wedding Invites</span>
             <span>Refined with Love for the Modern Visionary</span>
          </div>
      </div>
    </footer>
  );
}
