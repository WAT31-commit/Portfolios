export type LevelId = "foundation" | "groundwork" | "craft" | "ascent" | "trial";

export interface Skill {
  id: string;
  name: string;
  icon: string;
  level: 1 | 2 | 3 | 4 | 5;
  levelId: LevelId;
  whereLearned: string;
  projects: string[];
  lessons: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  role: string;
  period: string;
  detail: string;
}

export interface Quest {
  id: string;
  title: string;
  year: number;
  levelId: LevelId;
  tagline: string;
  tags: string[];
  link?: string;
  repo?: string;

  description?: string;
  role?: string;
  highlights?: string[];

  mission?: string;
  problem?: string;
  solution?: string;
  tools?: string[];
  impact?: string;

  strategy?: string;
  execution?: string;
  outcome?: string;
}

export interface LevelMeta {
  id: LevelId;
  year: string;
  name: string;
  title: string;
  blurb: string;
  /** How many floors of the tower this experience builds — 1 to 3, by significance. */
  floors: number;
  /** Brick/accent color for this stretch of the tower. */
  accent: string;
}
