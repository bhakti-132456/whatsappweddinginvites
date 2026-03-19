import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrinityGrid } from "@/components/TrinityGrid";
import { Pricing } from "@/components/Pricing";
import { Workflow } from "@/components/Workflow";
import { BespokeOnboarding } from "@/components/BespokeOnboarding";
import { WhatsAppPreview } from "@/components/WhatsAppPreview";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TrinityGrid />
        <Pricing />
        <Workflow />
        <BespokeOnboarding />
        <WhatsAppPreview />
      </main>
      <Footer />
    </>
  );
}
