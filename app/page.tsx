"use client";

import { useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroScrub } from "@/components/HeroScrub";
import { TrinityGrid } from "@/components/TrinityGrid";
import { Pricing } from "@/components/Pricing";
import { Workflow } from "@/components/Workflow";
import { Footer } from "@/components/Footer";
import { BespokeOnboarding } from "@/components/BespokeOnboarding";
import { InvitePreview } from "@/components/InvitePreview";
import PhonePreview from "@/components/PhonePreview";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (mainRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        mainRef.current.style.setProperty("--mouse-x", `${x}%`);
        mainRef.current.style.setProperty("--mouse-y", `${y}%`);
      }
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      <Navbar />
      <main ref={mainRef} className="relative z-10 bg-imperial-maroon mb-[80vh] bg-shimmer">
        <HeroScrub />
        <div className="relative z-20 bg-imperial-maroon shadow-[0_0_100px_rgba(0,0,0,0.5)]">
           <TrinityGrid />
           <Workflow />
           <InvitePreview />
           <Pricing />
           <BespokeOnboarding />
           <section id="preview" className="bg-maroon/20 flex flex-col items-center py-20 md:py-32 border-t border-antique-gold/5">
               <p className="body-serif text-antique-gold mb-8 uppercase tracking-[0.6em] text-xs">The Perspective</p>
               <h2 className="heading-invite text-center mb-8 text-5xl md:text-6xl lg:text-8xl px-4">The Signature <br /><span className="heading-serif italic text-antique-gold">Heirloom</span></h2>
               <PhonePreview />
           </section>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 w-full h-[80vh] z-0">
        <Footer />
      </div>
    </>
  );
}
