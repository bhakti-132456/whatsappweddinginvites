"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const IPhoneModel = ({ inviteTextureUrl }: { inviteTextureUrl: string }) => {
  const meshRef = useRef<THREE.Group>(null!);
  
  // Load the user's invitation as a dynamic texture
  const texture = useTexture(inviteTextureUrl);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle 3D rotational parallax tied to mouseX/Y
      const mouseX = (state.mouse.x * Math.PI) / 8;
      const mouseY = (state.mouse.y * Math.PI) / 8;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouseX, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouseY, 0.1);
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* The Phone Body */}
        <RoundedBox args={[3.5, 7, 0.4]} radius={0.5} smoothness={4}>
          <meshPhysicalMaterial 
            color="#1a1a1a" 
            roughness={0.1} 
            metalness={0.8} 
            reflectivity={1}
            clearcoat={1}
          />
        </RoundedBox>

        {/* The Screen (The Invite) */}
        <mesh position={[0, 0, 0.21]}>
          <planeGeometry args={[3.2, 6.7]} />
          <meshBasicMaterial map={texture} />
        </mesh>
        
        {/* Glossy Screen Overlay for Realism */}
        <mesh position={[0, 0, 0.22]}>
          <planeGeometry args={[3.2, 6.7]} />
          <meshPhysicalMaterial 
            transparent 
            opacity={0.1} 
            transmission={0.9} 
            thickness={0.5} 
            roughness={0} 
          />
        </mesh>
      </Float>
    </group>
  );
};

export default function PhonePreview({ textureUrl = "/preview-invite.jpg" }) {
  return (
    <div className="h-[700px] w-full cursor-grab active:cursor-grabbing">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        
        <IPhoneModel inviteTextureUrl={textureUrl} />
      </Canvas>
    </div>
  );
}
