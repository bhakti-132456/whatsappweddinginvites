"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<"default" | "premium" | "cta">("default");

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Initial Hide
    gsap.set(cursor, { opacity: 0 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });

      // Magnetic Snapping Logic
      const targets = document.querySelectorAll("[data-cursor='cta'], .btn-premium, .btn-premium-outline");
      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          // Snap button toward cursor
          gsap.to(target, {
            x: dx * 0.2, // Snap force (0.2x distance)
            y: dy * 0.2,
            duration: 0.3,
            ease: "power2.out",
          });
          // Expand cursor
          gsap.to(cursor, { scale: 3, duration: 0.3 });
          setCursorType("cta");
        } else {
          // Reset button
          gsap.to(target, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
          });
          // Reset cursor
          if (distance > 200) {
             gsap.to(cursor, { scale: 1, duration: 0.3 });
             setCursorType("default");
          }
        }
      });
    };

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='premium']")) setCursorType("premium");
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[10000] mix-blend-difference flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 bg-pearl ${
          cursorType === "premium" ? "scale-[4]" : cursorType === "cta" ? "scale-[3]" : ""
      }`}
    >
       {cursorType === "premium" && (
          <div className="w-1 h-1 rounded-full bg-onyx animate-ping" />
       )}
    </div>
  );
}
