"use client";

import { ChapterShell } from "@/components/chapters/ChapterShell";
import { QuestModal } from "@/components/quest/QuestModal";
import { getChapterMeta, quests } from "@/data/journey";
import { Quest } from "@/lib/types";
import { motion } from "framer-motion";
import { useState } from "react";

const meta = getChapterMeta("mines-mountains");

export function MinesMountains() {
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  const peaks = quests.filter((q) => q.chapter === "mines-mountains");

  return (
    <ChapterShell
      id="mines-mountains"
      eyebrow={`${meta.year} · ${meta.name}`}
      title={meta.title}
      gradient={meta.gradient}
      emberColor={meta.emberColor}
    >
      <p className="mx-auto mb-14 max-w-xl text-center text-white/70">
        Steeper terrain, heavier packs. Each peak below marks a project that demanded more than
        the last.
      </p>

      <div className="relative grid gap-8 sm:grid-cols-2">
        {peaks.map((quest, i) => (
          <motion.button
            key={quest.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            onClick={() => setActiveQuest(quest)}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm transition hover:border-slate-300/40"
          >
            <div
              className="pointer-events-none absolute -right-6 -top-6 text-8xl opacity-10 transition group-hover:opacity-20"
              aria-hidden="true"
            >
              ⛰️
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-300/80">
              Peak · {quest.year}
            </p>
            <h3 className="mb-2 text-xl font-bold text-white">{quest.title}</h3>
            <p className="mb-4 text-sm text-white/70">{quest.tagline}</p>
            <div className="flex flex-wrap gap-2">
              {quest.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-slate-300/70">
              View summit log →
            </p>
          </motion.button>
        ))}
      </div>

      <QuestModal quest={activeQuest} onClose={() => setActiveQuest(null)} accent="#c9d6e8" />
    </ChapterShell>
  );
}
