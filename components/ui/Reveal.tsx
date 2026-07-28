"use client";

import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const prefersReducedMotion = useFramerReducedMotion();

  if (prefersReducedMotion) {
    if (as === "li") return <li className={className}>{children}</li>;
    return <div className={className}>{children}</div>;
  }

  const transition = { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const };
  const variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

  if (as === "li") {
    return (
      <motion.li
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={variants}
        transition={transition}
      >
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
