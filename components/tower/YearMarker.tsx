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
          className={`group flex h-[68px] w-[68px] items-center justify-center rounded-full p-[3px] transition-all duration-500 ${
            visible ? "opacity-100" : "translate-y-2 opacity-0"
          } ${active ? "scale-110" : "hover:scale-105"}`}
          style={{
            // Outer gold ring
            background: "linear-gradient(145deg, #e8d29a, #b9974a)",
            boxShadow: active
              ? "0 0 28px -4px rgba(203,168,90,0.75), inset 0 1px 0 rgba(255,255,255,0.6)"
              : "0 6px 20px -8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          {/* Inner white marble circle — a circle inside a circle */}
          <span
            className="flex h-full w-full flex-col items-center justify-center rounded-full text-center"
            style={{
              background: active
                ? "radial-gradient(circle at 50% 35%, #ffffff, #efe9dc)"
                : "radial-gradient(circle at 50% 35%, #f8f5ee, #e5ddca)",
              boxShadow: "inset 0 0 6px rgba(150,120,60,0.25)",
            }}
          >
            <span className="text-lg font-bold leading-none text-[#8a6d2a]">{index}</span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#a3873f]">
              {level.year}
            </span>
          </span>
        </button>
      </Html>
    </group>
  );
}
