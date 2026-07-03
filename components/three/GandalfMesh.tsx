"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

/**
 * A low-poly procedural wizard built from primitive geometry — no external
 * model/texture assets, just cones/spheres/cylinders in a recognizable
 * silhouette (pointed hat, robe, beard, staff with a glowing orb).
 */
export function GandalfMesh({
  scale = 1,
  idle = true,
}: {
  scale?: number;
  idle?: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!idle || !group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 2) * 0.04;
    group.current.rotation.z = Math.sin(t * 1.3) * 0.025;
  });

  return (
    <group ref={group} scale={scale}>
      {/* Robe */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <coneGeometry args={[0.55, 1.3, 12]} />
        <meshStandardMaterial color="#6b6f76" roughness={0.85} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#d9c3a3" roughness={0.6} />
      </mesh>
      {/* Beard */}
      <mesh position={[0, 0.48, 0.12]} rotation={[0.15, 0, 0]}>
        <coneGeometry args={[0.2, 0.55, 10]} />
        <meshStandardMaterial color="#e8e6df" roughness={0.9} />
      </mesh>
      {/* Hat brim */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.04, 16]} />
        <meshStandardMaterial color="#4a4d52" roughness={0.7} />
      </mesh>
      {/* Hat cone */}
      <mesh position={[0, 1.35, 0]} rotation={[0, 0, -0.05]}>
        <coneGeometry args={[0.24, 0.7, 12]} />
        <meshStandardMaterial color="#5b5f66" roughness={0.7} />
      </mesh>
      {/* Staff */}
      <mesh position={[0.45, 0.3, 0.05]} rotation={[0, 0, -0.05]}>
        <cylinderGeometry args={[0.025, 0.03, 1.7, 8]} />
        <meshStandardMaterial color="#5c4a36" roughness={0.9} />
      </mesh>
      {/* Staff orb */}
      <mesh position={[0.47, 1.15, 0.05]}>
        <icosahedronGeometry args={[0.09, 0]} />
        <meshStandardMaterial
          color="#f5e6b8"
          emissive="#f5c168"
          emissiveIntensity={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}
