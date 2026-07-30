"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion as useFramerReducedMotion,
} from "framer-motion";

type ParallaxBackdropProps = {
  /** Mirrors the orb cluster to the opposite edge, so consecutive sections
   * alternate instead of stacking depth on one side. */
  align?: "left" | "right";
};

/** Two blurred jewel-tone orbs drifting at different rates behind a section.
 * Pure CSS gradients — no WebGL context, so this is safe to repeat on every
 * section (unlike ScrollShard, which is desktop-gated).
 *
 * The host section must be `relative isolate`: the orbs sit at a negative
 * z-index so section content paints over them, and without the isolation they
 * would drop clean through to behind the page background. */
export function ParallaxBackdrop({ align = "right" }: ParallaxBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useFramerReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Different distances per layer are what read as depth; a single rate just
  // looks like the whole background sliding. Collapsing the range to 0 (rather
  // than dropping the style prop) is what actually pins these at rest under
  // reduced motion — an undefined style leaves framer's last transform applied.
  const near = prefersReducedMotion ? 0 : 70;
  const far = prefersReducedMotion ? 0 : 28;
  const yNear = useTransform(scrollYProgress, [0, 1], [-near, near]);
  const yFar = useTransform(scrollYProgress, [0, 1], [-far, far]);

  const edge = align === "right" ? "right-[-6rem]" : "left-[-6rem]";
  const edgeAlt = align === "right" ? "left-[-8rem]" : "right-[-8rem]";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        style={{ y: yNear }}
        className={`absolute ${edge} top-[12%] h-104 w-104 rounded-full bg-[radial-gradient(circle,var(--plum)_0%,transparent_68%)] opacity-[0.07] blur-3xl`}
      />
      <motion.div
        style={{ y: yFar }}
        className={`absolute ${edgeAlt} bottom-[8%] h-80 w-80 rounded-full bg-[radial-gradient(circle,var(--royal)_0%,transparent_70%)] opacity-[0.06] blur-3xl`}
      />
    </div>
  );
}
