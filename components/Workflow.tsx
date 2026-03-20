"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mandala } from "./Mandala";

const steps = [
  {
    title: "The Discovery",
    desc: "A deep dive into your love story. We extract the essence of your heirloom through a personalized consultation.",
    tag: "Phase I"
  },
  {
    title: "Bespoke Artistry",
    desc: "Our artists craft every pixel. Custom illustrations, high-end layouts, and cinematic motion design.",
    tag: "Phase II"
  },
  {
    title: "Cinematic Unveil",
    desc: "The digital invitation sent as a high-fidelity experience via WhatsApp, optimized for all devices.",
    tag: "Phase III"
  },
  {
    title: "Life-Long Legacy",
    desc: "Your invitation remains as a digital archive, a timeless heirloom for generations to celebrate.",
    tag: "Phase IV"
  }
];

export function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollWidth = scrollRef.current?.offsetWidth || 0;
    const windowWidth = window.innerWidth;

    const ctx = gsap.context(() => {
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

      // Staggered card reveals in the horizontal track
      gsap.from(".journey-step", {
        y: 100,
        opacity: 0,
        scale: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "left center",
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-imperial-maroon">
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
         </div>
      </div>

      {/* Horizontal Track */}
      <div ref={scrollRef} className="flex h-screen w-max items-center px-[20vw] gap-[15vw] relative z-10">
        {steps.map((step, i) => (
          <div key={i} className="journey-step w-[450px] flex-shrink-0 group">
            <div className="glass-maroon p-12 rounded-[40px] border border-antique-gold/10 group-hover:border-antique-gold/30 transition-all duration-700">
              <span className="body-serif text-antique-gold/50 mb-8 block text-[10px] uppercase tracking-widest">{step.tag}</span>
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
