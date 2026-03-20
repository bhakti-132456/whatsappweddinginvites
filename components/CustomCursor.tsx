"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Optimized Coordinate Tracker
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // 2. High-Performance Render Loop
    let rafId: number;
    const render = () => {
      if (dotRef.current && ringRef.current) {
        // Instant Dot
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;

        // Smooth LERP Ring
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    // 3. Optimized Hover Detection (Event Delegation)
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        setIsHovering(true);
        const type = target.getAttribute("data-cursor");
        if (type === "premium") ringRef.current?.classList.add("scale-150", "border-antique-gold");
        if (type === "cta") ringRef.current?.classList.add("scale-[2.5]", "bg-antique-gold/10");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
       const target = (e.target as HTMLElement).closest("[data-cursor]");
       if (target) {
         setIsHovering(false);
         ringRef.current?.classList.remove("scale-150", "scale-[2.5]", "border-antique-gold", "bg-antique-gold/10");
       }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-antique-gold rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-antique-gold/30 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-500 ease-out will-change-transform"
      >
        {isHovering && (
           <div className="w-1 h-1 bg-antique-gold rounded-full animate-ping" />
        )}
      </div>
    </>
  );
}
