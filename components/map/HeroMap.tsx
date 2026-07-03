"use client";

import { useProgress } from "@/lib/progress-context";
import { useScrollToChapter } from "@/lib/useScrollToChapter";
import { chapters } from "@/data/journey";
import { motion } from "framer-motion";

export function HeroMap() {
  const { isUnlocked } = useProgress();
  const scrollToChapter = useScrollToChapter();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0e1a12] via-[#142418] to-[#0b1410] px-6 text-center">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_50%_20%,rgba(245,193,104,0.25),transparent_60%)]" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300/80"
      >
        A portfolio, told as a journey
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="max-w-3xl text-4xl font-bold text-white sm:text-6xl"
      >
        There and Back Again
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mt-3 max-w-xl text-lg text-white/70"
      >
        The Journey of William
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-14 flex flex-wrap items-center justify-center gap-3 sm:gap-6"
      >
        {chapters.map((c, i) => {
          const unlocked = isUnlocked(c.id);
          return (
            <div key={c.id} className="flex items-center gap-3 sm:gap-6">
              <button
                type="button"
                disabled={!unlocked}
                onClick={() => scrollToChapter(c.id)}
                title={unlocked ? `${c.name} — ${c.year}` : "Not yet discovered — scroll to reach it"}
                className={`group flex flex-col items-center gap-1 rounded-lg px-2 py-2 transition ${
                  unlocked ? "cursor-pointer hover:bg-white/5" : "cursor-not-allowed opacity-40 grayscale"
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-300/70">
                  {c.year}
                </span>
                <span className="text-sm text-white/80 transition group-hover:text-white">
                  {unlocked ? c.name : "???"}
                </span>
              </button>
              {i < chapters.length - 1 && (
                <span className="hidden h-px w-6 bg-white/20 sm:block" aria-hidden="true" />
              )}
            </div>
          );
        })}
      </motion.div>

      <motion.button
        onClick={() => scrollToChapter("shire")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.6 }, y: { repeat: Infinity, duration: 1.8 } }}
        className="absolute bottom-10 text-2xl text-white/60"
        aria-label="Scroll to begin the journey"
      >
        ↓
      </motion.button>
    </section>
  );
}
