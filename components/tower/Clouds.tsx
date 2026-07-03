"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function puffOffsets(seed: number) {
  const rand = (n: number) => {
    const x = Math.sin(seed * 97 + n * 13.7) * 43758.5453;
    return x - Math.floor(x);
  };
  return Array.from({ length: 5 }, (_, i) => ({
    x: (rand(i) - 0.5) * 1.6,
    y: (rand(i + 10) - 0.5) * 0.4,
    z: (rand(i + 20) - 0.5) * 0.8,
    scale: 0.5 + rand(i + 30) * 0.5,
  }));
}

function Cloud({
  position,
  driftSpeed = 0.02,
  scale = 1,
  opacity = 0.6,
}: {
  position: [number, number, number];
  driftSpeed?: number;
  scale?: number;
  opacity?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const [puffs] = useState(() => puffOffsets(position[0] + position[2]));
  const baseX = position[0];

  useFrame((state) => {
    if (!group.current) return;
    group.current.position.x = baseX + Math.sin(state.clock.elapsedTime * driftSpeed + position[2]) * 1.5;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {puffs.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]} scale={p.scale}>
          <sphereGeometry args={[0.6, 10, 10]} />
          <meshStandardMaterial color="#dfe3ee" transparent opacity={opacity} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

export function Clouds({ heightY = 6 }: { heightY?: number }) {
  return (
    <>
      <Cloud position={[-5, heightY, -4]} scale={1.3} driftSpeed={0.015} />
      <Cloud position={[4.5, heightY + 1.2, -6]} scale={1.6} driftSpeed={0.02} />
      <Cloud position={[-3, heightY + 2.5, -8]} scale={1.1} driftSpeed={0.012} />
      <Cloud position={[6, heightY - 1, -3]} scale={0.9} driftSpeed={0.025} />
      <Cloud position={[0, heightY + 3.5, -10]} scale={1.8} driftSpeed={0.01} opacity={0.75} />
    </>
  );
}
