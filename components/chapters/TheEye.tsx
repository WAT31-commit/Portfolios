"use client";

import { useSectionInView } from "@/lib/useSectionInView";
import { bio, vision } from "@/data/journey";
import { motion } from "framer-motion";

export function TheEye() {
  const ref = useSectionInView("the-eye");

  return (
    <section
      id="the-eye"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#120a06] via-[#1a0d05] to-[#0a0503] px-6 py-24 text-center"
    >
      <svg
        width="180"
        height="180"
        viewBox="0 0 200 200"
        className="mb-10"
        aria-hidden="true"
      >
        <motion.path
          initial={{ d: "M10,100 Q100,100 190,100 Q100,100 10,100" }}
          whileInView={{
            d: "M10,100 Q100,20 190,100 Q100,180 10,100",
          }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          fill="none"
          stroke="#ff8c42"
          strokeWidth="3"
        />
        <motion.circle
          cx="100"
          cy="100"
          r="0"
          fill="#ff8c42"
          initial={{ r: 0, opacity: 0 }}
          whileInView={{ r: 28, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="0"
          fill="#160604"
          initial={{ r: 0 }}
          whileInView={{ r: 12 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        />
      </svg>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-orange-400"
      >
        Future · The Eye
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-10 text-3xl font-bold text-white sm:text-5xl"
      >
        What Comes Next
      </motion.h2>

      <div className="mx-auto grid max-w-2xl gap-6 text-left sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl border border-orange-500/20 bg-black/30 p-6 backdrop-blur-sm"
        >
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-300">
            Mission
          </h3>
          <p className="text-white/80 leading-relaxed">{vision.mission}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-xl border border-orange-500/20 bg-black/30 p-6 backdrop-blur-sm"
        >
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-300">
            Philosophy
          </h3>
          <p className="text-white/80 leading-relaxed">{vision.philosophy}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-xl border border-orange-500/20 bg-black/30 p-6 backdrop-blur-sm sm:col-span-2"
        >
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-300">
            Where I'm Headed
          </h3>
          <ul className="list-disc space-y-1 pl-4 text-white/80">
            {vision.goals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-14 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href={`mailto:${bio.email}`}
          className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
        >
          ✉️ Contact Me
        </a>
        <a
          href={bio.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-white/40 hover:text-white"
        >
          LinkedIn
        </a>
        <a
          href={bio.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-white/40 hover:text-white"
        >
          GitHub
        </a>
        <a
          href={bio.resumeHref}
          download
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-white/40 hover:text-white"
        >
          Resume
        </a>
      </motion.div>
    </section>
  );
}
