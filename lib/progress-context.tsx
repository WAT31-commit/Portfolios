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
// panel per chapter. Used to remap raw 0-1 scroll progress (across the
// whole track) into 0-1 progress across just the chapter waypoints.
export const TOTAL_PANELS = CHAPTER_ORDER.length + 1;

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
