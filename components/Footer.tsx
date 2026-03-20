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
                   {["Our Artistry", "The Concierge", "Heritage Legacy", "Send Inquiry"].map((link) => (
                      <a key={link} className="body-serif text-sm text-off-white/60 hover:text-antique-gold transition-colors duration-300 cursor-pointer">{link}</a>
                   ))}
                </div>
             </div>
             
             <div className="flex flex-col gap-6">
                <span className="body-serif text-[10px] text-antique-gold/40 text-left uppercase tracking-widest">Connect</span>
                <div className="flex flex-col items-start gap-1">
                   <p className="body-serif text-sm text-off-white/80">concierge@whatsappweddinginvites.com</p>
                   <p className="body-serif text-[10px] text-antique-gold/60 uppercase tracking-widest mt-2">+91 94250 12345</p>
                </div>
             </div>
          </div>
          
          <div className="mt-32 pt-12 border-t border-antique-gold/5 flex flex-col md:flex-row justify-between items-center gap-4 body-serif text-[9px] text-antique-gold/20 uppercase tracking-widest">
             <span>© 2026 WhatsApp Wedding Invites</span>
             <span>Refined with Love for the Modern Visionary</span>
          </div>
      </div>
    </footer>
  );
}
