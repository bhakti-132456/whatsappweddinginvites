"use client";

import { useEffect, useRef } from "react";

interface Shape {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
  type: "sphere" | "ring" | "diamond";
}

export function FloatingShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const shapesRef = useRef<Shape[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    // Initialize shapes
    const shapeCount = Math.min(12, Math.floor(window.innerWidth / 120));
    const types: Shape["type"][] = ["sphere", "ring", "diamond"];
    shapesRef.current = Array.from({ length: shapeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 20 + Math.random() * 40,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: 0.03 + Math.random() * 0.06,
      hue: 35 + Math.random() * 15, // gold range
      type: types[Math.floor(Math.random() * types.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      shapesRef.current.forEach((shape) => {
        // Mouse repulsion
        const dx = mouse.x - shape.x;
        const dy = mouse.y - shape.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          shape.x -= (dx / dist) * force * 0.5;
          shape.y -= (dy / dist) * force * 0.5;
        }

        // Move
        shape.x += shape.speedX;
        shape.y += shape.speedY;

        // Wrap
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size;

        // Draw
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.globalAlpha = shape.opacity;

        const color = `hsl(${shape.hue}, 50%, 60%)`;

        if (shape.type === "sphere") {
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size);
          gradient.addColorStop(0, color);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (shape.type === "ring") {
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, shape.size * 0.6, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -shape.size);
          ctx.lineTo(shape.size * 0.7, 0);
          ctx.lineTo(0, shape.size);
          ctx.lineTo(-shape.size * 0.7, 0);
          ctx.closePath();
          ctx.stroke();
        }

        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
