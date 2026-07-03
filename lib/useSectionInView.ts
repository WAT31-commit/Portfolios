"use client";

import { useProgress } from "@/lib/progress-context";
import { ChapterId } from "@/lib/types";
import { useEffect, useRef } from "react";

export function useSectionInView(id: ChapterId) {
  const ref = useRef<HTMLElement | null>(null);
  const { reportInView } = useProgress();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reportInView(id);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [id, reportInView]);

  return ref;
}
