"use client";

import { TOWER_RADIUS } from "@/lib/towerGeometry";

/** A stone piazza around the tower's base, set in a sunlit garden lawn. */
export function Ground() {
  return (
    <group>
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[TOWER_RADIUS + 1.1, 48]} />
        <meshStandardMaterial color="#d8d0ba" roughness={0.85} />
      </mesh>
      <mesh position={[0, -0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[TOWER_RADIUS + 1.1, TOWER_RADIUS + 2.4, 48]} />
        <meshStandardMaterial color="#c3b89b" roughness={0.9} />
      </mesh>
      {/* Garden lawn */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[40, 56]} />
        <meshStandardMaterial color="#5d8f4a" roughness={1} />
      </mesh>
    </group>
  );
}
