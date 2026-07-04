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
        className="pointer-events-auto relative w-full max-w-4xl overflow-hidden rounded-3xl border border-amber-200/15 bg-black p-8 text-center shadow-2xl sm:p-12"
      >
        {/* Soft corner glows for depth, kept subtle so the field reads as black */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-purple-400/10 blur-3xl" />

        <p className="relative mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/80">
          The tower, floor by floor
        </p>
        <h2 className="relative text-2xl font-bold text-white sm:text-3xl">Every chapter, at a glance</h2>
        <div className="relative mx-auto mt-5 mb-10 h-px w-24 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />

        <div className="relative flex flex-wrap items-start justify-center gap-5 sm:gap-8">
          {levels.map((level, i) => (
            <button
              key={level.id}
              type="button"
              onClick={() => onSelectLevel(level.id)}
              className="group flex w-28 flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full p-[3px] shadow-lg transition-shadow group-hover:shadow-amber-300/40"
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

        <p className="relative mt-10 text-xs text-white/40">Tap any badge to revisit that chapter.</p>
      </motion.div>
    </section>
  );
}
