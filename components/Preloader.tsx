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
      className="fixed inset-0 z-[10000] bg-midnight flex items-center justify-center overflow-hidden"
      style={{ clipPath: "circle(100% at 50% 50%)" }}
    >
      <div className="preloader-content flex flex-col items-center">
        {/* Gold leaf circular progress */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
             <circle
               cx="64"
               cy="64"
               r="45"
               fill="none"
               stroke="rgba(197, 160, 89, 0.1)"
               strokeWidth="2"
             />
             <circle
               ref={circleRef}
               cx="64"
               cy="64"
               r="45"
               fill="none"
               stroke="#C5A059"
               strokeWidth="2"
               strokeDasharray="283"
               strokeDashoffset="283"
               strokeLinecap="round"
               className="transition-all duration-300"
             />
          </svg>
          <span className="absolute body-technical text-[10px] text-muted-gold">{percent}%</span>
        </div>
        <p className="mt-8 body-technical text-[10px] uppercase tracking-[0.5em] text-muted-gold/40">
           Digital Heirloom
        </p>
      </div>
    </div>
  );
}
