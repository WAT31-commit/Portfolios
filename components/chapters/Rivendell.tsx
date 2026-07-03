"use client";

import { ChapterShell } from "@/components/chapters/ChapterShell";
import { QuestModal } from "@/components/quest/QuestModal";
import { getChapterMeta, quests } from "@/data/journey";
import { Quest } from "@/lib/types";
import { motion } from "framer-motion";
import { useState } from "react";

const SPINE_COLORS = ["#7c9cd1", "#b98fd1", "#d1a86f", "#6fbf9e", "#c97b7b"];
const meta = getChapterMeta("rivendell");

export function Rivendell() {
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  const books = quests.filter((q) => q.chapter === "rivendell");

  return (
    <ChapterShell
      id="rivendell"
      eyebrow={`${meta.year} · ${meta.name}`}
      title={meta.title}
      gradient={meta.gradient}
      emberColor={meta.emberColor}
    >
      <p className="mx-auto mb-12 max-w-xl text-center text-white/70">
        In the library of the Last Homely House, every project earned a spine of its own.
        Pull one from the shelf to read its quest log.
      </p>

      <div className="flex flex-wrap items-end justify-center gap-3 sm:gap-4">
        {books.map((quest, i) => (
          <motion.button
            key={quest.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -14, rotate: -1 }}
            onClick={() => setActiveQuest(quest)}
            className="group flex h-64 w-14 flex-col items-center justify-between rounded-sm border border-white/10 px-1.5 py-4 text-center shadow-lg sm:h-72 sm:w-16"
            style={{ backgroundColor: SPINE_COLORS[i % SPINE_COLORS.length] }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/80">
              {quest.year}
            </span>
            <span
              className="flex-1 text-xs font-bold text-white/95"
              style={{ writingMode: "vertical-rl" }}
            >
              {quest.title}
            </span>
            <span className="text-lg opacity-80 transition group-hover:opacity-100">📖</span>
          </motion.button>
        ))}
      </div>

      <QuestModal quest={activeQuest} onClose={() => setActiveQuest(null)} accent="#a8c8f0" />
    </ChapterShell>
  );
}
