"use client";

import { getToonGradient } from "@/lib/toonGradient";
import { PATH_ANGLE } from "@/lib/towerGeometry";
import { Outlines } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

const OUTLINE = "#160c29";
const STONE = "#d9d0ea";
const STONE_DARK = "#c2b6dd";
const WATER = "#3d6fb8";
const BUSH_GREENS = ["#3f9152", "#4fab5f", "#2f7a44"];
const CANOPY_GREENS = ["#57b563", "#3f9c56", "#6bc76e"];
const TRUNK = "#5a4126";
const IRON = "#211d33";

/** Flat stone slabs marching out from the stairway to the garden's edge,
 * skipping the span where the bridge carries the path over the moat. */
function Pathway() {
  const [gradientMap] = useState(getToonGradient);
  const slabs = [2.1, 4.15, 5.05, 5.95, 6.85, 7.75].map((x, i) => ({
    x,
    rot: (i % 2 === 0 ? 1 : -1) * 0.05,
    w: 0.82 + (i % 3) * 0.06,
  }));
  return (
    <group>
      {slabs.map((s, i) => (
        <mesh key={i} position={[s.x, 0.02, 0]} rotation={[0, s.rot, 0]} receiveShadow>
          <boxGeometry args={[s.w, 0.05, 1.15]} />
          <meshToonMaterial color={i % 2 === 0 ? STONE : STONE_DARK} gradientMap={gradientMap} />
        </mesh>
      ))}
    </group>
  );
}

/** The lake under the falls, the river running to the tower, and the moat
 * ring the river feeds around the piazza. All in path-local coordinates —
 * the waterfall sits at local -X, the path runs along +X. */
function Waterways() {
  const water = <meshStandardMaterial color={WATER} roughness={0.2} transparent opacity={0.88} />;
  return (
    <group>
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.0, 3.7, 64]} />
        {water}
      </mesh>
      <mesh position={[-5.7, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.6, 1.3]} />
        {water}
      </mesh>
      <mesh position={[-8.6, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.5, 40]} />
        {water}
      </mesh>
    </group>
  );
}

/** A gently arched stone footbridge carrying the path over the moat. */
function Bridge() {
  const [gradientMap] = useState(getToonGradient);
  const R = 1.5;
  const segs = [-0.32, -0.16, 0, 0.16, 0.32];
  return (
    <group position={[3.35, 0, 0]}>
      {segs.map((a, i) => (
        <group key={i} position={[Math.sin(a) * R, 0.17 + (Math.cos(a) - 1) * R, 0]} rotation={[0, 0, -a]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.34, 0.06, 1.2]} />
            <meshToonMaterial color="#efe9f7" gradientMap={gradientMap} />
            <Outlines thickness={0.015} color={OUTLINE} />
          </mesh>
          {[-0.63, 0.63].map((z) => (
            <mesh key={z} position={[0, 0.12, z]} castShadow>
              <boxGeometry args={[0.34, 0.16, 0.07]} />
              <meshToonMaterial color="#d9cfe8" gradientMap={gradientMap} />
              <Outlines thickness={0.015} color={OUTLINE} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/** Three marble steps climbing from the path up to the tower's base. */
function Stairway() {
  const [gradientMap] = useState(getToonGradient);
  const steps = [
    { x: 1.7, top: 0.12 },
    { x: 1.4, top: 0.24 },
    { x: 1.1, top: 0.36 },
  ];
  return (
    <group>
      {steps.map((s, i) => (
        <mesh key={i} position={[s.x, s.top / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.32, s.top, 1.25]} />
          <meshToonMaterial color="#eee7f6" gradientMap={gradientMap} />
          <Outlines thickness={0.015} color={OUTLINE} />
        </mesh>
      ))}
    </group>
  );
}

function Bush({ position, scale, shade }: { position: [number, number, number]; scale: number; shade: string }) {
  const [gradientMap] = useState(getToonGradient);
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.16, 0]} castShadow>
        <icosahedronGeometry args={[0.24, 1]} />
        <meshToonMaterial color={shade} gradientMap={gradientMap} />
        <Outlines thickness={0.02} color={OUTLINE} />
      </mesh>
      <mesh position={[0.16, 0.1, 0.08]} castShadow>
        <icosahedronGeometry args={[0.15, 1]} />
        <meshToonMaterial color={BUSH_GREENS[2]} gradientMap={gradientMap} />
        <Outlines thickness={0.02} color={OUTLINE} />
      </mesh>
    </group>
  );
}

function GardenTree({ position, scale, shade }: { position: [number, number, number]; scale: number; shade: string }) {
  const [gradientMap] = useState(getToonGradient);
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.09, 0.9, 7]} />
        <meshToonMaterial color={TRUNK} gradientMap={gradientMap} />
        <Outlines thickness={0.02} color={OUTLINE} />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow>
        <icosahedronGeometry args={[0.45, 1]} />
        <meshToonMaterial color={shade} gradientMap={gradientMap} />
        <Outlines thickness={0.02} color={OUTLINE} />
      </mesh>
      <mesh position={[0.28, 0.85, 0.1]} castShadow>
        <icosahedronGeometry args={[0.28, 1]} />
        <meshToonMaterial color={CANOPY_GREENS[1]} gradientMap={gradientMap} />
        <Outlines thickness={0.02} color={OUTLINE} />
      </mesh>
      <mesh position={[-0.25, 0.9, -0.12]} castShadow>
        <icosahedronGeometry args={[0.26, 1]} />
        <meshToonMaterial color={CANOPY_GREENS[2]} gradientMap={gradientMap} />
        <Outlines thickness={0.02} color={OUTLINE} />
      </mesh>
    </group>
  );
}

function LampPost({ position }: { position: [number, number, number] }) {
  const [gradientMap] = useState(getToonGradient);
  return (
    <group position={position}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.028, 0.05, 1.4, 8]} />
        <meshToonMaterial color={IRON} gradientMap={gradientMap} />
        <Outlines thickness={0.015} color={OUTLINE} />
      </mesh>
      <mesh position={[0, 1.44, 0]}>
        <sphereGeometry args={[0.085, 12, 12]} />
        <meshStandardMaterial color="#fff0c0" emissive="#ffd876" emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <coneGeometry args={[0.12, 0.12, 8]} />
        <meshToonMaterial color={IRON} gradientMap={gradientMap} />
        <Outlines thickness={0.015} color={OUTLINE} />
      </mesh>
      <pointLight position={[0, 1.42, 0]} color="#ffd876" intensity={0.9} distance={3.5} />
    </group>
  );
}

/** Warm glowing specks drifting slow Lissajous loops around the garden. */
function Fireflies() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const seeds = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        cx: Math.cos(i * 2.39) * (3 + (i % 4)),
        cz: Math.sin(i * 2.39) * (3 + (i % 4)),
        y: 0.5 + (i % 5) * 0.3,
        ax: 0.6 + (i % 3) * 0.3,
        az: 0.7 + (i % 5) * 0.2,
        sp: 0.35 + (i % 3) * 0.18,
        ph: i * 1.7,
      })),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    seeds.forEach((s, i) => {
      const m = refs.current[i];
      if (!m) return;
      m.position.set(
        s.cx + Math.sin(t * s.sp + s.ph) * s.ax,
        s.y + Math.sin(t * s.sp * 1.3 + s.ph * 2) * 0.35,
        s.cz + Math.cos(t * s.sp * 0.8 + s.ph) * s.az,
      );
      (m.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.8 + Math.sin(t * 2.5 + s.ph) * 1.4;
    });
  });

  return (
    <>
      {seeds.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#fff3b0" emissive="#ffd94d" emissiveIntensity={2} />
        </mesh>
      ))}
    </>
  );
}

/** The grounds around the tower: a slab path with a stairway up to the base,
 * bushes flanking the path, scattered trees, lampposts, and fireflies. */
export function Garden() {
  // Bush rows flank the path but skip the moat band (radius ~3.0-3.7).
  const bushes: { position: [number, number, number]; scale: number; shade: string }[] = [];
  [2.35, 4.3, 5.1, 5.9, 6.7, 7.5].forEach((x, i) => {
    bushes.push(
      { position: [x, 0, 0.95 + (i % 2) * 0.15], scale: 0.9 + (i % 3) * 0.2, shade: BUSH_GREENS[i % 3] },
      { position: [x + 0.4, 0, -(0.95 + ((i + 1) % 2) * 0.15)], scale: 0.85 + ((i + 1) % 3) * 0.2, shade: BUSH_GREENS[(i + 1) % 3] },
    );
  });

  return (
    <group>
      {/* Everything path-aligned lives in a group rotated to the path angle. */}
      <group rotation={[0, -PATH_ANGLE, 0]}>
        <Waterways />
        <Bridge />
        <Pathway />
        <Stairway />
        {bushes.map((b, i) => (
          <Bush key={i} {...b} />
        ))}
        <LampPost position={[4.5, 0, 1.35]} />
        <LampPost position={[5.8, 0, -1.35]} />
        <GardenTree position={[4.4, 0, 2.9]} scale={1.5} shade={CANOPY_GREENS[0]} />
        <GardenTree position={[6.8, 0, -3.1]} scale={1.7} shade={CANOPY_GREENS[1]} />
        <GardenTree position={[3.4, 0, -3.6]} scale={1.2} shade={CANOPY_GREENS[2]} />
        <GardenTree position={[7.6, 0, 3.4]} scale={1.4} shade={CANOPY_GREENS[1]} />
        <GardenTree position={[-4.6, 0, 3.2]} scale={1.6} shade={CANOPY_GREENS[0]} />
      </group>
      <Fireflies />
    </group>
  );
}
