"use client";

import { FenceRow } from "@/components/three/FenceRow";
import { GandalfMesh } from "@/components/three/GandalfMesh";
import { SmallFolkMesh } from "@/components/three/SmallFolkMesh";
import { MilestonePanel } from "./MilestonePanel";

export function MilestoneFences() {
  return (
    <MilestonePanel
      index={2}
      title="Past the Hedgerows"
      caption="Onward together, past post-and-rail fences and sleepy garden plots — the road climbing gently out of the valley."
      sky="bg-gradient-to-b from-[#33502f] via-[#243a22] to-[#16240f]"
      groundColor="#4a7a3a"
      hillAccent="#5c9a4c"
    >
      <FenceRow count={6} spacing={0.55} startX={-1.5} z={-0.6} />
      <FenceRow count={5} spacing={0.6} startX={-1.2} z={1.1} />
      <group position={[-0.2, 0, 0.15]} rotation={[0, 0.15, 0]}>
        <GandalfMesh scale={0.85} walking />
      </group>
      <group position={[-0.85, -0.35, 0.35]} rotation={[0, 0.2, 0]}>
        <SmallFolkMesh scale={0.9} />
      </group>
    </MilestonePanel>
  );
}
