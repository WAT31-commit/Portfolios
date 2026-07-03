"use client";

import { Skill } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export function SkillModal({
  skill,
  onClose,
  accent = "#8bd17c",
}: {
  skill: Skill | null;
  onClose: () => void;
  accent?: string;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {skill && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md rounded-lg border border-white/10 bg-neutral-900 p-6 shadow-2xl"
            style={{ boxShadow: `0 0 60px -15px ${accent}55` }}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 text-2xl leading-none text-white/50 transition hover:text-white"
            >
              ×
            </button>

            <div className="mb-3 flex items-center gap-3">
              <span className="text-3xl">{skill.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-white">{skill.name}</h3>
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
