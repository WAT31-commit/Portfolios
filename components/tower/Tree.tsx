"use client";

import { getToonGradient } from "@/lib/toonGradient";
import { TOWER_RADIUS, TOWER_TOP_Y, TRIM } from "@/lib/towerGeometry";
import { EYE_END_FRACTION, EYE_START_FRACTION } from "@/lib/towerLayout";
import { Outlines } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0 || 1), 0, 1);
  return t * t * (3 - 2 * t);
}

const OUTLINE = "#160c29";
const FOLIAGE = "#5ec468";
const FOLIAGE_DEEP = "#379154";
const TRUNK = "#5a4126";

/** A platformed "tree of knowledge" that crowns the tower: a marble dais, a
 * gnarled trunk, a green canopy, and golden apples that glow as it grows in. */
export function Tree({ progress }: { progress: MotionValue<number> }) {
  const [gradientMap] = useState(getToonGradient);
  const group = useRef<THREE.Group>(null);
  const canopy = useRef<THREE.Group>(null);
  const glow = useRef<THREE.PointLight>(null);

  // A fixed scatter of foliage blobs and hanging apples around the crown.
  const foliage = useMemo(
    () => [
      { pos: [0, 1.15, 0] as const, r: 0.52, c: FOLIAGE },
      { pos: [0.42, 0.98, 0.12] as const, r: 0.38, c: FOLIAGE_DEEP },
      { pos: [-0.4, 1.0, -0.1] as const, r: 0.36, c: FOLIAGE_DEEP },
      { pos: [0.12, 1.05, 0.42] as const, r: 0.34, c: FOLIAGE },
      { pos: [-0.14, 1.02, -0.42] as const, r: 0.33, c: FOLIAGE },
      { pos: [0.0, 1.5, 0.0] as const, r: 0.34, c: FOLIAGE },
    ],
    [],
  );

  const apples = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2 + 0.4;
        const r = 0.5 + (i % 2) * 0.06;
        return [Math.cos(a) * r, 0.62 + ((i * 37) % 4) * 0.09, Math.sin(a) * r] as const;
      }),
    [],
  );

  useFrame((state) => {
    const p = progress.get();
    const grow = smoothstep(EYE_START_FRACTION, EYE_END_FRACTION, p);
    if (group.current) {
      group.current.scale.setScalar(Math.max(grow * 1.35, 0.0001));
    }
    if (canopy.current) {
      canopy.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.06;
    }
    if (glow.current) {
      glow.current.intensity = grow * (1.4 + Math.sin(state.clock.elapsedTime * 2) * 0.2);
    }
  });

  return (
    <group ref={group} position={[0, TOWER_TOP_Y, 0]}>
      {/* Marble dais with a gold rim */}
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <cylinderGeometry args={[TOWER_RADIUS + 0.34, TOWER_RADIUS + 0.42, 0.12, 40]} />
        <meshToonMaterial color="#f2ede2" gradientMap={gradientMap} />
        <Outlines thickness={0.02} color={OUTLINE} />
      </mesh>
      <mesh position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[TOWER_RADIUS + 0.36, 0.03, 10, 40]} />
        <meshToonMaterial color={TRIM} gradientMap={gradientMap} />
      </mesh>
      {/* Soil mound */}
      <mesh position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.28, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial color="#4a3a26" gradientMap={gradientMap} />
      </mesh>

      {/* Trunk */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.16, 0.85, 8]} />
        <meshToonMaterial color={TRUNK} gradientMap={gradientMap} />
        <Outlines thickness={0.02} color={OUTLINE} />
      </mesh>

      {/* Canopy + apples (sway together) */}
      <group ref={canopy} position={[0, 0.35, 0]}>
        {foliage.map((f, i) => (
          <mesh key={i} position={f.pos} castShadow>
            <icosahedronGeometry args={[f.r, 1]} />
            <meshToonMaterial color={f.c} gradientMap={gradientMap} />
            <Outlines thickness={0.02} color={OUTLINE} />
          </mesh>
        ))}
        {apples.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#ffd75e"
              emissive="#f0b526"
              emissiveIntensity={1.6}
              roughness={0.2}
              metalness={0.7}
            />
          </mesh>
        ))}
        <pointLight ref={glow} position={[0, 1.0, 0]} color="#ffcf66" intensity={0} distance={5} />
      </group>
    </group>
  );
}
