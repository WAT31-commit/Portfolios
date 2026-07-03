"use client";

import { TOTAL_FLOORS } from "@/data/journey";
import { floorEndFraction, floorStartFraction } from "@/lib/towerLayout";
import {
  BASE_HEIGHT,
  COLUMN_COUNT,
  COLUMN_RADIUS,
  FLOOR_HEIGHT,
  MARBLE,
  MARBLE_SHADOW,
  TOWER_RADIUS,
  TRIM,
} from "@/lib/towerGeometry";
import { useFrame } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function radiusForFloor(floorIndex: number) {
  return TOWER_RADIUS - floorIndex * 0.012;
}

interface FloorProps {
  floorIndex: number;
  progress: MotionValue<number>;
}

/** One marble tier: a solid drum, a ring of columns standing proud of it, and a gilded cornice band. */
function Floor({ floorIndex, progress }: FloorProps) {
  const group = useRef<THREE.Group>(null);
  const start = floorStartFraction(floorIndex);
  const end = floorEndFraction(floorIndex);
  const radius = radiusForFloor(floorIndex);
  const y = BASE_HEIGHT + floorIndex * FLOOR_HEIGHT;

  useFrame(() => {
    if (!group.current) return;
    const reveal = THREE.MathUtils.clamp((progress.get() - start) / (end - start || 1), 0, 1);
    const eased = reveal * reveal * (3 - 2 * reveal);
    group.current.scale.setScalar(Math.max(eased, 0.0001));
    group.current.position.y = y - (1 - eased) * 0.4;
  });

  const columns = Array.from({ length: COLUMN_COUNT }, (_, i) => {
    const angle = (i / COLUMN_COUNT) * Math.PI * 2;
    return {
      x: Math.cos(angle) * (radius + COLUMN_RADIUS * 0.7),
      z: Math.sin(angle) * (radius + COLUMN_RADIUS * 0.7),
    };
  });

  return (
    <group ref={group} position={[0, y, 0]}>
      <mesh position={[0, FLOOR_HEIGHT / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, FLOOR_HEIGHT, 36]} />
        <meshStandardMaterial color={MARBLE_SHADOW} roughness={0.5} />
      </mesh>
      {columns.map((c, i) => (
        <mesh key={i} position={[c.x, FLOOR_HEIGHT / 2, c.z]} castShadow>
          <cylinderGeometry args={[COLUMN_RADIUS, COLUMN_RADIUS * 1.15, FLOOR_HEIGHT * 0.86, 10]} />
          <meshStandardMaterial color={MARBLE} roughness={0.35} />
        </mesh>
      ))}
      <mesh position={[0, FLOOR_HEIGHT - 0.03, 0]}>
        <cylinderGeometry args={[radius + 0.15, radius + 0.1, 0.08, 36]} />
        <meshStandardMaterial color={TRIM} roughness={0.4} metalness={0.15} />
      </mesh>
    </group>
  );
}

function TowerBase() {
  return (
    <group>
      <mesh position={[0, BASE_HEIGHT / 2, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[TOWER_RADIUS + 0.45, TOWER_RADIUS + 0.7, BASE_HEIGHT, 40]} />
        <meshStandardMaterial color={MARBLE_SHADOW} roughness={0.6} />
      </mesh>
      <mesh position={[0, BASE_HEIGHT + 0.02, 0]}>
        <cylinderGeometry args={[TOWER_RADIUS + 0.2, TOWER_RADIUS + 0.2, 0.06, 40]} />
        <meshStandardMaterial color={TRIM} roughness={0.4} metalness={0.15} />
      </mesh>
    </group>
  );
}

export function Tower({ progress }: { progress: MotionValue<number> }) {
  const floors = Array.from({ length: TOTAL_FLOORS }, (_, i) => i);

  return (
    <group>
      <TowerBase />
      {floors.map((floorIndex) => (
        <Floor key={floorIndex} floorIndex={floorIndex} progress={progress} />
      ))}
    </group>
  );
}
