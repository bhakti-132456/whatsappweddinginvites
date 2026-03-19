"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Float, useTexture, Center } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

function UnfoldingInvite({ scrollProgress }: { scrollProgress: { value: number } }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture("/preview-invite.jpg"); // Fallback or placeholder

  // Simple unfolding logic via vertex displacement or rotation of planes
  // For V2, we'll use a shader or a multi-part mesh. 
  // Let's start with a double-sided plane that "unfolds" on the Y axis.

  useFrame(() => {
    if (meshRef.current) {
      // Mapping scroll 0-1 to rotation 0 to PI
      const targetRotation = (1 - scrollProgress.value) * Math.PI;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation,
        0.1
      );
    }
  });

  return (
    <group rotation={[Math.PI / 4, 0, 0]}>
      {/* Bottom Leaf */}
      <mesh position={[0, -1.5, 0]}>
        <planeGeometry args={[4, 3]} />
        <meshPhysicalMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Top Leaf (Unfolding) */}
      <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
         <group position={[0, 1.5, 0]}>
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[4, 3]} />
                <meshPhysicalMaterial map={texture} side={THREE.DoubleSide} />
            </mesh>
         </group>
      </mesh>
    </group>
  );
}

export function Hero() {
  const scrollProgress = useRef({ value: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.to(scrollProgress.current, {
      value: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom center",
        scrub: true,
      },
    });

    // Typography animations
    gsap.from(".hero-title span", {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: "power4.out",
      delay: 0.5,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-onyx">
      {/* Static background text for depth */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
        <h2 className="heading-xl text-pearl whitespace-nowrap">HERITAGE • HERITAGE • HERITAGE</h2>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* WebGL Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <UnfoldingInvite scrollProgress={scrollProgress.current} />
          </Canvas>
        </div>

        {/* Cinematic Typography */}
        <div className="relative z-10 text-center px-8 pointer-events-none">
          <p className="body-mono text-champagne mb-8 hero-title overflow-hidden">
            <span>A</span> <span>Digital</span> <span>Heirloom</span>
          </p>
          <h1 className="heading-xl text-pearl hero-title flex flex-col items-center">
            <span className="block">Love,</span>
            <span className="block italic">Encapsulated.</span>
          </h1>
          <div className="mt-12 hero-title overflow-hidden">
             <span className="body-mono text-pearl/40">The traditional invitation, reimagined for the digital age.</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-px h-20 bg-gradient-to-b from-pearl/20 to-transparent" />
          <p className="body-mono text-[8px] text-pearl/20 tracking-[0.4em]">Scroll to Unveil</p>
        </motion.div>
      </div>
    </section>
  );
}

// Helper component for motion
import { motion } from "framer-motion";
