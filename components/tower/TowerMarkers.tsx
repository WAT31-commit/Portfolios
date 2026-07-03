"use client";

import { levels } from "@/data/journey";
import { LevelId } from "@/lib/types";
import { MotionValue } from "framer-motion";
import { YearMarker } from "./YearMarker";

export function TowerMarkers({
  progress,
  selectedLevelId,
  onSelectLevel,
}: {
  progress: MotionValue<number>;
  selectedLevelId: LevelId | null;
  onSelectLevel: (id: LevelId) => void;
}) {
  return (
    <>
      {levels.map((level) => (
        <YearMarker
          key={level.id}
          level={level}
          progress={progress}
          active={selectedLevelId === level.id}
          onSelect={() => onSelectLevel(level.id)}
        />
      ))}
    </>
  );
}
