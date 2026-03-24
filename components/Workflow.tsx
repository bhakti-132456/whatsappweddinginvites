"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mandala } from "./Mandala";

const steps = [
  {
    title: "The Discovery",
    desc: "A deep dive into your love story. We extract the essence of your heirloom through a personalized consultation.",
    tag: "Phase I",
    num: "01",
  },
  {
    title: "Bespoke Artistry",
    desc: "Our artists craft every pixel. Custom illustrations, high-end layouts, and cinematic motion design.",
    tag: "Phase II",
    num: "02",
  },
  {
    title: "Cinematic Unveil",
    desc: "The digital invitation sent as a high-fidelity experience via WhatsApp, optimized for all devices.",
    tag: "Phase III",
    num: "03",
  },
  {
    title: "Life-Long Legacy",
    desc: "Your invitation remains as a digital archive, a timeless heirloom for generations to celebrate.",
    tag: "Phase IV",
    num: "04",
  }
];

export function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollWidth = scrollRef.current?.offsetWidth || 0;
    const windowWidth = window.innerWidth;

    const ctx = gsap.context(() => {
      // Horizontal scroll
      gsap.to(scrollRef.current, {
        x: () => -(scrollWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Staggered card reveals — each one rises and fades in on scroll
      const cards = gsap.utils.toArray(".journey-step");
      cards.forEach((card: any, i: number) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          scale: 0.85,
          rotateY: -8,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "left 90%",
            end: "left 60%",
            scrub: 1,
            containerAnimation: gsap.getById?.("horizontalScroll") || undefined,
          }
        });
      });

      // Connecting thread that draws as you scroll
      if (threadRef.current) {
        gsap.from(threadRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 1,
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="relative overflow-hidden bg-imperial-maroon">
      {/* Subtle Background Life */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <Mandala className="absolute -top-[20%] -left-[10%] w-[60vw] text-antique-gold/5 animate-slow-spin opacity-50" />
        <Mandala className="absolute -bottom-[20%] -right-[10%] w-[60vw] text-antique-gold/5 animate-slow-spin opacity-50 direction-reverse" />
        <div className="absolute inset-0 bg-shimmer opacity-30" />
      </div>

      {/* Intro Header */}
      <div className="h-screen flex flex-col items-center justify-center text-center px-4 relative z-10">
         <p className="body-serif text-antique-gold/60 mb-4 uppercase tracking-[0.4em] text-xs">The Evolution</p>
         <h2 className="heading-invite text-[clamp(3.5rem,8vw,6rem)] text-off-white drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">
           A Journey Through <br />
           <span className="heading-serif italic text-antique-gold font-light">Time & Tradition</span>
         </h2>
         <div className="mt-12 flex items-center gap-4 text-antique-gold/30 body-serif text-[10px] uppercase tracking-widest">
            <span>Begin Scroll</span>
            <div className="w-12 h-[1px] bg-antique-gold/30" />
            <svg className="w-4 h-4 animate-scroll-bounce text-antique-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
         </div>
      </div>

      {/* Horizontal Track */}
      <div ref={scrollRef} className="flex h-screen w-max items-center px-[5vw] md:px-[20vw] gap-[10vw] md:gap-[15vw] relative z-10">
        {/* Connecting golden thread */}
        <div ref={threadRef} className="absolute top-1/2 left-[5vw] right-0 h-[1px] bg-gradient-to-r from-antique-gold/30 via-antique-gold/10 to-transparent pointer-events-none z-0" />

        {steps.map((step, i) => (
          <div key={i} className="journey-step w-[85vw] md:w-[450px] flex-shrink-0 group relative">
            {/* Step connector dot */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-antique-gold/20 border border-antique-gold/30 group-hover:bg-antique-gold/40 transition-colors duration-500 hidden md:block" />

            <div className="glass-maroon p-8 md:p-12 rounded-[40px] border border-antique-gold/10 group-hover:border-antique-gold/30 transition-all duration-700">
              <div className="flex items-start justify-between mb-8">
                <span className="body-serif text-antique-gold/50 text-[10px] uppercase tracking-widest">{step.tag}</span>
                <span className="heading-serif text-4xl text-antique-gold/10 italic">{step.num}</span>
              </div>
              <h3 className="heading-invite text-5xl mb-6 text-off-white group-hover:tracking-wider transition-all duration-700">{step.title}</h3>
              <p className="body-serif text-off-white/60 leading-relaxed tracking-normal text-sm">{step.desc}</p>
              
              <div className="mt-12 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-antique-gold to-transparent transition-all duration-1000" />
            </div>
          </div>
        ))}
        
        {/* End Cap */}
        <div className="w-[50vw] flex items-center justify-center">
             <div className="text-center">
                <h2 className="heading-invite text-[clamp(4rem,10vw,8rem)] text-antique-gold/20 leading-none">
                  The Legacy <br /> 
                  <span className="heading-serif italic font-light">Begins Now.</span>
                </h2>
             </div>
        </div>
      </div>
    </section>
  );
}
