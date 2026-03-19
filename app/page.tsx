import { Navbar } from "@/components/Navbar";
import { FloatingShapes } from "@/components/FloatingShapes";
import { Hero } from "@/components/Hero";
import { TrinityGrid } from "@/components/TrinityGrid";
import { Pricing } from "@/components/Pricing";
import { Workflow } from "@/components/Workflow";
import { UploadPortal } from "@/components/UploadPortal";
import { WhatsAppPreview } from "@/components/WhatsAppPreview";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <FloatingShapes />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TrinityGrid />
        <Pricing />
        <Workflow />
        <UploadPortal />
        <WhatsAppPreview />
      </main>
      <Footer />
    </>
  );
}
