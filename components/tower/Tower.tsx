"use client";

import { levels, TOTAL_FLOORS } from "@/data/journey";
import { shade } from "@/lib/color";
import { LEVEL_LAYOUT, floorEndFraction, floorStartFraction } from "@/lib/towerLayout";
import {
  BASE_HEIGHT,
  BRICKS_PER_FLOOR,
  BRICK_HEIGHT,
  FLOOR_HEIGHT,
  TOWER_RADIUS,
} from "@/lib/towerGeometry";
import { useFrame } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function accentForFloor(floorIndex: number): string {
  const layout = LEVEL_LAYOUT.find((l) => floorIndex >= l.floorStart && floorIndex < l.floorEnd);
  const meta = levels.find((l) => l.id === layout?.id);
  return meta?.accent ?? "#c9a876";
}

interface BrickProps {
  floorIndex: number;
  brickIndex: number;
  progress: MotionValue<number>;
}

function Brick({ floorIndex, brickIndex, progress }: BrickProps) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (brickIndex / BRICKS_PER_FLOOR) * Math.PI * 2;
  const x = Math.cos(angle) * TOWER_RADIUS;
  const z = Math.sin(angle) * TOWER_RADIUS;
  const y = BASE_HEIGHT + floorIndex * FLOOR_HEIGHT + FLOOR_HEIGHT / 2;
  const width = ((2 * Math.PI * TOWER_RADIUS) / BRICKS_PER_FLOOR) * 0.99;

  const start = floorStartFraction(floorIndex);
  const end = floorEndFraction(floorIndex);
  const color = brickIndex % 2 === 0 ? accentForFloor(floorIndex) : shade(accentForFloor(floorIndex), -14);

  useFrame(() => {
    if (!ref.current) return;
    const floorReveal = THREE.MathUtils.clamp((progress.get() - start) / (end - start || 1), 0, 1);
    const brickReveal = THREE.MathUtils.clamp(floorReveal * BRICKS_PER_FLOOR - brickIndex, 0, 1);
    const eased = brickReveal * brickReveal * (3 - 2 * brickReveal);
    ref.current.scale.setScalar(Math.max(eased, 0.0001));
    ref.current.position.y = y - (1 - eased) * 0.35;
  });

  return (
    <mesh ref={ref} position={[x, y, z]} rotation={[0, -angle, 0]} castShadow receiveShadow>
      <boxGeometry args={[width, BRICK_HEIGHT, 0.4]} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
  );
}

function TowerCore({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  const start = floorStartFraction(0);
  const end = floorEndFraction(TOTAL_FLOORS - 1);

  useFrame(() => {
    if (!ref.current) return;
    const reveal = THREE.MathUtils.clamp((progress.get() - start) / (end - start || 1), 0, 1);
    const height = TOTAL_FLOORS * FLOOR_HEIGHT * reveal;
    ref.current.scale.y = Math.max(height, 0.001);
    ref.current.position.y = BASE_HEIGHT + height / 2;
  });

  // A solid inner wall behind the brick ring, so gaps between bricks never
  // reveal open sky straight through the hollow tower.
  return (
    <mesh ref={ref} receiveShadow>
      <cylinderGeometry args={[TOWER_RADIUS - 0.22, TOWER_RADIUS - 0.22, 1, 24]} />
      <meshStandardMaterial color="#6b5d48" roughness={0.95} />
    </mesh>
  );
}

function TowerBase() {
  return (
    <mesh position={[0, BASE_HEIGHT / 2, 0]} receiveShadow castShadow>
      <cylinderGeometry args={[TOWER_RADIUS + 0.35, TOWER_RADIUS + 0.5, BASE_HEIGHT, 28]} />
      <meshStandardMaterial color="#8a8478" roughness={0.95} />
    </mesh>
  );
}

export function Tower({ progress }: { progress: MotionValue<number> }) {
  const floors = Array.from({ length: TOTAL_FLOORS }, (_, i) => i);

  return (
    <group>
      <TowerBase />
      <TowerCore progress={progress} />
      {floors.map((floorIndex) =>
        Array.from({ length: BRICKS_PER_FLOOR }, (_, brickIndex) => (
          <Brick
            key={`${floorIndex}-${brickIndex}`}
            floorIndex={floorIndex}
            brickIndex={brickIndex}
            progress={progress}
          />
        ))
      )}
    </group>
  );
}
