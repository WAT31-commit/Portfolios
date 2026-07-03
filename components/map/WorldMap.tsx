"use client";

import { CHAPTER_ORDER, TOTAL_PANELS, useProgress } from "@/lib/progress-context";
import { useScrollToChapter } from "@/lib/useScrollToChapter";
import { useJourneyProgress } from "@/lib/useJourneyProgress";
import { chapters } from "@/data/journey";
import { GandalfToken } from "@/components/gandalf/GandalfToken";
import { motion, useTransform } from "framer-motion";

export function WorldMap() {
  const { activeChapter, isUnlocked } = useProgress();
  const scrollToChapter = useScrollToChapter();

  // Raw progress spans the whole track (Hero + 6 chapters). Remap it so
  // Gandalf's token sits at the very start of the path while you're still
  // in the Hero panel, then walks smoothly waypoint-to-waypoint as you
  // scroll through the six chapters.
  const rawProgress = useJourneyProgress();
  const heroFraction = 1 / TOTAL_PANELS;
  const chapterProgress = useTransform(rawProgress, [heroFraction, 1], [0, 1], {
    clamp: true,
  });
  const gandalfLeft = useTransform(chapterProgress, (p) => `${p * 100}%`);

  return (
    <nav
      aria-label="Journey map — Gandalf's path"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md sm:px-10"
    >
      <div className="relative mx-auto max-w-3xl pt-6">
        <div
          className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-white/5 via-white/25 to-white/5"
          aria-hidden="true"
        />

        <motion.div
          className="pointer-events-none absolute top-1/2 z-10 h-9 w-9 -translate-x-1/2 -translate-y-[62%]"
          style={{ left: gandalfLeft }}
        >
          <GandalfToken className="h-9 w-9" />
        </motion.div>

        <ul className="relative flex items-center justify-between">
          {CHAPTER_ORDER.map((id) => {
            const meta = chapters.find((c) => c.id === id)!;
            const unlocked = isUnlocked(id);
            const active = activeChapter === id;

            return (
              <li key={id}>
                <button
                  type="button"
                  disabled={!unlocked}
                  onClick={() => scrollToChapter(id)}
                  title={unlocked ? `${meta.name} — ${meta.year}` : "Not yet discovered"}
                  className={`group relative flex flex-col items-center gap-0.5 rounded-lg bg-black/70 px-2 py-1.5 text-lg transition ${
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
                  <span className="hidden text-[9px] uppercase tracking-wide text-white/50 sm:block">
                    {unlocked ? meta.year : ""}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
