"use client";

import { Ground, SceneLighting } from "@/components/three/SceneBasics";
import { useNearbyMount } from "@/lib/useNearbyMount";
import { useSectionInView } from "@/lib/useSectionInView";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";

interface MilestonePanelProps {
  index: number;
  title: string;
  caption: string;
  sky: string;
  groundColor: string;
  hillAccent?: string;
  warmLight?: boolean;
  cameraPosition?: [number, number, number];
  children: React.ReactNode;
}

/**
 * Shared layout for a single Shire milestone: a CSS sky/rolling-hills
 * backdrop (matching the site's existing gradient language) with a
 * lazy-mounted, transparent 3D canvas laid over it for the characters and
 * props — keeps the "architecture" soft and painterly while the wizard and
 * his companion stay proper 3D.
 */
export function MilestonePanel({
  index,
  title,
  caption,
  sky,
  groundColor,
  hillAccent,
  warmLight,
  cameraPosition = [0, 0.55, 4.8],
  children,
}: MilestonePanelProps) {
  const { ref: nearbyRef, nearby } = useNearbyMount<HTMLDivElement>();
  const sectionRef = useSectionInView("shire");

  return (
    <div
      ref={(node) => {
        nearbyRef.current = node;
        sectionRef.current = node;
      }}
      className={`relative flex h-screen w-screen flex-shrink-0 flex-col items-center justify-end overflow-hidden ${sky}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background: `radial-gradient(120% 100% at 50% 100%, ${hillAccent ?? groundColor} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-[-10%] h-64 w-[60%] rounded-[100%] opacity-90"
        style={{ background: groundColor }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-[-15%] h-72 w-[65%] rounded-[100%] opacity-75"
        style={{ background: groundColor }}
        aria-hidden="true"
      />

      <div className="absolute inset-0">
        {nearby && (
          <Canvas
            camera={{ position: cameraPosition, fov: 34 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true }}
          >
            <SceneLighting warm={warmLight} />
            <Ground color={groundColor} />
            {children}
          </Canvas>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mb-10 max-w-lg px-6 text-center"
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
          Milestone {index} of 4
        </p>
        <h3 className="mb-2 text-2xl font-bold text-white sm:text-3xl">{title}</h3>
        <p className="text-sm leading-snug text-white/80">{caption}</p>
      </motion.div>
    </div>
  );
}
