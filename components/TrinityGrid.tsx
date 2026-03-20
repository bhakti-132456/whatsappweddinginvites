"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Smartphone, Globe, Shield, ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Cinematic Narratives",
    desc: "A bespoke filmic experience designed for the infinite scroll. High-fidelity storytelling for your special day.",
    icon: <Camera className="w-5 h-5 text-antique-gold" />,
    style: "md:col-span-2 md:h-[400px]",
  },
  {
    title: "The Signature PDF",
    desc: "Interactive heirlooms with embedded media and live direction to your venue.",
    icon: <Shield className="w-5 h-5 text-antique-gold" />,
    style: "md:col-span-1 md:h-[350px] md:mt-20",
  },
  {
    title: "WhatsApp Mastery",
    desc: "Engineered for rapid delivery and global reach without compromising on visual luxury.",
    icon: <Smartphone className="w-5 h-5 text-antique-gold" />,
    style: "md:col-span-1 md:h-[450px] md:-mt-10",
  },
  {
    title: "Digital Vault",
    desc: "Your invitation preserved in the cloud, accessible for generations to come.",
    icon: <Globe className="w-5 h-5 text-antique-gold" />,
    style: "md:col-span-2 md:h-[300px] md:-mt-20",
  }
];

export function TrinityGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".bento-card-v5");
    cards.forEach((card: any) => {
      gsap.from(card, {
        opacity: 0,
        y: 60,
        rotateX: -5,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "top 70%",
          scrub: 1
        }
      });
    });
  }, []);

  return (
    <section className="py-60 px-4 md:px-20 bg-imperial-maroon relative overflow-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
        <div className="mb-40 max-w-2xl">
           <p className="body-serif text-antique-gold mb-6 uppercase tracking-[0.4em] text-[10px]">Strategic Artistry</p>
           <h2 className="heading-invite text-[clamp(3.5rem,8vw,6rem)] leading-none text-off-white">
             Bespoke <span className="heading-serif italic text-antique-gold font-light">Digital Craft.</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item, i) => (
            <div 
              key={i} 
              className={`bento-card-v5 glass-maroon p-12 group flex flex-col justify-between hover:border-antique-gold/40 transition-all duration-700 ${item.style}`}
              data-cursor="premium"
            >
              <div className="flex justify-between items-start">
                <div className="p-4 bg-antique-gold/5 rounded-full border border-antique-gold/10 backdrop-blur-md">
                   {item.icon}
                </div>
                <ArrowUpRight className="w-5 h-5 text-antique-gold/20 group-hover:text-antique-gold transition-colors duration-500" />
              </div>

              <div>
                <h3 className="heading-invite text-[2.5rem] mb-6 text-off-white group-hover:text-antique-gold transition-colors duration-700">{item.title}</h3>
                <p className="body-serif text-sm text-off-white/40 leading-relaxed">{item.desc}</p>
                <div className="mt-8 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-antique-gold to-transparent transition-all duration-1000" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Parallax Backdrop */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-0 opacity-[0.02] pointer-events-none select-none overflow-hidden w-full">
         <span className="heading-invite text-[40vw] md:text-[25vw] text-antique-gold whitespace-nowrap block text-center">Invitation Artistry</span>
      </div>
    </section>
  );
}
