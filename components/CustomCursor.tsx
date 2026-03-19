"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });
  const [variant, setVariant] = useState<"default" | "premium" | "cta">("default");
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Hide on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Listen for premium element hover
    const onHoverPremium = () => setVariant("premium");
    const onHoverCta = () => setVariant("cta");
    const onHoverDefault = () => setVariant("default");

    const observer = new MutationObserver(() => {
      document.querySelectorAll("[data-cursor='premium']").forEach((el) => {
        el.addEventListener("mouseenter", onHoverPremium);
        el.addEventListener("mouseleave", onHoverDefault);
      });
      document.querySelectorAll("[data-cursor='cta']").forEach((el) => {
        el.addEventListener("mouseenter", onHoverCta);
        el.addEventListener("mouseleave", onHoverDefault);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial scan
    document.querySelectorAll("[data-cursor='premium']").forEach((el) => {
      el.addEventListener("mouseenter", onHoverPremium);
      el.addEventListener("mouseleave", onHoverDefault);
    });
    document.querySelectorAll("[data-cursor='cta']").forEach((el) => {
      el.addEventListener("mouseenter", onHoverCta);
      el.addEventListener("mouseleave", onHoverDefault);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  const sizes = {
    default: 12,
    premium: 40,
    cta: 56,
  };

  const size = sizes[variant];

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: size,
        height: size,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background:
            variant === "cta"
              ? "radial-gradient(circle, var(--gold) 0%, transparent 70%)"
              : variant === "premium"
              ? "rgba(201, 169, 110, 0.4)"
              : "var(--offwhite)",
          border: variant !== "default" ? "1px solid var(--gold)" : "none",
        }}
      />
      {variant === "cta" && (
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold tracking-wider text-charcoal">
          CLICK
        </span>
      )}
    </motion.div>
  );
}
