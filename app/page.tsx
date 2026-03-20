"use client";

import { Navbar } from "@/components/Navbar";
import { HeroScrub } from "@/components/HeroScrub";
import { TrinityGrid } from "@/components/TrinityGrid";
import { Pricing } from "@/components/Pricing";
import { Workflow } from "@/components/Workflow";
import { Footer } from "@/components/Footer";
import { BespokeOnboarding } from "@/components/BespokeOnboarding";
import PhonePreview from "@/components/PhonePreview";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 bg-midnight">
        <HeroScrub />
        <TrinityGrid />
        <Workflow />
        <Pricing />
        <BespokeOnboarding />
        <section id="preview" className="bg-onyx flex flex-col items-center py-40">
            <p className="body-mono text-champagne mb-8">The Hardware</p>
            <h2 className="heading-lg text-center mb-16">The Signature <br /><span className="italic">Perspective</span></h2>
            <PhonePreview />
        </section>
      </main>
      <div className="fixed bottom-0 left-0 w-full h-[80vh] z-0">
        <Footer />
      </div>
    </>
  );
}
