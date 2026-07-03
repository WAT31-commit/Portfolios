"use client";

import { AchievementPanel } from "@/components/tower/AchievementPanel";
import { EyeSection } from "@/components/sections/EyeSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { LevelSections } from "@/components/sections/LevelSections";
import { OutroSection } from "@/components/sections/OutroSection";
import { TowerScene } from "@/components/tower/TowerScene";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { LevelId } from "@/lib/types";
import { useState } from "react";

export default function Home() {
  const progress = useScrollProgress();
  const [selectedLevelId, setSelectedLevelId] = useState<LevelId | null>(null);

  return (
    <>
      <TowerScene
        progress={progress}
        selectedLevelId={selectedLevelId}
        onSelectLevel={setSelectedLevelId}
      />
      <main className="pointer-events-none relative z-10">
        <IntroSection />
        <LevelSections />
        <EyeSection />
        <OutroSection />
      </main>
      <AchievementPanel levelId={selectedLevelId} onClose={() => setSelectedLevelId(null)} />
    </>
  );
}
