# There and Back Again — The Journey of William

A single-page, scroll-driven fantasy portfolio built with Next.js (App Router), TypeScript,
Tailwind CSS, Framer Motion, React Three Fiber, and Lenis smooth scroll. Six chronological
chapters — each a distinct region with its own palette and backdrop — are connected by a
persistent world-map nav that unlocks regions as the visitor scrolls into them.

## Chapters

- **2022 — The Shire**: bio, why GBM, goals, starting skills, languages, resume download
- **2023 — The Old Forest**: clickable skill trees, early quests, activities
- **2024 — Rivendell**: projects as book spines that open into a quest-log modal
- **2025 — The Mines & Mountains**: projects as peaks (Mission / Problem / Solution / Tools / Impact)
- **2026 — The Dark Land**: boss-battle project cards (Problem / Strategy / Execution / Outcome)
- **Future — The Eye**: opening-eye animation, mission/philosophy/goals, contact CTAs

All content lives in [`data/journey.ts`](data/journey.ts) — this is placeholder-but-realistic
content for "William," a Global Business Management student. Replace it with your real bio,
projects, links, and resume. [`public/resume.pdf`](public/resume.pdf) is a placeholder that also
needs swapping.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Key files

- `lib/types.ts` — `Quest` / `Skill` shape shared across chapters
- `components/chapters/*` — one component per region
- `components/map/*` — hero map + persistent chronologically-gated nav
- `components/quest/QuestModal.tsx` — reusable project-detail modal
- `components/skill/SkillModal.tsx` — reusable skill-detail modal
- `components/three/Embers.tsx` — ambient particle field, recolored per region
- `lib/progress-context.tsx` + `lib/useSectionInView.ts` — tracks scroll progress to drive the
  map unlock state
