"use client";

import { GandalfMesh } from "@/components/three/GandalfMesh";
import { SmallFolkMesh } from "@/components/three/SmallFolkMesh";
import { MilestonePanel } from "./MilestonePanel";

export function MilestoneMeeting() {
  return (
    <MilestonePanel
      index={1}
      title="A Stranger on the Road"
      caption="The journey begins with a chance meeting — a wizard, a walking stick, and a small, curious face peering out from the hedgerow."
      sky="bg-gradient-to-b from-[#2a4a2e] via-[#1f3a24] to-[#142418]"
      groundColor="#3f6b34"
      hillAccent="#4f8a44"
    >
      <group position={[-0.6, 0, 0]} rotation={[0, 0.35, 0]}>
        <GandalfMesh scale={0.85} />
      </group>
      <group position={[0.7, -0.35, 0.3]} rotation={[0, -0.5, 0]}>
        <SmallFolkMesh scale={0.95} />
      </group>
    </MilestonePanel>
  );
}
