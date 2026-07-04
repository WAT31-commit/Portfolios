"use client";

import { TOTAL_FLOORS } from "@/data/journey";
import { getToonGradient } from "@/lib/toonGradient";
import { floorEndFraction, floorStartFraction } from "@/lib/towerLayout";
import {
  BASE_HEIGHT,
  COLUMN_COUNT,
  COLUMN_RADIUS,
  FLOOR_HEIGHT,
  GOLD,
  GOLD_DEEP,
  MARBLE,
  MARBLE_SHADOW,
  TOWER_RADIUS,
  TRIM,
} from "@/lib/towerGeometry";
import { Outlines } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import * as THREE from "three";

const OUTLINE = "#160c29";

function radiusForFloor(floorIndex: number) {
  return TOWER_RADIUS - floorIndex * 0.008;
}

interface FloorProps {
  floorIndex: number;
  progress: MotionValue<number>;
}

// Within each floor's scroll window, the columns rise one by one over the
// first slice, then the drum and gold rings fill in over the rest.
const COLUMNS_PHASE = 0.55;

/** One marble tier: a solid drum, a ring of columns standing proud of it, and a gilded cornice band. */
function Floor({ floorIndex, progress }: FloorProps) {
  const [gradientMap] = useState(getToonGradient);
  const columnRefs = useRef<(THREE.Mesh | null)[]>([]);
  const bodyRef = useRef<THREE.Group>(null);
  const start = floorStartFraction(floorIndex);
  const end = floorEndFraction(floorIndex);
  const radius = radiusForFloor(floorIndex);
  const y = BASE_HEIGHT + floorIndex * FLOOR_HEIGHT;
  // Interchange white marble and gilded stone floor by floor.
  const goldFloor = floorIndex % 2 === 1;
  const drumColor = goldFloor ? GOLD : MARBLE;
  const columnColor = goldFloor ? MARBLE : GOLD;

  useFrame(() => {
    const reveal = THREE.MathUtils.clamp((progress.get() - start) / (end - start || 1), 0, 1);
    const slice = COLUMNS_PHASE / COLUMN_COUNT;
    columnRefs.current.forEach((column, i) => {
      if (!column) return;
      const t = THREE.MathUtils.clamp((reveal - i * slice) / slice, 0, 1);
      const eased = t * t * (3 - 2 * t);
      column.scale.setScalar(Math.max(eased, 0.0001));
    });
    if (bodyRef.current) {
      const t = THREE.MathUtils.clamp((reveal - COLUMNS_PHASE) / (1 - COLUMNS_PHASE), 0, 1);
      const eased = t * t * (3 - 2 * t);
      bodyRef.current.scale.setScalar(Math.max(eased, 0.0001));
    }
  });

  const columns = Array.from({ length: COLUMN_COUNT }, (_, i) => {
    const angle = (i / COLUMN_COUNT) * Math.PI * 2;
    return {
      x: Math.cos(angle) * (radius + COLUMN_RADIUS * 0.7),
      z: Math.sin(angle) * (radius + COLUMN_RADIUS * 0.7),
    };
  });

  return (
    <group position={[0, y, 0]}>
      {columns.map((c, i) => (
        <mesh
          key={i}
          ref={(el) => {
            columnRefs.current[i] = el;
          }}
          position={[c.x, FLOOR_HEIGHT / 2, c.z]}
          castShadow
        >
          <cylinderGeometry args={[COLUMN_RADIUS, COLUMN_RADIUS * 1.15, FLOOR_HEIGHT * 0.86, 10]} />
          <meshToonMaterial color={columnColor} gradientMap={gradientMap} />
          <Outlines thickness={0.012} color={OUTLINE} />
        </mesh>
      ))}
      <group ref={bodyRef}>
        {/* Gold plinth ring that separates this floor from the one below */}
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[radius + 0.12, radius + 0.16, 0.08, 44]} />
          <meshToonMaterial color={GOLD_DEEP} gradientMap={gradientMap} />
        </mesh>
        <mesh position={[0, FLOOR_HEIGHT / 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[radius, radius, FLOOR_HEIGHT, 44]} />
          <meshToonMaterial color={drumColor} gradientMap={gradientMap} />
          <Outlines thickness={0.02} color={OUTLINE} />
        </mesh>
        {/* Gold cornice capping the floor */}
        <mesh position={[0, FLOOR_HEIGHT - 0.02, 0]}>
          <cylinderGeometry args={[radius + 0.16, radius + 0.1, 0.09, 44]} />
          <meshToonMaterial color={TRIM} gradientMap={gradientMap} />
          <Outlines thickness={0.015} color={OUTLINE} />
        </mesh>
      </group>
    </group>
  );
}

function TowerBase() {
  const [gradientMap] = useState(getToonGradient);
  return (
    <group>
      <mesh position={[0, BASE_HEIGHT / 2, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[TOWER_RADIUS + 0.22, TOWER_RADIUS + 0.36, BASE_HEIGHT, 44]} />
        <meshToonMaterial color={MARBLE_SHADOW} gradientMap={gradientMap} />
        <Outlines thickness={0.02} color={OUTLINE} />
      </mesh>
      <mesh position={[0, BASE_HEIGHT + 0.02, 0]}>
        <cylinderGeometry args={[TOWER_RADIUS + 0.12, TOWER_RADIUS + 0.12, 0.06, 44]} />
        <meshToonMaterial color={TRIM} gradientMap={gradientMap} />
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
