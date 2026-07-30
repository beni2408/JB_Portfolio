"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { use3DCapability } from "@/lib/use3DCapability";

const BackdropScene = dynamic(
  () => import("./BackdropScene").then((mod) => mod.BackdropScene),
  { ssr: false }
);

/** Page-wide 3D parallax layer. Desktop-only, reduced-motion aware, and mounted
 * only once the visitor actually scrolls.
 *
 * The hero already spins up a WebGL context during load; standing a second one
 * up alongside it cost ~350ms of blocking time. Because this layer exists to
 * respond to scrolling, a visitor who has not scrolled has nothing to gain from
 * it — so deferring until the first scroll keeps the load window clear without
 * taking anything away. A long idle fallback covers visitors who land deep via
 * an anchor link and never fire a scroll event. */
export function BackdropCanvas() {
  const canRender3D = use3DCapability(1024);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!canRender3D) return;
    let done = false;
    const arm = () => {
      if (done) return;
      done = true;
      setArmed(true);
    };

    window.addEventListener("scroll", arm, { passive: true, once: true });

    // Safari still lacks requestIdleCallback, so fall back to a timer there.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idleId = hasIdle ? window.requestIdleCallback(arm, { timeout: 6000 }) : undefined;
    const timerId = hasIdle ? undefined : window.setTimeout(arm, 3000);

    return () => {
      window.removeEventListener("scroll", arm);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [canRender3D]);

  if (!canRender3D || !armed) return null;
  return <BackdropScene />;
}
