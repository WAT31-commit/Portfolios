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
  walking = false,
}: {
  scale?: number;
  idle?: boolean;
  /** Continuous walking-stick gait — boots step and the staff taps the ground, as if trekking along a road. */
  walking?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const staff = useRef<THREE.Group>(null);
  const bootL = useRef<THREE.Mesh>(null);
  const bootR = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (idle && group.current) {
      group.current.position.y = Math.sin(t * 2) * 0.04;
      group.current.rotation.z = Math.sin(t * 1.3) * 0.025;
    }

    if (walking) {
      const stride = t * 5;
      if (group.current) {
        group.current.position.y = Math.abs(Math.sin(stride)) * 0.05;
        group.current.rotation.z = Math.sin(stride * 0.5) * 0.04;
      }
      if (staff.current) {
        staff.current.rotation.x = Math.sin(stride + Math.PI) * 0.18;
      }
      if (bootL.current) {
        bootL.current.position.z = Math.sin(stride) * 0.14;
        bootL.current.position.y = -0.72 + Math.max(0, Math.sin(stride)) * 0.06;
      }
      if (bootR.current) {
        bootR.current.position.z = Math.sin(stride + Math.PI) * 0.14;
        bootR.current.position.y = -0.72 + Math.max(0, Math.sin(stride + Math.PI)) * 0.06;
      }
    }
  });

  return (
    <group ref={group} scale={scale}>
      {/* Boots (peek out from under the robe hem when walking) */}
      <mesh ref={bootL} position={[-0.16, -0.72, 0]} castShadow>
        <boxGeometry args={[0.14, 0.12, 0.24]} />
        <meshStandardMaterial color="#3a3630" roughness={0.9} />
      </mesh>
      <mesh ref={bootR} position={[0.16, -0.72, 0]} castShadow>
        <boxGeometry args={[0.14, 0.12, 0.24]} />
        <meshStandardMaterial color="#3a3630" roughness={0.9} />
      </mesh>
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
      {/* Arm/sleeve, reaching out to grip the staff */}
      <mesh position={[0.24, 0.42, 0.1]} rotation={[0, 0, -0.7]}>
        <cylinderGeometry args={[0.055, 0.065, 0.4, 8]} />
        <meshStandardMaterial color="#6b6f76" roughness={0.85} />
      </mesh>
      <mesh position={[0.36, 0.28, 0.13]}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshStandardMaterial color="#d9c3a3" roughness={0.6} />
      </mesh>
      {/* Staff (pivots at the grip when walking, like a walking stick) */}
      <group ref={staff} position={[0.36, 0.55, 0.13]}>
        <mesh position={[0, -0.25, 0]} rotation={[0, 0, -0.05]}>
          <cylinderGeometry args={[0.025, 0.03, 1.7, 8]} />
          <meshStandardMaterial color="#5c4a36" roughness={0.9} />
        </mesh>
        {/* Staff orb */}
        <mesh position={[0.02, 0.6, 0]}>
          <icosahedronGeometry args={[0.09, 0]} />
          <meshStandardMaterial
            color="#f5e6b8"
            emissive="#f5c168"
            emissiveIntensity={0.6}
            roughness={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}
