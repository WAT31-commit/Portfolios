"use client";

import { levels } from "@/data/journey";
import { SUMMARY_VH } from "@/lib/towerLayout";
import { LevelId } from "@/lib/types";
import { motion } from "framer-motion";

/** The closing recap: every level's year badge lined up left-to-right, each
 * one clickable to reopen that chapter's achievements. */
export function SummarySection({ onSelectLevel }: { onSelectLevel: (id: LevelId) => void }) {
  return (
    <section
      style={{ minHeight: `${SUMMARY_VH}vh` }}
      className="relative flex items-center justify-center px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-auto w-full max-w-4xl rounded-3xl border border-purple-200/20 bg-gradient-to-br from-purple-950/55 via-slate-900/45 to-indigo-950/40 p-8 text-center shadow-2xl backdrop-blur-2xl sm:p-10"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
          The tower, floor by floor
        </p>
        <h2 className="mb-8 text-2xl font-bold text-white sm:text-3xl">Every chapter, at a glance</h2>

        <div className="flex flex-wrap items-start justify-center gap-5 sm:gap-8">
          {levels.map((level, i) => (
            <button
              key={level.id}
              type="button"
              onClick={() => onSelectLevel(level.id)}
              className="group flex w-28 flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full p-[3px] shadow-lg transition-shadow group-hover:shadow-amber-300/30"
                style={{ background: "linear-gradient(145deg, #e8d29a, #b9974a)" }}
              >
                <span
                  className="flex h-full w-full flex-col items-center justify-center rounded-full"
                  style={{
                    background: "radial-gradient(circle at 50% 35%, #f8f5ee, #e5ddca)",
                    boxShadow: "inset 0 0 6px rgba(150,120,60,0.25)",
                  }}
                >
                  <span className="text-lg font-bold leading-none text-[#8a6d2a]">{i + 1}</span>
                  <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#a3873f]">
                    {level.year}
                  </span>
                </span>
              </span>
              <span className="mt-3 text-sm font-semibold text-white">{level.name}</span>
              <span className="mt-1 text-[11px] leading-snug text-white/55">{level.title}</span>
            </button>
          ))}
        </div>

        <p className="mt-8 text-xs text-white/50">Tap any badge to revisit that chapter.</p>
      </motion.div>
    </section>
  );
}
