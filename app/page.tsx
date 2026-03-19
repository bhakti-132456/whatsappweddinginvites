"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrinityGrid } from "@/components/TrinityGrid";
import { Pricing } from "@/components/Pricing";
import { Workflow } from "@/components/Workflow";
import { BespokeOnboarding } from "@/components/BespokeOnboarding";
import PhonePreview from "@/components/PhonePreview";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 bg-onyx">
        <Hero />
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
      <Footer />
    </>
  );
}
