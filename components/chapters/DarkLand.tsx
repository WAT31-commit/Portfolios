"use client";

import { ChapterShell } from "@/components/chapters/ChapterShell";
import { QuestModal } from "@/components/quest/QuestModal";
import { getChapterMeta, quests } from "@/data/journey";
import { Quest } from "@/lib/types";
import { motion } from "framer-motion";
import { useState } from "react";

const meta = getChapterMeta("dark-land");

export function DarkLand() {
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  const battles = quests.filter((q) => q.chapter === "dark-land");

  return (
    <ChapterShell
      id="dark-land"
      eyebrow={`${meta.year} · ${meta.name}`}
      title={meta.title}
      gradient={meta.gradient}
      emberColor={meta.emberColor}
    >
      <p className="mx-auto mb-8 max-w-xl text-center text-sm text-white/70">
        The stakes get real here. Each card below is a boss battle — a project where failure
        was a live option.
      </p>

      <div className="space-y-4">
        {battles.map((quest, i) => (
          <motion.button
            key={quest.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            onClick={() => setActiveQuest(quest)}
            className="group relative block w-full overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-r from-black/40 to-red-950/30 p-6 text-left backdrop-blur-sm transition hover:border-orange-400/60"
            style={{ boxShadow: "0 0 40px -20px rgba(255,140,66,0.4)" }}
          >
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
              Boss Battle · {quest.year}
            </p>
            <h3 className="mb-2 text-2xl font-bold text-white sm:text-3xl">{quest.title}</h3>
            <p className="mb-3 max-w-2xl text-sm text-white/75">{quest.tagline}</p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-300 transition group-hover:gap-3">
              Enter the battle log →
            </span>
          </motion.button>
        ))}
      </div>

      <QuestModal quest={activeQuest} onClose={() => setActiveQuest(null)} accent="#ff8c42" />
    </ChapterShell>
  );
}
