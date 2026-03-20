"use client";

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, RoundedBox, Environment, ContactShadows, useScroll, useTexture } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

const IPhoneModel = ({ textureUrl }: { textureUrl: string }) => {
  const meshRef = useRef<THREE.Group>(null!);
  const texture = useTexture(textureUrl);
  
  // Pivot Logic (360 degrees on scroll)
  useFrame((state) => {
    if (meshRef.current) {
      // In a real R3F app with ScrollControls, we use useScroll()
      // Here we rely on the component's parent passing a scroll-synced rotation or use state
      // For V4 mandate: "pivots 360 degrees as the user scrolls"
      const scrollY = window.scrollY;
      const rotation = (scrollY / 2000) * Math.PI * 2;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotation, 0.05);
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <RoundedBox args={[3.5, 7, 0.4]} radius={0.5} smoothness={4}>
          <meshPhysicalMaterial 
            color="#080808" 
            roughness={0.02} 
            metalness={1} 
            reflectivity={1}
            clearcoat={1.0}
            clearcoatRoughness={0}
            transmission={0} // Phone body isn't transmissive
          />
        </RoundedBox>

        {/* The Screen (The Invite) */}
        <mesh position={[0, 0, 0.21]}>
          <planeGeometry args={[3.2, 6.7]} />
          <meshPhysicalMaterial 
              map={texture} 
              transmission={0.5} 
              thickness={1.5} 
              roughness={0.01} 
              ior={1.5}
              clearcoat={1.0}
          />
        </mesh>
        
        {/* Dynamic Notch */}
        <mesh position={[0, 3.1, 0.22]}>
           <capsuleGeometry args={[0.2, 0.5, 4, 8]} />
           <meshBasicMaterial color="#000" />
        </mesh>
      </Float>
    </group>
  );
};

export default function PhonePreview({ textureUrl = "/preview-invite.jpg" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  if (!mounted) return (
    <div className="h-[800px] w-full bg-midnight flex items-center justify-center">
       <div className="body-technical text-[10px] text-muted-gold/20 animate-pulse uppercase tracking-[1em]">Concierge Syncing...</div>
    </div>
  );

  return (
    <div className="relative h-[1000px] w-full flex items-center justify-center bg-midnight overflow-visible">
       {/* Background Narrative Label */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
          <h2 className="heading-kinetic text-[20rem] text-muted-gold">PREVIEW</h2>
       </div>

      <div className="w-full h-full">
        <Canvas shadows gl={{ antialias: true }} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
          
          <Environment preset="night" />
          
          <Suspense fallback={null}>
             <IPhoneModel textureUrl={textureUrl} />
          </Suspense>

          <ContactShadows 
            position={[0, -4.5, 0]} 
            opacity={0.6} 
            scale={20} 
            blur={3} 
            far={4} 
            color="#C5A059"
          />
          
          <ambientLight intensity={0.1} />
          <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
        </Canvas>
      </div>

      {/* Floating Description Labels (V4 Mandate) */}
      <div className="absolute right-[10%] top-1/3 max-w-[200px] space-y-12">
         <div className="bento-card-v4 glass-2-0 p-6 flex flex-col gap-2">
            <span className="body-technical text-[8px] text-muted-gold">Device: IPHONE 15 PRO</span>
            <p className="body-technical text-[10px] text-off-white/40 leading-relaxed uppercase">
               High-refraction display with Clearcoat finish.
            </p>
         </div>
      </div>
    </div>
  );
}
