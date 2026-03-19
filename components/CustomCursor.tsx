"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "premium" | "cta">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || "ontouchstart" in window) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    // Initial position
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      setIsVisible(true);
      
      // Check for magnetic elements
      const target = e.target as HTMLElement;
      const magnetic = target.closest(".magnetic-target");
      
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Push the cursor slightly towards the center of the magnetic element
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        
        gsap.to(cursor, {
          x: e.clientX - distX * 0.2,
          y: e.clientY - distY * 0.2,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(follower, {
          x: centerX,
          y: centerY,
          scale: 2.5,
          opacity: 0.2,
          duration: 0.4,
          ease: "power2.out"
        });
        
        setVariant("premium");
      } else {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "none"
        });
        
        gsap.to(follower, {
          x: e.clientX,
          y: e.clientY,
          scale: 1,
          opacity: 0.5,
          duration: 0.6,
          ease: "power3.out"
        });
        
        // Dynamic variants based on cursor data attribute
        const interactable = target.closest("[data-cursor]");
        if (interactable) {
          const type = (interactable as HTMLElement).dataset.cursor as "premium" | "cta";
          setVariant(type);
        } else {
          setVariant("default");
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const getStyle = () => {
    switch (variant) {
      case "cta":
        return {
          background: "var(--champagne)",
          width: "80px",
          height: "80px",
        };
      case "premium":
        return {
          background: "rgba(247, 231, 206, 0.4)",
          width: "40px",
          height: "40px",
          border: "1px solid var(--champagne)",
        };
      default:
        return {
          background: "var(--pearl)",
          width: "8px",
          height: "8px",
        };
    }
  };

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference hidden md:block rounded-full transition-[width,height] duration-300 ease-out"
        style={{
          ...getStyle(),
          opacity: isVisible ? 1 : 0,
        }}
      >
        {variant === "cta" && (
          <div className="flex items-center justify-center w-full h-full text-[10px] font-bold text-onyx tracking-tighter">
            DISCOVER
          </div>
        )}
      </div>
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block w-12 h-12 rounded-full border border-champagne/20"
        style={{
          opacity: isVisible ? 0.3 : 0,
        }}
      />
    </>
  );
}
