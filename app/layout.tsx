import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WhatsApp Wedding Invites | Tradition, Digitized.",
  description:
    "Expert-crafted digital wedding invitations for WhatsApp. Image, Video & PDF invites delivered in under 24 hours, starting at ₹500. Premium, personalized, and elegantly modern.",
  keywords: [
    "wedding invites",
    "digital wedding invitation",
    "whatsapp wedding card",
    "Indian wedding invite",
    "video wedding invitation",
    "e-invite",
  ],
  openGraph: {
    title: "WhatsApp Wedding Invites | Tradition, Digitized.",
    description: "Premium digital wedding invitations delivered in under 24 hours.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
