import { levels, TOTAL_FLOORS } from "@/data/journey";

export const INTRO_VH = 100;
export const FLOOR_VH = 90;
export const EYE_VH = 150;
export const OUTRO_VH = 150;
export const SUMMARY_VH = 130;

export const TOTAL_VH =
  INTRO_VH + FLOOR_VH * TOTAL_FLOORS + EYE_VH + OUTRO_VH + SUMMARY_VH;

export const INTRO_FRACTION = INTRO_VH / TOTAL_VH;
export const FLOORS_START_FRACTION = INTRO_FRACTION;
export const FLOORS_END_FRACTION = (INTRO_VH + FLOOR_VH * TOTAL_FLOORS) / TOTAL_VH;
export const EYE_START_FRACTION = FLOORS_END_FRACTION;
export const EYE_END_FRACTION = (INTRO_VH + FLOOR_VH * TOTAL_FLOORS + EYE_VH) / TOTAL_VH;
export const OUTRO_START_FRACTION = EYE_END_FRACTION;
export const OUTRO_END_FRACTION =
  (INTRO_VH + FLOOR_VH * TOTAL_FLOORS + EYE_VH + OUTRO_VH) / TOTAL_VH;
export const SUMMARY_START_FRACTION = OUTRO_END_FRACTION;

// The camera's move to its final study-room framing (and the room's own
// reveal) both finish partway through the outro section, so the rest of the
// outro — and the whole summary act that follows — just holds steady while
// the closing text and the badge recap are read.
export const OUTRO_CAMERA_DONE_FRACTION =
  OUTRO_START_FRACTION + (OUTRO_END_FRACTION - OUTRO_START_FRACTION) * 0.55;

/** The scroll fraction [0-1] at which floor `index` (0-based, across the whole tower) finishes rising into place. */
export function floorEndFraction(index: number): number {
  return (INTRO_VH + FLOOR_VH * (index + 1)) / TOTAL_VH;
}

export function floorStartFraction(index: number): number {
  return (INTRO_VH + FLOOR_VH * index) / TOTAL_VH;
}

export interface LevelLayout {
  id: (typeof levels)[number]["id"];
  floorStart: number;
  floorEnd: number;
  fractionStart: number;
  fractionEnd: number;
}

/** Each level's floor range and the scroll fraction it spans, in tower order. */
export const LEVEL_LAYOUT: LevelLayout[] = (() => {
  let floorCursor = 0;
  return levels.map((level) => {
    const floorStart = floorCursor;
    const floorEnd = floorCursor + level.floors;
    floorCursor = floorEnd;
    return {
      id: level.id,
      floorStart,
      floorEnd,
      fractionStart: floorStartFraction(floorStart),
      fractionEnd: floorEndFraction(floorEnd - 1),
    };
  });
})();
