"use client";

import { EyeSection } from "@/components/sections/EyeSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { LevelSections } from "@/components/sections/LevelSections";
import { OutroSection } from "@/components/sections/OutroSection";
import { TowerScene } from "@/components/tower/TowerScene";
import { useScrollProgress } from "@/lib/useScrollProgress";

export default function Home() {
  const progress = useScrollProgress();

  return (
    <>
      <TowerScene progress={progress} />
      <main className="relative z-10">
        <IntroSection />
        <LevelSections />
        <EyeSection />
        <OutroSection />
      </main>
    </>
  );
}
