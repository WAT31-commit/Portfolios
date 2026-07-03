"use client";

import { levels } from "@/data/journey";
import { FLOOR_VH } from "@/lib/towerLayout";

/**
 * Each level still needs to occupy real scroll height so the tower has room
 * to rise floor by floor — but the content itself now lives in the
 * floating year markers and the glass AchievementPanel they open, not in an
 * always-visible card here.
 */
export function LevelSections() {
  return (
    <>
      {levels.map((level) => (
        <section key={level.id} id={level.id} style={{ minHeight: `${level.floors * FLOOR_VH}vh` }} />
      ))}
    </>
  );
}
