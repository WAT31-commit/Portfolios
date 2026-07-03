"use client";

import { TOWER_RADIUS } from "@/lib/towerGeometry";

/** A quiet stone piazza around the tower's base, fading into a muted lawn at dusk. */
export function Ground() {
  return (
    <group>
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[TOWER_RADIUS + 1.1, 48]} />
        <meshStandardMaterial color="#beb298" roughness={0.85} />
      </mesh>
      <mesh position={[0, -0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[TOWER_RADIUS + 1.1, TOWER_RADIUS + 2.4, 48]} />
        <meshStandardMaterial color="#a89b7e" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[40, 56]} />
        <meshStandardMaterial color="#2c332c" roughness={1} />
      </mesh>
    </group>
  );
}
