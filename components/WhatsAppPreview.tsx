"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function WhatsAppPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<"locked" | "notified" | "opened">("locked");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => setStage("notified"),
        onLeaveBack: () => setStage("locked"),
        onUpdate: (self) => {
          if (self.progress > 0.6) setStage("opened");
          else if (self.progress > 0.1) setStage("notified");
          else setStage("locked");
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-onyx section-padding flex flex-col items-center">
      <div className="sticky top-20 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        {/* Left Side: Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-champagne text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Experience
          </motion.p>
          <h2 className="heading-lg mb-6">See It In Motion</h2>
          <p className="text-pearl/50 text-lg lg:text-xl font-light leading-relaxed max-w-md mx-auto lg:mx-0">
            Experience how your invite feels in the hands of your guests. 
            Crisp, responsive, and breathtaking. Watch as the magic unfolds 
            directly on their device.
          </p>
          
          <div className="mt-12 flex flex-col gap-6">
            <div className={`transition-all duration-500 flex items-center gap-4 ${stage === "notified" ? "opacity-100" : "opacity-30"}`}>
                <div className="w-2 h-2 rounded-full bg-champagne" />
                <span className="text-pearl text-sm uppercase tracking-widest">The Arrival</span>
            </div>
            <div className={`transition-all duration-500 flex items-center gap-4 ${stage === "opened" ? "opacity-100" : "opacity-30"}`}>
                <div className="w-2 h-2 rounded-full bg-champagne" />
                <span className="text-pearl text-sm uppercase tracking-widest">The Unveiling</span>
            </div>
          </div>
        </div>

        {/* Right Side: 3D Phone */}
        <div className="flex-1 perspective-2000 py-20">
          <motion.div
            ref={phoneRef}
            style={{
                rotateY: stage === "locked" ? -20 : 0,
                rotateX: stage === "locked" ? 10 : 0,
            }}
            className="relative w-[300px] h-[600px] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            {/* iPhone Body */}
            <div className="absolute inset-0 bg-[#0a0a0a] rounded-[50px] border-[8px] border-[#1a1a1a] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Screen Content */}
                <div className="relative w-full h-full bg-onyx flex flex-col">
                    {/* Lock Screen */}
                    <AnimatePresence>
                        {stage !== "opened" && (
                            <motion.div 
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -100 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 z-30 bg-black/40 backdrop-blur-md flex flex-col items-center pt-20"
                            >
                                <span className="text-pearl/80 text-6xl font-light mb-2">9:41</span>
                                <span className="text-pearl/40 text-sm uppercase tracking-widest">Thursday, March 19</span>
                                
                                {/* Notification */}
                                <AnimatePresence>
                                    {stage === "notified" && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            className="mt-20 w-[260px] bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-3xl"
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-5 h-5 rounded-md bg-emerald-500 flex items-center justify-center text-[10px]">WA</div>
                                                <span className="text-pearl/80 text-[10px] font-bold uppercase tracking-tight">WhatsApp</span>
                                                <span className="text-pearl/40 text-[10px] ml-auto">now</span>
                                            </div>
                                            <p className="text-pearl text-xs font-bold mb-0.5">Wedding Invitation</p>
                                            <p className="text-pearl/60 text-xs line-clamp-1">You are cordially invited to celebrate...</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="mt-auto pb-10">
                                    <div className="w-32 h-1 bg-pearl/20 rounded-full" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Opened Invite */}
                    <div className="flex-1 flex flex-col">
                        <div className="h-20 bg-[#202C33] flex items-center px-6 pt-8 gap-4">
                            <div className="w-8 h-8 rounded-full bg-champagne/20 flex items-center justify-center text-xs">💍</div>
                            <div>
                                <p className="text-pearl text-[10px] font-bold">Wedding Gallery</p>
                                <p className="text-emerald-400 text-[8px]">online</p>
                            </div>
                        </div>
                        <div className="flex-1 bg-[#0b141a] p-4 flex flex-col gap-4 overflow-hidden">
                            <div className="w-[80%] bg-[#202c33] rounded-2xl rounded-tl-none p-3 self-start">
                                <p className="text-pearl/80 text-[10px]">Tap to view your bespoke invitation ✨</p>
                            </div>
                            
                            <motion.div 
                                animate={stage === "opened" ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                                className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative shadow-2xl"
                            >
                                <div 
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80')" }}
                                />
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                    <h4 className="heading-md text-xl text-pearl mb-2">Priya & Arjun</h4>
                                    <div className="w-8 h-px bg-champagne/40 mb-3" />
                                    <p className="text-champagne text-[8px] uppercase tracking-[0.2em] font-bold">Invite You</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Home bar */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full z-40" />
                </div>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-2xl z-50 flex items-center justify-center gap-2">
                    <div className="w-10 h-1 bg-black/40 rounded-full" />
                    <div className="w-2 h-2 rounded-full bg-blue-900/20" />
                </div>
            </div>

            {/* Reflection flare */}
            <div className="absolute -inset-20 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rotate-45 transform-gpu" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
