import { TOTAL_FLOORS } from "@/data/journey";

export const BRICKS_PER_FLOOR = 14;
export const TOWER_RADIUS = 2.3;
export const FLOOR_HEIGHT = 0.5;
export const BRICK_HEIGHT = FLOOR_HEIGHT * 0.82;
export const BASE_HEIGHT = 0.35;

export const TOWER_TOP_Y = BASE_HEIGHT + TOTAL_FLOORS * FLOOR_HEIGHT;
export const EYE_Y = TOWER_TOP_Y + 1.1;

// The outro "study" set sits along +Z, facing back toward the tower at the
// origin: camera -> figure -> desk -> window -> (tower, far away).
export const STUDY_FIGURE_Z = 8;
export const STUDY_DESK_Z = 7.2;
export const STUDY_WINDOW_Z = 4;
export const STUDY_WALL_Z = 18;
