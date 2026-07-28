"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Centerpiece } from "./Centerpiece";

export function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    }
    function handleScroll() {
      scrollProgress.current = Math.min(window.scrollY / window.innerHeight, 1);
    }
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 40 }}
        frameloop={inView ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[3, 2, 4]} intensity={220} color="#d4af6a" />
        <pointLight position={[-4, -2, -3]} intensity={160} color="#8a6fb0" />
        <pointLight position={[0, 4, 2]} intensity={100} color="#f4f1e9" />
        <Suspense fallback={null}>
          <Centerpiece pointer={pointer} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
