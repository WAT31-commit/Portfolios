"use client";

import {
  CHAPTER_ORDER,
  CHAPTER_START_FRACTIONS,
  TOTAL_PANELS,
  useProgress,
} from "@/lib/progress-context";
import { useScrollToChapter } from "@/lib/useScrollToChapter";
import { useJourneyProgress } from "@/lib/useJourneyProgress";
import { chapters } from "@/data/journey";
import { GandalfToken } from "@/components/gandalf/GandalfToken";
import { motion, useTransform } from "framer-motion";

export function WorldMap() {
  const { activeChapter, isUnlocked } = useProgress();
  const scrollToChapter = useScrollToChapter();

  // Raw progress spans the whole track (Hero + all chapter panels, with the
  // Shire counting as 5 — its bio intro plus 4 milestone scenes). Remap it
  // so Gandalf sits at the very start of the road while still in the Hero
  // panel, then treks smoothly along it, panel by panel, as you swipe right.
  const rawProgress = useJourneyProgress();
  const heroFraction = 1 / TOTAL_PANELS;
  const chapterProgress = useTransform(rawProgress, [heroFraction, 1], [0, 1], {
    clamp: true,
  });
  const gandalfLeft = useTransform(chapterProgress, (p) => `${p * 100}%`);

  return (
    <nav
      aria-label="Journey map — Gandalf's road"
      className="fixed bottom-0 left-0 right-0 z-40 bg-black/60 px-4 pb-3 pt-2 backdrop-blur-md sm:px-12"
    >
      <div className="relative mx-auto max-w-3xl pt-8">
        {/* The road: dirt path banked by grass verges, English-village style */}
        <div
          className="absolute inset-x-0 top-1/2 h-6 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#8a6a45] via-[#6b4a2f] to-[#5a3d26] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]"
          aria-hidden="true"
        >
          <div className="absolute inset-x-0 -top-1.5 h-1.5 rounded-full bg-gradient-to-b from-emerald-800/80 to-transparent" />
          <div className="absolute inset-x-0 -bottom-1.5 h-1.5 rounded-full bg-gradient-to-t from-emerald-900/80 to-transparent" />
          <div
            className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.35)_0px,rgba(255,255,255,0.35)_8px,transparent_8px,transparent_18px)]"
            aria-hidden="true"
          />
        </div>

        <motion.div
          className="pointer-events-none absolute top-1/2 z-10 h-14 w-14 -translate-x-1/2 -translate-y-[68%]"
          style={{ left: gandalfLeft }}
        >
          <GandalfToken className="h-14 w-14" walking />
        </motion.div>

        <ul className="relative h-9">
          {CHAPTER_ORDER.map((id) => {
            const meta = chapters.find((c) => c.id === id)!;
            const unlocked = isUnlocked(id);
            const active = activeChapter === id;

            return (
              <li
                key={id}
                className="absolute top-0 -translate-x-1/2"
                style={{ left: `${CHAPTER_START_FRACTIONS[id] * 100}%` }}
              >
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
