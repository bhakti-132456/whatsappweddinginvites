"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    gsap.set([cursor, ring], { opacity: 0 });

    const onMouseMove = (e: MouseEvent) => {
      // Main Cursor Position (Instant)
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        duration: 0.1,
      });

      // Gold Ring Follower (Lag)
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });

      // Magnetic Logic for V4
      const targets = document.querySelectorAll("[data-cursor='cta'], .btn-gold, .bento-card-v4");
      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const force = 0.2;
          gsap.to(target, {
            x: dx * force,
            y: dy * force,
            duration: 0.4,
          });

          // Ring Expansion
          gsap.to(ring, {
            scale: 3,
            borderColor: "#C5A059",
            backgroundColor: "transparent",
            duration: 0.4,
          });
          setIsHovering(true);
          setHoverText("VIEW");
        } else {
          // Reset
          gsap.to(target, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        }
      });
      
      // Reset ring if not specifically hovering
      const activeHover = Array.from(targets).some(t => {
         const r = t.getBoundingClientRect();
         return e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
      });
      
      if (!activeHover) {
          gsap.to(ring, {
            scale: 1,
            borderColor: "#C5A059",
            backgroundColor: "transparent",
            duration: 0.4,
          });
          setIsHovering(false);
          setHoverText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      {/* Central Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1 h-1 bg-muted-gold rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2"
      />
      {/* Gold Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-muted-gold/50 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform"
      >
        {isHovering && (
           <span className="body-technical text-[6px] text-muted-gold font-bold tracking-widest">{hoverText}</span>
        )}
      </div>
    </>
  );
}
