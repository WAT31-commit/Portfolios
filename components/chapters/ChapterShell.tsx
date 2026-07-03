"use client";

import { Embers } from "@/components/three/Embers";
import { useSectionInView } from "@/lib/useSectionInView";
import { ChapterId } from "@/lib/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ChapterShellProps {
  id: ChapterId;
  gradient: string;
  emberColor?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

export function ChapterShell({
  id,
  gradient,
  emberColor,
  eyebrow,
  title,
  children,
}: ChapterShellProps) {
  const ref = useSectionInView(id);

  // Only mount the WebGL ember canvas once this chapter is near the
  // viewport, and unmount it again once scrolled far away — with six
  // chapters each running their own Canvas/rAF loop, keeping all of them
  // alive at once wastes GPU work on sections nobody is looking at.
  const [emberNearby, setEmberNearby] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || !emberColor) return;
    // Panels sit side by side now, so the premount buffer should expand
    // left/right (the axis panels actually travel along), not top/bottom.
    const observer = new IntersectionObserver(
      ([entry]) => setEmberNearby(entry.isIntersecting),
      { rootMargin: "0px 50%" }
    );
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `ref` is a stable ref object
  }, [emberColor]);

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative flex h-screen w-screen flex-shrink-0 items-center justify-center overflow-hidden ${gradient}`}
    >
      {emberColor && emberNearby && <Embers color={emberColor} />}
      {/* Note: deliberately no `overflow-y-auto` / `data-lenis-prevent` here —
          that would swallow wheel input for anyone scrolling with their
          cursor over the (large) content area, breaking the primary
          scroll-to-progress interaction. Each chapter's content is sized to
          fit one screen instead. */}
      <div className="relative z-10 w-full max-w-5xl px-6 py-14 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-5xl">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
