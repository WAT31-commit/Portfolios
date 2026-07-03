"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";

export function useScrollToChapter() {
  const lenis = useLenis();

  return useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) lenis.scrollTo(el);
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [lenis]
  );
}
