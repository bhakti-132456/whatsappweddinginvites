"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "A bespoke onboarding session to capture the soul of your celebration.",
  },
  {
    num: "02",
    title: "Curation",
    desc: "Our creative leads translate your story into editorial-grade visual assets.",
  },
  {
    num: "03",
    title: "Refinement",
    desc: "Liquid motion and high-fidelity textures are layered for final brilliance.",
  },
  {
    num: "04",
    title: "Delivery",
    desc: "Your digital heirloom is optimized and deployed via WhatsApp in 24 hours.",
  },
];

export function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !scrollRef.current) return;

    const sections = gsap.utils.toArray(".workflow-step");
    
    const scrollTween = gsap.to(scrollRef.current, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollRef.current?.offsetWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      scrollTween.kill();
    };
  }, []);

  return (
    <section ref={containerRef} id="process" className="bg-onyx-light overflow-hidden">
      <div ref={scrollRef} className="flex h-screen items-center">
        {/* Intro Slide */}
        <div className="workflow-step flex-shrink-0 w-screen h-full flex items-center justify-center p-20">
           <div className="max-w-4xl">
              <p className="body-mono text-champagne mb-4">The Methodology</p>
              <h2 className="heading-xl">A Systematic <br /><span className="italic">Descent into Perfection</span></h2>
           </div>
        </div>

        {/* Step Slides */}
        {steps.map((step) => (
          <div key={step.num} className="workflow-step flex-shrink-0 w-screen h-full flex items-center justify-center p-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center max-w-7xl">
              <span className="heading-xl text-[20vw] opacity-10 font-black">{step.num}</span>
              <div>
                <h3 className="heading-lg mb-8">{step.title}</h3>
                <p className="text-pearl/40 text-xl font-light leading-relaxed max-w-md">
                  {step.desc}
                </p>
                <div className="mt-12 w-20 h-1 bg-matte-gold" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
