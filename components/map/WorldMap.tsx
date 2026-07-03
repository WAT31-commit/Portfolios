"use client";

import { CHAPTER_ORDER, useProgress } from "@/lib/progress-context";
import { useScrollToChapter } from "@/lib/useScrollToChapter";
import { chapters } from "@/data/journey";
import { motion } from "framer-motion";

export function WorldMap() {
  const { activeChapter, isUnlocked } = useProgress();
  const scrollToChapter = useScrollToChapter();

  return (
    <nav
      aria-label="Journey map"
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-center border-t border-white/10 bg-black/60 px-2 py-2 backdrop-blur-md sm:bottom-auto sm:right-0 sm:left-auto sm:top-1/2 sm:w-16 sm:-translate-y-1/2 sm:flex-col sm:border-l sm:border-t-0 sm:py-4"
    >
      <ul className="flex w-full max-w-md items-center justify-between gap-1 sm:max-w-none sm:flex-col sm:gap-3">
        {CHAPTER_ORDER.map((id) => {
          const meta = chapters.find((c) => c.id === id)!;
          const unlocked = isUnlocked(id);
          const active = activeChapter === id;

          return (
            <li key={id} className="flex-1 sm:flex-none">
              <button
                type="button"
                disabled={!unlocked}
                onClick={() => scrollToChapter(id)}
                title={unlocked ? `${meta.name} — ${meta.year}` : "Not yet discovered"}
                className={`group relative flex w-full flex-col items-center gap-0.5 rounded-lg px-1.5 py-1.5 text-lg transition sm:w-12 ${
                  unlocked
                    ? "cursor-pointer opacity-100 hover:bg-white/10"
                    : "cursor-not-allowed opacity-30 grayscale"
                }`}
              >
                <motion.span
                  animate={active ? { scale: 1.25 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {unlocked ? meta.icon : "❔"}
                </motion.span>
                {active && (
                  <motion.span
                    layoutId="map-active-dot"
                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-amber-400 sm:-right-0.5 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
                  />
                )}
                <span className="hidden text-[9px] uppercase tracking-wide text-white/50 sm:block">
                  {unlocked ? meta.year : ""}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
