"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** True when the device can reasonably handle a WebGL scene: no reduced-motion
 * preference, a viewport at least `minWidth` wide, and enough logical cores. */
export function use3DCapability(minWidth = 768): boolean {
  const reducedMotion = useReducedMotion();
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const isSmallViewport = window.innerWidth < minWidth;
    const isLowEndDevice =
      typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
    setCapable(!isSmallViewport && !isLowEndDevice);
  }, [minWidth]);

  return capable && !reducedMotion;
}
