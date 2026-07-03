"use client";

import { Embers } from "@/components/three/Embers";
import { useSectionInView } from "@/lib/useSectionInView";
import { ChapterId } from "@/lib/types";
import { motion } from "framer-motion";

interface ChapterShellProps {
  id: ChapterId;
  gradient: string;
  emberColor?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

export function ChapterShell({
  id,
  gradient,
  emberColor,
  eyebrow,
  title,
  children,
}: ChapterShellProps) {
  const ref = useSectionInView(id);

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative min-h-screen w-full overflow-hidden px-6 py-24 sm:px-12 ${gradient}`}
    >
      {emberColor && <Embers color={emberColor} />}
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-5xl">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
