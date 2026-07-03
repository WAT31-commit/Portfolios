"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function useSmokeFrame(ref: React.RefObject<THREE.Mesh | null>, origin: [number, number, number], phase: number) {
  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime + phase * 1.1) % 3.3;
    ref.current.position.y = origin[1] + t * 0.35;
    ref.current.position.x = origin[0] + Math.sin(t * 1.5 + phase) * 0.08;
    ref.current.scale.setScalar(0.12 + t * 0.06);
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.opacity = Math.max(0, 0.55 - t * 0.17);
  });
}

function SmokePuffs({ origin }: { origin: [number, number, number] }) {
  const puffA = useRef<THREE.Mesh>(null);
  const puffB = useRef<THREE.Mesh>(null);
  const puffC = useRef<THREE.Mesh>(null);
  useSmokeFrame(puffA, origin, 0);
  useSmokeFrame(puffB, origin, 1);
  useSmokeFrame(puffC, origin, 2);

  return (
    <>
      <mesh ref={puffA} position={origin}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#d8d4cc" transparent opacity={0.5} roughness={1} />
      </mesh>
      <mesh ref={puffB} position={origin}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#d8d4cc" transparent opacity={0.5} roughness={1} />
      </mesh>
      <mesh ref={puffC} position={origin}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#d8d4cc" transparent opacity={0.5} roughness={1} />
      </mesh>
    </>
  );
}

/**
 * A round-doored cottage built into a grassy hill — the mound is a squashed
 * sphere sunk into the ground so only a green dome pokes up behind a flat
 * stone facade (holding the door and windows), with a smoking chimney
 * rising from the roofline.
 */
export function HillCottage({ position = [0, -0.1, -1.1] as [number, number, number] }) {
  return (
    <group position={position}>
      {/* Hill mound, set back behind the facade */}
      <mesh position={[0, -0.5, -0.3]} scale={[2.3, 1.0, 0.85]} castShadow receiveShadow>
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial color="#3f7a3a" roughness={1} />
      </mesh>
      {/* Stone facade */}
      <mesh position={[0, -0.45, 0.68]}>
        <boxGeometry args={[1.7, 1.15, 0.16]} />
        <meshStandardMaterial color="#a68a63" roughness={0.9} />
      </mesh>
      {/* Round door */}
      <mesh position={[0, -0.62, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.07, 20]} />
        <meshStandardMaterial color="#3a7a52" roughness={0.7} />
      </mesh>
      {/* Door knob */}
      <mesh position={[0.2, -0.62, 0.85]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#e8c96a" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Windows */}
      {[-0.55, 0.55].map((x, i) => (
        <group key={i} position={[x, -0.05, 0.8]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
            <meshStandardMaterial color="#cfe4f0" emissive="#f5c168" emissiveIntensity={0.25} roughness={0.4} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.03]}>
            <torusGeometry args={[0.15, 0.02, 8, 16]} />
            <meshStandardMaterial color="#5c4a36" roughness={0.8} />
          </mesh>
        </group>
      ))}
      {/* Chimney, rising from the back of the hill roofline */}
      <mesh position={[0.8, 0.35, -0.5]}>
        <boxGeometry args={[0.18, 0.5, 0.18]} />
        <meshStandardMaterial color="#8a7a6a" roughness={0.9} />
      </mesh>
      <SmokePuffs origin={[0.8, 0.62, -0.5]} />
    </group>
  );
}
