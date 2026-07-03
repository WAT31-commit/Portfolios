"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const FLAG_COLORS = ["#e8574a", "#f5c168", "#5c9a6a", "#5a8ac9", "#c96bb0"];

/** A string of triangular party bunting, gently swaying. */
export function Bunting({
  from = [-1.6, 1.1, -0.3] as [number, number, number],
  to = [1.6, 1.1, -0.3] as [number, number, number],
  count = 7,
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.4) * 0.015;
  });

  const flags = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const x = from[0] + (to[0] - from[0]) * t;
    const y = from[1] + (to[1] - from[1]) * t - Math.sin(t * Math.PI) * 0.18;
    const z = from[2] + (to[2] - from[2]) * t;
    return { x, y, z, color: FLAG_COLORS[i % FLAG_COLORS.length] };
  });

  return (
    <group ref={group}>
      {flags.map((f, i) => (
        <mesh key={i} position={[f.x, f.y, f.z]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.09, 0.16, 3]} />
          <meshStandardMaterial color={f.color} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/** A small round table with a candle-topped cake — the birthday centerpiece. */
export function CakeTable({ position = [0, -0.5, 0] as [number, number, number] }) {
  const flame = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!flame.current) return;
    const t = state.clock.elapsedTime;
    flame.current.scale.setScalar(0.85 + Math.sin(t * 12) * 0.15);
  });

  return (
    <group position={position}>
      {/* Table */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.04, 20]} />
        <meshStandardMaterial color="#8a6a45" roughness={0.85} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
        <meshStandardMaterial color="#6b4a2f" roughness={0.85} />
      </mesh>
      {/* Cake tiers */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.22, 0.24, 0.16, 16]} />
        <meshStandardMaterial color="#e8c9a0" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.14, 16]} />
        <meshStandardMaterial color="#f0d9b8" roughness={0.7} />
      </mesh>
      {/* Candle */}
      <mesh position={[0, 0.53, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.12, 6]} />
        <meshStandardMaterial color="#e8574a" roughness={0.6} />
      </mesh>
      <mesh ref={flame} position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#ffcf6b" emissive="#ff9a3c" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}
