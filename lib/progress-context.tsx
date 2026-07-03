"use client";

import { ChapterId } from "@/lib/types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export const CHAPTER_ORDER: ChapterId[] = [
  "shire",
  "old-forest",
  "rivendell",
  "mines-mountains",
  "dark-land",
  "the-eye",
];

// The journey track is one horizontal row of panels: the hero, then one
// panel per chapter — except the Shire, which spans its bio intro plus 4
// milestone scenes. Used to remap raw 0-1 scroll progress (across the whole
// track) into 0-1 progress across just the chapter waypoints, and to place
// each waypoint at its true proportional position along the road.
export const CHAPTER_PANEL_COUNTS: Record<ChapterId, number> = {
  shire: 5,
  "old-forest": 1,
  rivendell: 1,
  "mines-mountains": 1,
  "dark-land": 1,
  "the-eye": 1,
};

const CHAPTER_PANEL_TOTAL = CHAPTER_ORDER.reduce(
  (sum, id) => sum + CHAPTER_PANEL_COUNTS[id],
  0
);

export const TOTAL_PANELS = CHAPTER_PANEL_TOTAL + 1;

// Each chapter's start position within chapter-progress space (0-1, i.e.
// excluding the hero panel) — proportional to how many panels precede it.
export const CHAPTER_START_FRACTIONS: Record<ChapterId, number> = (() => {
  let cursor = 0;
  const map = {} as Record<ChapterId, number>;
  for (const id of CHAPTER_ORDER) {
    map[id] = cursor / CHAPTER_PANEL_TOTAL;
    cursor += CHAPTER_PANEL_COUNTS[id];
  }
  return map;
})();

interface ProgressContextValue {
  furthestUnlocked: ChapterId;
  activeChapter: ChapterId;
  isUnlocked: (id: ChapterId) => boolean;
  reportInView: (id: ChapterId) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [furthestUnlocked, setFurthestUnlocked] = useState<ChapterId>("shire");
  const [activeChapter, setActiveChapter] = useState<ChapterId>("shire");

  const reportInView = useCallback((id: ChapterId) => {
    setActiveChapter(id);
    setFurthestUnlocked((prev) => {
      const prevIndex = CHAPTER_ORDER.indexOf(prev);
      const nextIndex = CHAPTER_ORDER.indexOf(id);
      return nextIndex > prevIndex ? id : prev;
    });
  }, []);

  const isUnlocked = useCallback(
    (id: ChapterId) => {
      return CHAPTER_ORDER.indexOf(id) <= CHAPTER_ORDER.indexOf(furthestUnlocked);
    },
    [furthestUnlocked]
  );

  const value = useMemo(
    () => ({ furthestUnlocked, activeChapter, isUnlocked, reportInView }),
    [furthestUnlocked, activeChapter, isUnlocked, reportInView]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
