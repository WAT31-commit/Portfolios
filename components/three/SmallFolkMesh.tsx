"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

/**
 * A low-poly procedural small folk — short, round-bellied, bare curly-haired
 * head, big bare feet, no shoes. Built from the same primitive-geometry
 * vocabulary as GandalfMesh so the two read as one consistent world.
 */
export function SmallFolkMesh({
  scale = 1,
  idle = true,
  waving = false,
}: {
  scale?: number;
  idle?: boolean;
  /** Raises one arm in a slow wave, for greeting/celebration poses. */
  waving?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const arm = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (idle && group.current) {
      group.current.position.y = Math.sin(t * 2.4) * 0.03;
    }
    if (waving && arm.current) {
      arm.current.rotation.z = 2.1 + Math.sin(t * 4) * 0.35;
    }
  });

  return (
    <group ref={group} scale={scale}>
      {/* Feet (bare) */}
      <mesh position={[-0.13, -0.42, 0.04]} castShadow>
        <boxGeometry args={[0.16, 0.1, 0.26]} />
        <meshStandardMaterial color="#c79a6b" roughness={0.9} />
      </mesh>
      <mesh position={[0.13, -0.42, 0.04]} castShadow>
        <boxGeometry args={[0.16, 0.1, 0.26]} />
        <meshStandardMaterial color="#c79a6b" roughness={0.9} />
      </mesh>
      {/* Legs / trousers */}
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[0.24, 0.22, 0.28, 12]} />
        <meshStandardMaterial color="#8a6a45" roughness={0.85} />
      </mesh>
      {/* Belly / waistcoat */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color="#c96b4a" roughness={0.75} />
      </mesh>
      {/* Shirt collar ring */}
      <mesh position={[0, 0.32, 0]}>
        <torusGeometry args={[0.15, 0.03, 8, 16]} />
        <meshStandardMaterial color="#e8dcc4" roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.48, 0]}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshStandardMaterial color="#e0b98f" roughness={0.6} />
      </mesh>
      {/* Curly hair (small clustered spheres) */}
      {[
        [-0.1, 0.62, 0.08],
        [0.1, 0.62, 0.08],
        [0, 0.66, 0.02],
        [-0.15, 0.55, -0.05],
        [0.15, 0.55, -0.05],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#6b4a2f" roughness={0.95} />
        </mesh>
      ))}
      {/* Ears */}
      <mesh position={[-0.23, 0.46, 0]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.05, 0.12, 8]} />
        <meshStandardMaterial color="#e0b98f" roughness={0.6} />
      </mesh>
      <mesh position={[0.23, 0.46, 0]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.05, 0.12, 8]} />
        <meshStandardMaterial color="#e0b98f" roughness={0.6} />
      </mesh>
      {/* Waving arm */}
      <group ref={arm} position={[0.28, 0.2, 0]}>
        <mesh position={[0, -0.14, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.28, 8]} />
          <meshStandardMaterial color="#c96b4a" roughness={0.8} />
        </mesh>
      </group>
      {/* Still arm */}
      <mesh position={[-0.28, 0.02, 0]} rotation={[0, 0, 0.25]}>
        <cylinderGeometry args={[0.05, 0.05, 0.26, 8]} />
        <meshStandardMaterial color="#c96b4a" roughness={0.8} />
      </mesh>
    </group>
  );
}
