"use client";

import { useMotionValue, MotionValue } from "framer-motion";
import { useLenis } from "lenis/react";

/**
 * Raw horizontal scroll progress across the *entire* track (Hero + all
 * chapters), 0 to 1. Exposed as a Framer Motion value so consumers can
 * derive transforms from it without triggering a React re-render on every
 * scroll frame.
 */
export function useJourneyProgress(): MotionValue<number> {
  const progress = useMotionValue(0);

  useLenis((lenis) => {
    progress.set(lenis.progress);
  });

  return progress;
}
