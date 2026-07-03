"use client";

import { ChapterShell } from "@/components/chapters/ChapterShell";
import { SkillModal } from "@/components/skill/SkillModal";
import { activities, getChapterMeta, quests, skills } from "@/data/journey";
import { Skill } from "@/lib/types";
import { motion } from "framer-motion";
import { useState } from "react";

const meta = getChapterMeta("old-forest");

export function OldForest() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const forestQuests = quests.filter((q) => q.chapter === "old-forest");

  return (
    <ChapterShell
      id="old-forest"
      eyebrow={`${meta.year} · ${meta.name}`}
      title={meta.title}
      gradient={meta.gradient}
      emberColor={meta.emberColor}
    >
      <div className="mb-6">
        <h3 className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-emerald-300/80">
          Skill Trees — click a leaf
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill, i) => (
            <motion.button
              key={skill.id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.05 }}
              onClick={() => setActiveSkill(skill)}
              className="flex w-24 flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-sm transition hover:border-emerald-300/40 hover:bg-white/10"
            >
              <span className="text-2xl">{skill.icon}</span>
              <span className="text-xs font-medium text-white/85">{skill.name}</span>
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className="h-1 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        idx < skill.level ? "#8bd17c" : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {forestQuests.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-emerald-300/80">
            Early Quests
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {forestQuests.map((q) => (
              <div
                key={q.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <h4 className="mb-1 font-semibold text-white">{q.title}</h4>
                <p className="text-sm text-white/70">{q.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-emerald-300/80">
          Fellowships & Activities
        </h3>
        <div className="space-y-2">
          {activities.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col gap-1 rounded-lg border border-white/10 bg-white/5 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-white">{a.title}</p>
                <p className="text-xs text-white/60">{a.role}</p>
              </div>
              <div className="text-xs text-white/50 sm:text-right">
                <p>{a.period}</p>
                <p className="max-w-xs text-white/70">{a.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SkillModal skill={activeSkill} onClose={() => setActiveSkill(null)} accent="#8bd17c" />
    </ChapterShell>
  );
}
