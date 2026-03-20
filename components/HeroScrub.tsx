"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Mandala } from "./Mandala";

gsap.registerPlugin(ScrollTrigger);

export function HeroScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mandalaRef = useRef<HTMLDivElement>(null);

  const targetTime = useRef(0);
  const currentTime = useRef(0);
  const rafId = useRef<number>(0);

  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    // Media Query for video source
    const updateVideoSrc = () => {
      const isMobile = window.innerWidth < 768;
      setVideoSrc(isMobile ? "/mobile-hero-scrub.mp4" : "/web-hero-scrub.mp4");
    };

    updateVideoSrc();
    window.addEventListener("resize", updateVideoSrc);

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // 1. Scrubbing Engine (LERP)
    const render = () => {
      if (video.readyState >= 2 && video.duration) {
        const diff = targetTime.current - currentTime.current;
        if (Math.abs(diff) > 0.0001) {
          currentTime.current += diff * 0.12; // Adjusted for cinematic smoothness
          video.currentTime = currentTime.current;
        }
      }
      rafId.current = requestAnimationFrame(render);
    };
    rafId.current = requestAnimationFrame(render);

    // 2. Timeline Orchestration
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (video.duration) {
            targetTime.current = self.progress * (video.duration - 0.1); 
          }
        }
      }
    });

    // Content Reveal (Wedding Invitation Aesthetic)
    tl.to(overlayRef.current, {
      backgroundColor: "rgba(45, 9, 9, 0.7)", // Deep Maroon overlay
      duration: 1
    }, 0)
    .fromTo(headlineRef.current, 
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }, 
      0.5
    )
    .to(mandalaRef.current, {
      rotate: 90,
      scale: 1.2,
      opacity: 0.2,
      duration: 1.5
    }, 0);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", updateVideoSrc);
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-imperial-maroon overflow-visible">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* The Cinematic Scrub Video */}
        <video
          ref={videoRef}
          src={videoSrc || "/web-hero-scrub.mp4"}
          muted
          playsInline
          loop
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover will-change-transform scale-105"
        />

        {/* Invitation Overlay */}
        <div ref={overlayRef} className="absolute inset-0 z-10 bg-gradient-to-t from-imperial-maroon via-transparent to-imperial-maroon/40" />

        {/* Decorative Elements */}
        <div ref={mandalaRef} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.1] overflow-hidden">
           <Mandala className="w-[150vw] md:w-[120vw] h-auto text-antique-gold shrink-0" />
        </div>

        {/* Invitation Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="body-serif text-xs text-saffron uppercase mb-6 block"
          >
            You are Cordially Invited
          </motion.div>
          
          <div ref={headlineRef} className="space-y-4">
            <h1 className="heading-invite text-[clamp(3rem,18vw,14rem)] leading-[0.8] md:leading-[0.6] text-off-white drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              Heritage
            </h1>
            <p className="heading-serif text-[clamp(1.1rem,4vw,2.5rem)] text-antique-gold italic tracking-wider px-4">
              Digitized for the Modern Era
            </p>
          </div>
          
          <div className="mt-20 flex flex-col items-center gap-8">
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="btn-gold group overflow-hidden"
             >
               <span className="relative z-10">Request Your Design</span>
               <div className="absolute inset-0 bg-antique-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             </motion.button>
             
             <div className="flex flex-col items-center gap-2">
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-antique-gold to-transparent opacity-50" />
                <p className="body-serif text-[10px] text-muted-gold/60 uppercase tracking-[0.4em]">Scroll to Open</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
