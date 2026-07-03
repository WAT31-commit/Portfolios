"use client";

import { QuestModal } from "@/components/quest/QuestModal";
import { SkillModal } from "@/components/skill/SkillModal";
import { Modal } from "@/components/ui/Modal";
import { bio, levels, quests, skills } from "@/data/journey";
import { LevelId, Quest, Skill } from "@/lib/types";
import { motion } from "framer-motion";
import { useState } from "react";

function SkillBrick({ skill, accent, onClick }: { skill: Skill; accent: string; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border px-3 py-2 text-left backdrop-blur-sm transition"
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
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

export function AchievementPanel({
  levelId,
  onClose,
}: {
  levelId: LevelId | null;
  onClose: () => void;
}) {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);

  const level = levelId ? levels.find((l) => l.id === levelId) : null;
  const levelSkills = level ? skills.filter((s) => s.levelId === level.id) : [];
  const levelQuests = level ? quests.filter((q) => q.levelId === level.id) : [];

  return (
    <>
      <Modal
        open={!!level}
        onClose={onClose}
        accent={level?.accent}
        labelledBy="achievement-title"
        maxWidthClassName="max-w-lg"
      >
        {level && (
          <>
            <p
              className="mb-1 text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: level.accent }}
            >
              {level.year} · {level.name} · {level.floors} {level.floors === 1 ? "floor" : "floors"}
            </p>
            <h3 id="achievement-title" className="mb-2 text-2xl font-bold text-white sm:text-3xl">
              {level.title}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-white/75">{level.blurb}</p>

            {level.id === "foundation" ? (
              <>
                <p className="mb-4 text-sm leading-relaxed text-white/80">{bio.summary}</p>
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
          </>
        )}
      </Modal>

      <SkillModal skill={activeSkill} onClose={() => setActiveSkill(null)} accent={level?.accent} />
      <QuestModal quest={activeQuest} onClose={() => setActiveQuest(null)} accent={level?.accent} />
    </>
  );
}
