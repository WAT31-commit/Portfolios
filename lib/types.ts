export type ChapterId =
  | "shire"
  | "old-forest"
  | "rivendell"
  | "mines-mountains"
  | "dark-land"
  | "the-eye";

export interface Skill {
  id: string;
  name: string;
  icon: string;
  level: 1 | 2 | 3 | 4 | 5;
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
  chapter: ChapterId;
  tagline: string;
  tags: string[];
  link?: string;
  repo?: string;

  // Rivendell (book spine -> quest log)
  description?: string;
  role?: string;
  highlights?: string[];

  // Mines & Mountains (peaks)
  mission?: string;
  problem?: string;
  solution?: string;
  tools?: string[];
  impact?: string;

  // Dark Land (boss battles)
  strategy?: string;
  execution?: string;
  outcome?: string;
}

export interface ChapterMeta {
  id: ChapterId;
  year: string;
  name: string;
  title: string;
  blurb: string;
  icon: string;
  gradient: string;
  emberColor: string;
}
