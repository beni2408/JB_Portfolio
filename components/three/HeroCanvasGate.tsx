"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { HeroFallback } from "./fallback";

const HeroScene = dynamic(() => import("./HeroScene").then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export function HeroCanvasGate() {
  const reducedMotion = useReducedMotion();
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    const isSmallViewport = window.innerWidth < 768;
    const isLowEndDevice =
      typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
    setCanRender3D(!isSmallViewport && !isLowEndDevice);
  }, []);

  if (reducedMotion || !canRender3D) {
    return <HeroFallback />;
  }

  return <HeroScene />;
}
