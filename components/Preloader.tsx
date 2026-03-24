"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Simulate loading progress
    let obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setPercent(Math.floor(obj.val));
        const offset = 283 - (obj.val / 100) * 283;
        if (circleRef.current) circleRef.current.style.strokeDashoffset = offset.toString();
      },
      onComplete: () => {
        // Curtain Reveal Animation
        tl.to(".preloader-content", { opacity: 0, duration: 0.5 })
          .to(preloaderRef.current, {
            clipPath: "circle(0% at 50% 50%)",
            duration: 1.5,
            ease: "expo.inOut",
            onComplete: () => {
                if (preloaderRef.current) preloaderRef.current.style.display = "none";
            }
          });
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[10000] bg-imperial-maroon flex items-center justify-center overflow-hidden"
      style={{ clipPath: "circle(100% at 50% 50%)" }}
    >
      {/* Ambient gold radials */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-antique-gold/[0.03] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-antique-gold/[0.05] blur-[80px] animate-soft-pulse" />
      </div>

      <div className="preloader-content flex flex-col items-center relative z-10">
        {/* Gold leaf circular progress with brand mark */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
             <circle
               cx="72"
               cy="72"
               r="45"
               fill="none"
               stroke="rgba(197, 160, 89, 0.08)"
               strokeWidth="1"
             />
             <circle
               ref={circleRef}
               cx="72"
               cy="72"
               r="45"
               fill="none"
               stroke="url(#goldGradient)"
               strokeWidth="1.5"
               strokeDasharray="283"
               strokeDashoffset="283"
               strokeLinecap="round"
             />
             <defs>
               <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#D4AF37" />
                 <stop offset="50%" stopColor="#F4C430" />
                 <stop offset="100%" stopColor="#C5A059" />
               </linearGradient>
             </defs>
          </svg>
          
          {/* Brand Mark */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="heading-invite text-4xl text-antique-gold animate-shimmer-gold">W</span>
            <span className="body-technical text-[8px] text-muted-gold/50 mt-1 tracking-[0.3em]">{percent}%</span>
          </div>

          {/* Sparkle accents */}
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-antique-gold animate-sparkle"
              style={{
                top: `${50 + 42 * Math.sin((deg * Math.PI) / 180)}%`,
                left: `${50 + 42 * Math.cos((deg * Math.PI) / 180)}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-2">
          <span className="heading-serif text-lg text-off-white/60 italic tracking-wider">Heritage</span>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-antique-gold/40 to-transparent" />
          <p className="body-technical text-[8px] uppercase tracking-[0.5em] text-muted-gold/30">
             Digital Heirloom
          </p>
        </div>
      </div>
    </div>
  );
}
