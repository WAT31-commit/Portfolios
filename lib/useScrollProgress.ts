"use client";

import { useMotionValue, MotionValue } from "framer-motion";
import { useLenis } from "lenis/react";

/**
 * Raw vertical scroll progress across the entire page, 0 to 1. Exposed as a
 * Framer Motion value so both HTML transforms and the fixed 3D canvas (via
 * `.get()` inside useFrame) can read it without forcing a React re-render
 * on every scroll frame.
 */
export function useScrollProgress(): MotionValue<number> {
  const progress = useMotionValue(0);

  useLenis((lenis) => {
    progress.set(lenis.progress);
  });

  return progress;
}
