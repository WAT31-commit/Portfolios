"use client";

import { QuestModal } from "@/components/quest/QuestModal";
import { SkillModal } from "@/components/skill/SkillModal";
import { bio, levels, quests, skills } from "@/data/journey";
import { FLOOR_VH } from "@/lib/towerLayout";
import { Quest, Skill } from "@/lib/types";
import { motion } from "framer-motion";
import { useState } from "react";

function SkillBrick({ skill, accent, onClick }: { skill: Skill; accent: string; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ y: -3 }}
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border px-3 py-2 text-left backdrop-blur-sm transition"
      style={{ borderColor: `${accent}55`, background: `${accent}14` }}
    >
      <span className="text-lg">{skill.icon}</span>
      <span className="text-sm font-medium text-white/90">{skill.name}</span>
    </motion.button>
  );
}

function QuestBrick({ quest, accent, onClick }: { quest: Quest; accent: string; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ y: -3 }}
      onClick={onClick}
      className="w-full rounded-xl border p-4 text-left backdrop-blur-sm transition"
      style={{ borderColor: `${accent}55`, background: `${accent}10` }}
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
        {quest.year} · Project
      </p>
      <h4 className="mb-1 font-semibold text-white">{quest.title}</h4>
      <p className="text-sm text-white/70">{quest.tagline}</p>
    </motion.button>
  );
}

export function LevelSections() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);

  return (
    <>
      {levels.map((level) => {
        const levelSkills = skills.filter((s) => s.levelId === level.id);
        const levelQuests = quests.filter((q) => q.levelId === level.id);

        return (
          <section
            key={level.id}
            id={level.id}
            style={{ minHeight: `${level.floors * FLOOR_VH}vh` }}
            className="relative flex items-center px-6"
          >
            <div className="ml-auto w-full max-w-md rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-md sm:p-8">
              <p
                className="mb-1 text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: level.accent }}
              >
                {level.year} · {level.name} · {level.floors} {level.floors === 1 ? "floor" : "floors"}
              </p>
              <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">{level.title}</h2>
              <p className="mb-5 text-sm leading-relaxed text-white/75">{level.blurb}</p>

              {level.id === "foundation" ? (
                <>
                  <p className="mb-3 text-sm leading-relaxed text-white/80">{bio.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {bio.initialSkills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border px-2.5 py-1 text-xs text-white/80"
                        style={{ borderColor: `${level.accent}55`, background: `${level.accent}14` }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  {levelSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {levelSkills.map((skill) => (
                        <SkillBrick
                          key={skill.id}
                          skill={skill}
                          accent={level.accent}
                          onClick={() => setActiveSkill(skill)}
                        />
                      ))}
                    </div>
                  )}
                  {levelQuests.length > 0 && (
                    <div className="space-y-3">
                      {levelQuests.map((quest) => (
                        <QuestBrick
                          key={quest.id}
                          quest={quest}
                          accent={level.accent}
                          onClick={() => setActiveQuest(quest)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              <p className="mt-5 text-xs uppercase tracking-widest text-white/40">
                Click a brick to read more →
              </p>
            </div>
          </section>
        );
      })}

      <SkillModal skill={activeSkill} onClose={() => setActiveSkill(null)} accent={activeSkill ? levelAccent(activeSkill.levelId) : undefined} />
      <QuestModal quest={activeQuest} onClose={() => setActiveQuest(null)} accent={activeQuest ? levelAccent(activeQuest.levelId) : undefined} />
    </>
  );
}

function levelAccent(id: string) {
  return levels.find((l) => l.id === id)?.accent;
}
