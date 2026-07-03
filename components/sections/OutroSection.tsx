"use client";

import { bio, vision } from "@/data/journey";
import { OUTRO_VH } from "@/lib/towerLayout";
import { motion } from "framer-motion";

export function OutroSection() {
  return (
    <section
      style={{ minHeight: `${OUTRO_VH}vh` }}
      className="relative flex items-end justify-center px-6 pb-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-black/55 p-6 text-center backdrop-blur-md sm:p-8"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
          Now, writing the next floor
        </p>
        <p className="mb-4 text-sm leading-relaxed text-white/80">{vision.mission}</p>
        <p className="mb-6 text-sm leading-relaxed text-white/70">{vision.philosophy}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${bio.email}`}
            className="rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-amber-300"
          >
            ✉️ Contact Me
          </a>
          <a
            href={bio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/40 hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href={bio.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/40 hover:text-white"
          >
            GitHub
          </a>
          <a
            href={bio.resumeHref}
            download
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/40 hover:text-white"
          >
            Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
}
