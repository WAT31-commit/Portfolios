"use client";

import { EYE_Y } from "@/lib/towerGeometry";
import { EYE_END_FRACTION, EYE_START_FRACTION } from "@/lib/towerLayout";
import { useFrame } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0 || 1), 0, 1);
  return t * t * (3 - 2 * t);
}

export function Eye({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const upperLid = useRef<THREE.Mesh>(null);
  const lowerLid = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.PointLight>(null);

  const revealAt = EYE_START_FRACTION + (EYE_END_FRACTION - EYE_START_FRACTION) * 0.25;

  useFrame((state) => {
    const p = progress.get();
    const appear = smoothstep(EYE_START_FRACTION, revealAt, p);
    const open = smoothstep(revealAt, EYE_END_FRACTION, p);

    if (group.current) {
      group.current.scale.setScalar(Math.max(appear, 0.0001));
    }
    if (upperLid.current) {
      upperLid.current.position.y = 0.85 * open;
    }
    if (lowerLid.current) {
      lowerLid.current.position.y = -0.85 * open;
    }
    if (glow.current) {
      glow.current.intensity = open * 2.2 + Math.sin(state.clock.elapsedTime * 3) * 0.15 * open;
    }
  });

  return (
    <group ref={group} position={[0, EYE_Y, 0]}>
      {/* Eyeball */}
      <mesh>
        <sphereGeometry args={[0.85, 24, 24]} />
        <meshStandardMaterial color="#ece3d0" roughness={0.5} />
      </mesh>
      {/* Iris */}
      <mesh position={[0, 0, 0.72]}>
        <circleGeometry args={[0.4, 24]} />
        <meshStandardMaterial
          color="#ff8c42"
          emissive="#ff8c42"
          emissiveIntensity={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Pupil */}
      <mesh position={[0, 0, 0.76]}>
        <circleGeometry args={[0.16, 20]} />
        <meshStandardMaterial color="#160604" roughness={0.4} />
      </mesh>
      <pointLight ref={glow} position={[0, 0, 1.2]} color="#ff8c42" intensity={0} distance={8} />

      {/* Lids: carved-stone caps that slide apart to open */}
      <mesh ref={upperLid} position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.95, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#8a8478" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={lowerLid} position={[0, -0.05, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.95, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#8a8478" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
