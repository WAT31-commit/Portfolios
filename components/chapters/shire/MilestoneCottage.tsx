"use client";

import { GandalfMesh } from "@/components/three/GandalfMesh";
import { HillCottage } from "@/components/three/HillCottage";
import { SmallFolkMesh } from "@/components/three/SmallFolkMesh";
import { MilestonePanel } from "./MilestonePanel";

export function MilestoneCottage() {
  return (
    <MilestonePanel
      index={3}
      title="A Door in the Hillside"
      caption="The road ends at a round green door set into the hill — a warm light in the window, and a familiar face waiting on the step."
      sky="bg-gradient-to-b from-[#2c4a3a] via-[#1e3a2a] to-[#12241a]"
      groundColor="#3f7a3a"
      hillAccent="#5a9a4a"
      warmLight
    >
      <HillCottage position={[0, -0.1, -1.1]} />
      <group position={[-0.75, 0, 0.5]} rotation={[0, 0.3, 0]}>
        <GandalfMesh scale={0.8} />
      </group>
      <group position={[0.05, -0.35, 0.75]} rotation={[0, -0.2, 0]}>
        <SmallFolkMesh scale={0.9} waving />
      </group>
    </MilestonePanel>
  );
}
