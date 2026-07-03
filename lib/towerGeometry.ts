import { TOTAL_FLOORS } from "@/data/journey";

export const TOWER_RADIUS = 2.1;
export const FLOOR_HEIGHT = 0.5;
export const BASE_HEIGHT = 0.35;
export const COLUMN_COUNT = 18;
export const COLUMN_RADIUS = 0.06;

export const MARBLE = "#efe7da";
export const MARBLE_SHADOW = "#d9cdb2";
export const TRIM = "#c9a95f";

// Where each level's floating year marker sits, and where the camera moves
// to when that marker is clicked — a fixed angle keeps every marker (and
// the zoomed-in framing) consistent and predictable.
export const MARKER_ANGLE = Math.PI / 7;
export const MARKER_RADIUS_OFFSET = 1.1;
export const FOCUS_RADIUS = 4.4;

export const TOWER_TOP_Y = BASE_HEIGHT + TOTAL_FLOORS * FLOOR_HEIGHT;
export const EYE_Y = TOWER_TOP_Y + 1.1;

// The outro "study" set sits along +Z, facing back toward the tower at the
// origin: camera -> figure -> desk -> window -> (tower, far away).
export const STUDY_FIGURE_Z = 8;
export const STUDY_DESK_Z = 7.2;
export const STUDY_WINDOW_Z = 4;
export const STUDY_WALL_Z = 18;
