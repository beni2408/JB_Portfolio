"use client";

import dynamic from "next/dynamic";
import { use3DCapability } from "@/lib/use3DCapability";
import { HeroFallback } from "./fallback";

const HeroScene = dynamic(() => import("./HeroScene").then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export function HeroCanvasGate() {
  const canRender3D = use3DCapability();

  if (!canRender3D) {
    return <HeroFallback />;
  }

  return <HeroScene />;
}
