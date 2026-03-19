"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "The Curation",
    copy: "Upload your assets through our secure portal. Photos, details, and the 'vibe' of your union.",
  },
  {
    id: "02",
    title: "The Craft",
    copy: "Our designers breathe life into your data, hand-coding every transition and refining every pixel.",
  },
  {
    id: "03",
    title: "The Reveal",
    copy: "Receive your polished invitation. Share it instantly. Watch the RSVPs flow in.",
  },
];

export function Workflow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    
    if (!section || !trigger) return;

    const pin = gsap.fromTo(
      section,
      {
        translateX: 0,
      },
      {
        translateX: "-200vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div ref={triggerRef} className="bg-onyx overflow-hidden">
      <div className="h-screen flex items-center justify-center flex-col px-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-champagne text-xs font-semibold tracking-widest uppercase mb-4"
        >
          The Journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="heading-lg text-center"
        >
          From Idea to Invite
        </motion.h2>
        <p className="text-pearl/30 mt-4 text-sm uppercase tracking-widest animate-pulse">
          Scroll to Explore &rarr;
        </p>
      </div>

      <div ref={sectionRef} className="h-screen flex flex-row relative w-[300vw]">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="h-screen w-screen flex items-center justify-center px-8 lg:px-40 relative"
          >
            <div className="max-w-4xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
              <div className="relative">
                <span className="text-[12rem] lg:text-[20rem] font-serif italic text-pearl/5 leading-none">
                  {step.id}
                </span>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-48 lg:h-48 rounded-full border border-champagne/20 flex items-center justify-center bg-onyx-light/50 backdrop-blur-xl">
                    <div className="w-4 h-4 rounded-full bg-champagne animate-pulse-glow" />
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h3 className="heading-lg text-4xl lg:text-6xl mb-6 text-pearl">
                  {step.title}
                </h3>
                <p className="text-pearl/50 text-xl lg:text-2xl font-light leading-relaxed">
                  {step.copy}
                </p>
              </div>
            </div>

            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute right-[-5vw] top-1/2 -translate-y-1/2 w-[10vw] h-px bg-gradient-to-r from-champagne/20 to-transparent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
