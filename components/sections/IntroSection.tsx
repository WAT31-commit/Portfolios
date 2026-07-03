"use client";

import { bio } from "@/data/journey";
import { INTRO_VH } from "@/lib/towerLayout";
import { motion } from "framer-motion";

export function IntroSection() {
  return (
    <section
      style={{ minHeight: `${INTRO_VH}vh` }}
      className="relative flex items-center justify-center px-6 text-center"
    >
      <div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-200/80"
        >
          An unfinished tower, on open ground
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="max-w-2xl text-4xl font-bold text-white sm:text-6xl"
        >
          {bio.name} is Building
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mx-auto mt-4 max-w-lg text-lg text-white/70"
        >
          {bio.tagline}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1, duration: 0.6 }, y: { repeat: Infinity, duration: 1.8 } }}
          className="mt-16 text-sm font-semibold uppercase tracking-widest text-white/50"
        >
          Scroll to start laying bricks ↓
        </motion.p>
      </div>
    </section>
  );
}
