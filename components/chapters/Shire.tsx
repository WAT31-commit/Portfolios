"use client";

import { ChapterShell } from "@/components/chapters/ChapterShell";
import { bio, getChapterMeta } from "@/data/journey";
import { motion } from "framer-motion";

const meta = getChapterMeta("shire");

function Card({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      {children}
    </motion.div>
  );
}

export function Shire() {
  return (
    <ChapterShell
      id="shire"
      eyebrow={`${meta.year} · ${meta.name}`}
      title={meta.title}
      gradient={meta.gradient}
      emberColor={meta.emberColor}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-300/80">
            About Me
          </h3>
          <p className="text-white/85 leading-relaxed">{bio.summary}</p>
        </Card>

        <Card delay={0.1}>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-300/80">
            Why Global Business Management
          </h3>
          <p className="text-white/85 leading-relaxed">{bio.whyGBM}</p>
        </Card>

        <Card delay={0.15}>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-300/80">
            Where I Wanted to Go
          </h3>
          <ul className="list-disc space-y-2 pl-4 text-white/85">
            {bio.goals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </Card>

        <Card delay={0.2}>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-300/80">
            Starting Gear
          </h3>
          <p className="mb-3 text-xs uppercase tracking-widest text-white/50">Initial Skills</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {bio.initialSkills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/75"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mb-3 text-xs uppercase tracking-widest text-white/50">Languages</p>
          <div className="flex flex-wrap gap-2">
            {bio.languages.map((l) => (
              <span
                key={l}
                className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs text-amber-200/90"
              >
                {l}
              </span>
            ))}
          </div>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 text-center"
      >
        <a
          href={bio.resumeHref}
          download
          className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-amber-300"
        >
          📜 Download Resume
        </a>
      </motion.div>
    </ChapterShell>
  );
}
