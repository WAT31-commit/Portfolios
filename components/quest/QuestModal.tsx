"use client";

import { Modal } from "@/components/ui/Modal";
import { Quest } from "@/lib/types";

interface QuestModalProps {
  quest: Quest | null;
  onClose: () => void;
  accent?: string;
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="space-y-1">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50">
        {label}
      </h4>
      <p className="text-sm leading-relaxed text-white/85">{value}</p>
    </div>
  );
}

function ListField({ label, items }: { label: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-1">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50">
        {label}
      </h4>
      <ul className="list-disc space-y-1 pl-4 text-sm leading-relaxed text-white/85">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function QuestModal({ quest, onClose, accent = "#f5c168" }: QuestModalProps) {
  return (
    <Modal
      open={!!quest}
      onClose={onClose}
      accent={accent}
      labelledBy="quest-modal-title"
      maxWidthClassName="max-w-xl"
    >
      {quest && (
        <>
          <p
            className="mb-1 text-xs font-semibold uppercase tracking-widest"
            style={{ color: accent }}
          >
            {quest.year} · Quest Log
          </p>
          <h3 id="quest-modal-title" className="mb-1 text-2xl font-bold text-white">
            {quest.title}
          </h3>
          <p className="mb-6 text-sm italic text-white/60">{quest.tagline}</p>

          <div className="space-y-4">
            <Field label="Description" value={quest.description} />
            <Field label="Role" value={quest.role} />
            <ListField label="Highlights" items={quest.highlights} />

            <Field label="Mission" value={quest.mission} />
            <Field label="Problem" value={quest.problem} />
            <Field label="Solution" value={quest.solution} />
            <Field label="Impact" value={quest.impact} />

            <Field label="Strategy" value={quest.strategy} />
            <Field label="Execution" value={quest.execution} />
            <Field label="Outcome" value={quest.outcome} />

            <ListField label="Tools" items={quest.tools} />

            {quest.tags && quest.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {quest.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {(quest.link || quest.repo) && (
              <div className="flex gap-4 pt-2">
                {quest.link && (
                  <a
                    href={quest.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold underline underline-offset-4"
                    style={{ color: accent }}
                  >
                    View Project ↗
                  </a>
                )}
                {quest.repo && (
                  <a
                    href={quest.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white/70 underline underline-offset-4 hover:text-white"
                  >
                    Source ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
