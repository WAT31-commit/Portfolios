"use client";

import { EYE_VH } from "@/lib/towerLayout";
import { motion } from "framer-motion";

export function EyeSection() {
  return (
    <section
      style={{ minHeight: `${EYE_VH}vh` }}
      className="relative flex items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
        className="max-w-md text-lg font-medium text-white/85 sm:text-2xl"
      >
        Ten floors up, a tree of knowledge crowns the tower — its golden apples the ideas the climb has borne.
      </motion.p>
    </section>
  );
}
