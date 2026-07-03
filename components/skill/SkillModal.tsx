"use client";

import { Modal } from "@/components/ui/Modal";
import { Skill } from "@/lib/types";

export function SkillModal({
  skill,
  onClose,
  accent = "#8bd17c",
}: {
  skill: Skill | null;
  onClose: () => void;
  accent?: string;
}) {
  return (
    <Modal
      open={!!skill}
      onClose={onClose}
      accent={accent}
      labelledBy="skill-modal-title"
      maxWidthClassName="max-w-md"
    >
      {skill && (
        <>
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">{skill.icon}</span>
            <div>
              <h3 id="skill-modal-title" className="text-xl font-bold text-white">
                {skill.name}
              </h3>
              <div className="mt-1 flex gap-1" aria-label={`Level ${skill.level} of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-5 rounded-full"
                    style={{
                      backgroundColor: i < skill.level ? accent : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/50">
                Where Learned
              </h4>
              <p className="text-white/85">{skill.whereLearned}</p>
            </div>
            <div>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/50">
                Projects
              </h4>
              <ul className="list-disc space-y-1 pl-4 text-white/85">
                {skill.projects.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/50">
                Lessons Learned
              </h4>
              <p className="text-white/85 leading-relaxed">{skill.lessons}</p>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
