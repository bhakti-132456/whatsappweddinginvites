"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Static polished phone mockup showing a demo invite.
 * Replaces the heavy Three.js 3D Canvas with a lightweight CSS-only phone frame.
 */
export default function PhonePreview() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade + rise on scroll into view
      gsap.from(phoneRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.92,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: phoneRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        }
      });

      // Subtle float
      gsap.to(phoneRef.current, {
        y: -10,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center py-20">
      {/* Background Narrative Label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
        <h2 className="heading-invite text-[15rem] md:text-[20rem] text-muted-gold whitespace-nowrap">PREVIEW</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
        {/* The Phone Frame */}
        <div ref={phoneRef} className="relative">
          {/* Phone body */}
          <div className="relative w-[300px] h-[620px] rounded-[3rem] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-[6px] shadow-[0_0_80px_rgba(0,0,0,0.6),0_0_30px_rgba(212,175,55,0.08)]">
            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30" />

            {/* Screen */}
            <div ref={contentRef} className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-[#FFF5F5]">
              {/* Demo Invite — Floral Template with Rose Theme */}
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center relative" style={{ fontFamily: 'Georgia, serif' }}>
                {/* Corner ornaments */}
                <span className="absolute top-4 left-4 text-7xl opacity-15 text-[#C9786A]">❧</span>
                <span className="absolute top-4 right-4 text-7xl opacity-15 text-[#C9786A] rotate-90">❧</span>
                <span className="absolute bottom-4 left-4 text-7xl opacity-15 text-[#C9786A] -rotate-90">❧</span>
                <span className="absolute bottom-4 right-4 text-7xl opacity-15 text-[#C9786A] rotate-180">❧</span>

                <p className="text-[9px] uppercase tracking-[0.2em] mb-8 text-[#C9786A]">Together with their families</p>

                {/* Couple photo placeholder */}
                <div className="w-20 h-20 rounded-full border-2 border-[#C9786A]/30 bg-gradient-to-br from-[#C9786A]/10 to-[#C9786A]/5 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#C9786A]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
                  </svg>
                </div>

                <h1 className="text-2xl text-[#3D1F1A] mb-0 leading-tight">Ananya</h1>
                <div className="text-4xl opacity-25 text-[#C9786A] leading-none my-1">&</div>
                <h1 className="text-2xl text-[#3D1F1A] mb-6 leading-tight">Vikram</h1>

                <div className="w-12 h-[1px] bg-[#C9786A]/30 mb-5" />

                <p className="text-[9px] uppercase tracking-widest text-[#8A5550]/60 mb-3">
                  Request the pleasure of your company
                </p>
                <p className="text-lg text-[#3D1F1A] mb-2">28 December, 2025</p>
                <p className="text-[10px] text-[#8A5550]/70 max-w-[200px] leading-relaxed">
                  The Grand Palace, Jaipur
                </p>

                <div className="mt-8">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#C9786A] mb-1">Sangeet Ceremony</p>
                  <p className="text-[10px] text-[#8A5550]/60">27 December, 2025</p>
                </div>

                {/* Subtle RSVP button */}
                <div className="mt-8 px-6 py-2 rounded-full border border-[#C9786A]/30 text-[8px] font-bold tracking-[0.2em] uppercase text-[#C9786A]">
                  RSVP
                </div>
              </div>
            </div>
          </div>

          {/* Reflective edge highlight */}
          <div className="absolute inset-0 rounded-[3rem] pointer-events-none" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)'
          }} />
        </div>

        {/* Floating Description Labels */}
        <div className="max-w-[220px] space-y-8 hidden md:block">
          <div className="glass-maroon p-6 rounded-2xl flex flex-col gap-3">
            <span className="body-technical text-[8px] text-antique-gold uppercase tracking-widest">WhatsApp Ready</span>
            <p className="body-serif text-[11px] text-off-white/40 leading-relaxed">
              Optimized for instant delivery. Your invite opens beautifully in any chat.
            </p>
          </div>
          <div className="glass-maroon p-6 rounded-2xl flex flex-col gap-3">
            <span className="body-technical text-[8px] text-antique-gold uppercase tracking-widest">4K Resolution</span>
            <p className="body-serif text-[11px] text-off-white/40 leading-relaxed">
              1080×1920 studio-grade quality. Crystal clear on every screen.
            </p>
          </div>
          <div className="glass-maroon p-6 rounded-2xl flex flex-col gap-3">
            <span className="body-technical text-[8px] text-antique-gold uppercase tracking-widest">4 Templates</span>
            <p className="body-serif text-[11px] text-off-white/40 leading-relaxed">
              Floral · Minimal · Royal · Modern — each a masterpiece.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
