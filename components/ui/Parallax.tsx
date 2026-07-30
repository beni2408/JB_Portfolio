"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion as useFramerReducedMotion,
} from "framer-motion";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Total vertical travel in px across the element's full scroll pass.
   * Positive = element lags behind the scroll (recedes), negative = leads. */
  distance?: number;
};

/** Scroll-linked vertical drift. Transform-only so it stays on the compositor,
 * and inert under `prefers-reduced-motion` (the ref still attaches — framer's
 * useScroll warns loudly if its target renders conditionally). */
export function Parallax({ children, className = "", distance = 40 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useFramerReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Collapsing the travel to 0 pins this at rest under reduced motion; dropping
  // the style prop instead leaves framer's last computed transform applied.
  const travel = prefersReducedMotion ? 0 : distance;
  const y = useTransform(scrollYProgress, [0, 1], [travel / -2, travel / 2]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
