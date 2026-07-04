"use client";

import { TOWER_RADIUS } from "@/lib/towerGeometry";
import { getToonGradient } from "@/lib/toonGradient";
import { useState } from "react";

/** A stone piazza around the tower's base, set in a moonlit garden lawn. */
export function Ground() {
  const [gradientMap] = useState(getToonGradient);

  return (
    <group>
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[TOWER_RADIUS + 1.1, 48]} />
        <meshToonMaterial color="#e4ddf2" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, -0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[TOWER_RADIUS + 1.1, TOWER_RADIUS + 2.4, 48]} />
        <meshToonMaterial color="#cabfe0" gradientMap={gradientMap} />
      </mesh>
      {/* Garden lawn */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[40, 56]} />
        <meshToonMaterial color="#2d4a63" gradientMap={gradientMap} />
      </mesh>
    </group>
  );
}
