"use client";

import { motion } from "framer-motion";

export function Mandala({ className = "", rotation = 0, scale = 1, opacity = 1 }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={`${className} pointer-events-none`}
      style={{ rotate: rotation, scale, opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" />
      
      {/* 8 Petals */}
      {[...Array(8)].map((_, i) => (
        <g key={i} transform={`rotate(${i * 45} 100 100)`}>
          <path
            d="M100 20C110 40 130 50 100 80C70 50 90 40 100 20Z"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle cx="100" cy="40" r="2" fill="currentColor" />
        </g>
      ))}

      {/* Inner Geometries */}
      <path
        d="M100 40L152 70V130L100 160L48 130V70L100 40Z"
        stroke="currentColor"
        strokeWidth="0.2"
      />
      
      {/* Intricate Hub */}
      <circle cx="100" cy="100" r="15" stroke="currentColor" strokeWidth="0.5" />
      {[...Array(24)].map((_, i) => (
        <line
          key={i}
          x1="100"
          y1="90"
          x2="100"
          y2="85"
          stroke="currentColor"
          strokeWidth="0.2"
          transform={`rotate(${i * 15} 100 100)`}
        />
      ))}
    </motion.svg>
  );
}
