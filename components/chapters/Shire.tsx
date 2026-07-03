"use client";

import { ChapterShell } from "@/components/chapters/ChapterShell";
import { ShireDoorScene } from "@/components/chapters/ShireDoorScene";
import { bio, getChapterMeta } from "@/data/journey";
import { motion } from "framer-motion";

const meta = getChapterMeta("shire");

function ShireHeader() {
  return (
    <div className="mb-4 text-center">
      <ShireDoorScene />
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
        {meta.year} · {meta.name}
      </p>
      <h2 className="text-2xl font-bold text-white sm:text-4xl">{meta.title}</h2>
    </div>
  );
}

function Card({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
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
      header={<ShireHeader />}
      gradient={meta.gradient}
      emberColor={meta.emberColor}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-widest text-amber-300/80">
            About Me
          </h3>
          <p className="text-sm leading-snug text-white/85">{bio.summary}</p>
        </Card>

        <Card delay={0.1}>
          <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-widest text-amber-300/80">
            Why Global Business Management
          </h3>
          <p className="text-sm leading-snug text-white/85">{bio.whyGBM}</p>
        </Card>

        <Card delay={0.15}>
          <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-widest text-amber-300/80">
            Where I Wanted to Go
          </h3>
          <ul className="list-disc space-y-1 pl-4 text-sm text-white/85">
            {bio.goals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </Card>

        <Card delay={0.2}>
          <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-widest text-amber-300/80">
            Starting Gear
          </h3>
          <p className="mb-2 text-xs uppercase tracking-widest text-white/50">Initial Skills</p>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {bio.initialSkills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-white/75"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mb-2 text-xs uppercase tracking-widest text-white/50">Languages</p>
          <div className="flex flex-wrap gap-1.5">
            {bio.languages.map((l) => (
              <span
                key={l}
                className="rounded-full border border-amber-300/25 bg-amber-300/10 px-2.5 py-0.5 text-xs text-amber-200/90"
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
        className="mt-6 text-center"
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
