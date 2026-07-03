import { TOTAL_FLOORS } from "@/data/journey";

export const TOWER_RADIUS = 0.5;
export const FLOOR_HEIGHT = 0.5;
export const BASE_HEIGHT = 0.35;
export const COLUMN_COUNT = 10;
export const COLUMN_RADIUS = 0.04;

// A restrained white-marble-and-gold palette, in the spirit of a
// Greco-Roman colonnade. Floors alternate between white and gold; a
// polished gold cornice separates every tier.
export const MARBLE = "#f6f3ec"; // white Carrara marble
export const MARBLE_VEIN = "#ece6d6"; // faint warm veining
export const MARBLE_SHADOW = "#e3dbc7"; // shaded stone
export const GOLD = "#e3c983"; // pale gilded stone
export const GOLD_DEEP = "#c6a24f"; // deeper gild for interchange
export const TRIM = "#d4b45f"; // polished gold cornice

// Where each level's floating year marker sits, and where the camera moves
// to when that marker is clicked — a fixed angle keeps every marker (and
// the zoomed-in framing) consistent and predictable.
export const MARKER_ANGLE = Math.PI / 7;
export const MARKER_RADIUS_OFFSET = 1.1;
export const FOCUS_RADIUS = 3.2;

// The floating year badges sit on an evenly-spaced vertical rail beside the
// tower, so the gap between each is identical regardless of how many floors
// its level spans.
export const MARKER_Y_BOTTOM = 0.95;
export const MARKER_Y_STEP = 0.98;

export const TOWER_TOP_Y = BASE_HEIGHT + TOTAL_FLOORS * FLOOR_HEIGHT;
export const EYE_Y = TOWER_TOP_Y + 1.1;

// The outro "study" set sits along +Z, facing back toward the tower at the
// origin: camera -> figure -> desk -> window -> (tower, far away).
export const STUDY_FIGURE_Z = 8;
export const STUDY_DESK_Z = 7.2;
export const STUDY_WALL_Z = 18;
