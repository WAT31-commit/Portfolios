"use client";

import {
  STUDY_DESK_Z,
  STUDY_FIGURE_Z,
  STUDY_WALL_Z,
  STUDY_WINDOW_Z,
} from "@/lib/towerGeometry";
import { EYE_END_FRACTION, OUTRO_CAMERA_DONE_FRACTION } from "@/lib/towerLayout";
import { useFrame } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";
import { SilhouetteFigure } from "./SilhouetteFigure";

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0 || 1), 0, 1);
  return t * t * (3 - 2 * t);
}

function WindowFrame() {
  const w = 3.2;
  const h = 4.2;
  const t = 0.14;
  return (
    <group position={[0, 2.1, STUDY_WINDOW_Z]}>
      <mesh position={[-w / 2, 0, 0]}>
        <boxGeometry args={[t, h, t]} />
        <meshStandardMaterial color="#3a2d20" roughness={0.8} />
      </mesh>
      <mesh position={[w / 2, 0, 0]}>
        <boxGeometry args={[t, h, t]} />
        <meshStandardMaterial color="#3a2d20" roughness={0.8} />
      </mesh>
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[w + t, t, t]} />
        <meshStandardMaterial color="#3a2d20" roughness={0.8} />
      </mesh>
      <mesh position={[0, -h / 2, 0]}>
        <boxGeometry args={[w + t, t, t]} />
        <meshStandardMaterial color="#3a2d20" roughness={0.8} />
      </mesh>
      <mesh>
        <boxGeometry args={[t * 0.6, h, t * 0.6]} />
        <meshStandardMaterial color="#3a2d20" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Desk() {
  return (
    <group position={[0, 0, STUDY_DESK_Z]}>
      <mesh position={[0, 0.62, 0]} castShadow>
        <boxGeometry args={[1.5, 0.06, 0.7]} />
        <meshStandardMaterial color="#4a3220" roughness={0.7} />
      </mesh>
      {[-0.65, 0.65].map((x) => (
        <mesh key={x} position={[x, 0.31, 0]}>
          <boxGeometry args={[0.08, 0.62, 0.6]} />
          <meshStandardMaterial color="#3a2717" roughness={0.8} />
        </mesh>
      ))}
      {/* Open book */}
      <group position={[0, 0.66, -0.05]} rotation={[0, 0.1, 0]}>
        <mesh position={[-0.14, 0, 0]} rotation={[-0.15, 0.25, 0]}>
          <planeGeometry args={[0.28, 0.2]} />
          <meshStandardMaterial color="#eee5cf" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0.14, 0, 0]} rotation={[-0.15, -0.25, 0]}>
          <planeGeometry args={[0.28, 0.2]} />
          <meshStandardMaterial color="#eee5cf" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
      </group>
      {/* Lamp */}
      <group position={[0.55, 0.62, -0.2]}>
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.36, 6]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <coneGeometry args={[0.12, 0.16, 12, 1, true]} />
          <meshStandardMaterial color="#d9c48f" emissive="#f5c168" emissiveIntensity={0.4} side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[0, 0.32, 0]} color="#f5c168" intensity={1.4} distance={3} />
      </group>
    </group>
  );
}

function Chair() {
  return (
    <group position={[0, 0, STUDY_FIGURE_Z + 0.55]}>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[0.55, 0.06, 0.5]} />
        <meshStandardMaterial color="#2f2318" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.75, -0.22]}>
        <boxGeometry args={[0.55, 0.7, 0.06]} />
        <meshStandardMaterial color="#2f2318" roughness={0.85} />
      </mesh>
      {[-0.22, 0.22].map((x) =>
        [-0.2, 0.2].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.2, z]}>
            <cylinderGeometry args={[0.025, 0.025, 0.4, 6]} />
            <meshStandardMaterial color="#2f2318" roughness={0.85} />
          </mesh>
        ))
      )}
    </group>
  );
}

function Bookshelf({ x }: { x: number }) {
  return (
    <group position={[x, 0, STUDY_WALL_Z - 1.4]}>
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[1, 2.2, 0.4]} />
        <meshStandardMaterial color="#2a1e14" roughness={0.9} />
      </mesh>
      {[0.5, 1.0, 1.5, 2.0].map((y) => (
        <mesh key={y} position={[0, y, 0.21]}>
          <boxGeometry args={[0.92, 0.04, 0.02]} />
          <meshStandardMaterial color="#4a3220" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function BackWall() {
  return (
    <mesh position={[0, 3, STUDY_WALL_Z]} receiveShadow>
      <planeGeometry args={[16, 8]} />
      <meshStandardMaterial color="#3a1f22" roughness={0.95} />
    </mesh>
  );
}

function StudyFloor() {
  return (
    <mesh position={[0, 0, STUDY_FIGURE_Z + 1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[10, 8]} />
      <meshStandardMaterial color="#3a2a1c" roughness={0.9} />
    </mesh>
  );
}

export function StudyRoom({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const appear = smoothstep(EYE_END_FRACTION, OUTRO_CAMERA_DONE_FRACTION, progress.get());
    group.current.scale.setScalar(Math.max(appear, 0.0001));
  });

  return (
    <group ref={group}>
      <BackWall />
      <StudyFloor />
      <Bookshelf x={-3.6} />
      <Bookshelf x={3.6} />
      <WindowFrame />
      <Desk />
      <Chair />
      <SilhouetteFigure position={[0, 0, STUDY_FIGURE_Z]} />
    </group>
  );
}
