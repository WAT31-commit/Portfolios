"use client";

import { Bunting, CakeTable } from "@/components/three/Celebration";
import { GandalfMesh } from "@/components/three/GandalfMesh";
import { SmallFolkMesh } from "@/components/three/SmallFolkMesh";
import { MilestonePanel } from "./MilestonePanel";

export function MilestoneBirthday() {
  return (
    <MilestonePanel
      index={4}
      title="A Birthday Kept"
      caption="Bunting in the trees, a candle lit, and an old friend come to celebrate — the start of a much longer story."
      sky="bg-gradient-to-b from-[#4a3a1e] via-[#3a2e18] to-[#241a0c]"
      groundColor="#5a7a3a"
      hillAccent="#8a9a4a"
      warmLight
    >
      <Bunting from={[-1.8, 1.3, -0.6]} to={[1.8, 1.3, -0.6]} />
      <CakeTable position={[0.1, -0.5, -0.1]} />
      <group position={[-0.9, 0, 0.2]} rotation={[0, 0.4, 0]}>
        <GandalfMesh scale={0.8} />
      </group>
      <group position={[0.85, -0.35, 0.3]} rotation={[0, -0.5, 0]}>
        <SmallFolkMesh scale={0.9} waving />
      </group>
    </MilestonePanel>
  );
}
