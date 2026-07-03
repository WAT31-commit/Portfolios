import { DarkLand } from "@/components/chapters/DarkLand";
import { MinesMountains } from "@/components/chapters/MinesMountains";
import { OldForest } from "@/components/chapters/OldForest";
import { Rivendell } from "@/components/chapters/Rivendell";
import { Shire } from "@/components/chapters/Shire";
import { TheEye } from "@/components/chapters/TheEye";
import { HeroMap } from "@/components/map/HeroMap";
import { WorldMap } from "@/components/map/WorldMap";

export default function Home() {
  return (
    <>
      <main className="relative flex h-screen w-max">
        <HeroMap />
        <Shire />
        <OldForest />
        <Rivendell />
        <MinesMountains />
        <DarkLand />
        <TheEye />
      </main>
      <WorldMap />
    </>
  );
}
