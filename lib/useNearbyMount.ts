"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mirrors the lazy-mount pattern ChapterShell uses for its ember canvas:
 * only true once the element is within `rootMargin` of the viewport, so
 * off-screen 3D canvases don't all run their own rAF loop simultaneously.
 */
export function useNearbyMount<T extends HTMLElement>(rootMargin = "0px 50%") {
  const ref = useRef<T | null>(null);
  const [nearby, setNearby] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearby(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, nearby };
}
