"use client";

import { useSectionInView } from "@/lib/useSectionInView";
import { bio, getChapterMeta, vision } from "@/data/journey";
import { motion } from "framer-motion";

const meta = getChapterMeta("the-eye");

export function TheEye() {
  const ref = useSectionInView("the-eye");

  return (
    <section
      id="the-eye"
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative flex h-screen w-screen flex-shrink-0 items-center justify-center overflow-hidden ${meta.gradient}`}
    >
      <div className="w-full max-w-3xl px-6 py-10 text-center">
        <svg
          width="120"
          height="120"
          viewBox="0 0 200 200"
          className="mx-auto mb-4"
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
          {meta.year} · {meta.name}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 text-3xl font-bold text-white sm:text-5xl"
        >
          {meta.title}
        </motion.h2>

        <div className="mx-auto grid max-w-2xl gap-4 text-left sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-xl border border-orange-500/20 bg-black/30 p-4 backdrop-blur-sm"
          >
            <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-widest text-orange-300">
              Mission
            </h3>
            <p className="text-sm leading-snug text-white/80">{vision.mission}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-xl border border-orange-500/20 bg-black/30 p-4 backdrop-blur-sm"
          >
            <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-widest text-orange-300">
              Philosophy
            </h3>
            <p className="text-sm leading-snug text-white/80">{vision.philosophy}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-xl border border-orange-500/20 bg-black/30 p-4 backdrop-blur-sm sm:col-span-2"
          >
            <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-widest text-orange-300">
              Where I&rsquo;m Headed
            </h3>
            <ul className="list-disc space-y-1 pl-4 text-sm text-white/80">
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
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={`mailto:${bio.email}`}
            className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400"
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
        </motion.div>
      </div>
    </section>
  );
}
