"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion as useFramerReducedMotion,
} from "framer-motion";

/** Wraps the Experience list and draws a champagne line down its spine as you
 * scroll past. A static faint track sits underneath so the full length of the
 * sequence stays legible before the draw reaches it. */
export function TimelineSpine({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const prefersReducedMotion = useFramerReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative mt-16 space-y-16 pl-8 sm:pl-10">
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px">
        <span className="absolute inset-0 bg-royal/20" />
        <motion.span
          className="absolute inset-0 origin-top bg-champagne/70"
          style={prefersReducedMotion ? { scaleY: 1 } : { scaleY }}
        />
      </span>
      {children}
    </ol>
  );
}
