"use client";

import { LevelMeta } from "@/lib/types";
import {
  BASE_HEIGHT,
  FLOOR_HEIGHT,
  MARKER_ANGLE,
  MARKER_RADIUS_OFFSET,
  TOWER_RADIUS,
} from "@/lib/towerGeometry";
import { EYE_START_FRACTION, LEVEL_LAYOUT, floorStartFraction } from "@/lib/towerLayout";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { useRef, useState } from "react";

interface YearMarkerProps {
  level: LevelMeta;
  index: number;
  progress: MotionValue<number>;
  active: boolean;
  onSelect: () => void;
}

/** A floating glass badge beside the tower — a plain number and its year — revealed once that level's floors begin rising. */
export function YearMarker({ level, index, progress, active, onSelect }: YearMarkerProps) {
  const [visible, setVisible] = useState(false);
  const wasVisible = useRef(false);
  const layout = LEVEL_LAYOUT.find((l) => l.id === level.id)!;
  const revealAt = floorStartFraction(layout.floorStart);
  const midFloor = (layout.floorStart + layout.floorEnd) / 2;
  const midY = BASE_HEIGHT + midFloor * FLOOR_HEIGHT;
  const x = Math.cos(MARKER_ANGLE) * (TOWER_RADIUS + MARKER_RADIUS_OFFSET);
  const z = Math.sin(MARKER_ANGLE) * (TOWER_RADIUS + MARKER_RADIUS_OFFSET);

  useFrame(() => {
    const p = progress.get();
    const shouldShow = p >= revealAt && p < EYE_START_FRACTION;
    if (shouldShow !== wasVisible.current) {
      wasVisible.current = shouldShow;
      setVisible(shouldShow);
    }
  });

  return (
    <group position={[x, midY, z]}>
      <Html center distanceFactor={8} zIndexRange={[10, 0]} style={{ pointerEvents: visible ? "auto" : "none" }}>
        <button
          type="button"
          onClick={onSelect}
          aria-label={`${level.name}, ${level.year}`}
          className={`flex h-16 w-16 flex-col items-center justify-center rounded-full border text-center backdrop-blur-md transition-all duration-500 ${
            visible ? "opacity-100" : "translate-y-2 opacity-0"
          } ${
            active
              ? "scale-110 border-white/50 bg-white/25"
              : "border-white/25 bg-white/10 hover:border-white/40 hover:bg-white/15"
          }`}
          style={{ boxShadow: active ? `0 0 30px -6px ${level.accent}aa` : "0 4px 20px -8px rgba(0,0,0,0.5)" }}
        >
          <span className="text-xl font-bold leading-none text-white">{index}</span>
          <span className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/70">
            {level.year}
          </span>
        </button>
      </Html>
    </group>
  );
}
