"use client";

import { GandalfMesh } from "@/components/three/GandalfMesh";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function progressBetween(elapsed: number, start: number, end: number) {
  if (elapsed <= start) return 0;
  if (elapsed >= end) return 1;
  return easeInOutCubic((elapsed - start) / (end - start));
}

function DoorScene({ entered }: { entered: boolean }) {
  const doorHinge = useRef<THREE.Group>(null);
  const traveler = useRef<THREE.Group>(null);
  const startedAt = useRef<number | null>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (entered && startedAt.current === null) startedAt.current = t;
    const elapsed = startedAt.current === null ? 0 : t - startedAt.current;

    // Door swings open on its hinge, receding away from the camera and
    // out of the archway (positive Y rotation on a hinge at the door's
    // left edge swings its outer edge back into the doorway).
    const doorOpen = progressBetween(elapsed, 0.2, 1.3);
    if (doorHinge.current) {
      doorHinge.current.rotation.y = doorOpen * 1.55;
    }

    // The traveler walks up to the doorway, then shrinks away as if
    // stepping through into the Shire.
    const walkUp = progressBetween(elapsed, 0.7, 2.1);
    const stepThrough = progressBetween(elapsed, 2.1, 2.7);
    if (traveler.current) {
      traveler.current.position.z = THREE.MathUtils.lerp(1.6, 0.35, walkUp);
      traveler.current.position.x = THREE.MathUtils.lerp(-1.1, 0, walkUp);
      const isWalking = walkUp > 0 && walkUp < 1;
      const walkBob = isWalking ? Math.sin(t * 6) * 0.04 : 0;
      traveler.current.position.y = -0.53 + walkBob;
      const scale = walkUp < 1 ? 0.6 : THREE.MathUtils.lerp(0.6, 0, stepThrough);
      traveler.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={[0, -0.15, 0]}>
      {/* Grass mound / ground */}
      <mesh position={[0, -1.05, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.6, 24]} />
        <meshStandardMaterial color="#2f4a2c" roughness={1} />
      </mesh>
      <mesh position={[0, -0.98, 0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 0.9]} />
        <meshStandardMaterial color="#7a6a4d" roughness={1} />
      </mesh>

      {/* Hillside wall behind the arch */}
      <mesh position={[0, 0.3, -0.35]}>
        <boxGeometry args={[3.2, 2.6, 0.4]} />
        <meshStandardMaterial color="#c9b989" roughness={0.95} />
      </mesh>
      {/* Overgrown thatch mounds on top */}
      <mesh position={[-0.6, 1.55, -0.2]}>
        <sphereGeometry args={[0.55, 12, 10]} />
        <meshStandardMaterial color="#3a5a34" roughness={1} />
      </mesh>
      <mesh position={[0.65, 1.6, -0.2]}>
        <sphereGeometry args={[0.6, 12, 10]} />
        <meshStandardMaterial color="#31502c" roughness={1} />
      </mesh>
      <mesh position={[0, 1.75, -0.15]}>
        <sphereGeometry args={[0.5, 12, 10]} />
        <meshStandardMaterial color="#3d6038" roughness={1} />
      </mesh>

      {/* Round side windows */}
      {[-1.15, 1.15].map((x) => (
        <group key={x} position={[x, 0.4, -0.12]}>
          <mesh>
            <torusGeometry args={[0.22, 0.045, 8, 20]} />
            <meshStandardMaterial color="#8a4a2e" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0, -0.02]}>
            <circleGeometry args={[0.19, 20]} />
            <meshStandardMaterial color="#9fbccf" roughness={0.3} metalness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Brick archway frame */}
      <mesh position={[0, 0.15, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.98, 0.16, 10, 28, Math.PI]} />
        <meshStandardMaterial color="#a1512f" roughness={0.9} />
      </mesh>
      <mesh position={[-0.98, -0.55, 0]}>
        <boxGeometry args={[0.32, 1.4, 0.32]} />
        <meshStandardMaterial color="#a1512f" roughness={0.9} />
      </mesh>
      <mesh position={[0.98, -0.55, 0]}>
        <boxGeometry args={[0.32, 1.4, 0.32]} />
        <meshStandardMaterial color="#a1512f" roughness={0.9} />
      </mesh>

      {/* Round green door, swinging open on a hinge at its left edge */}
      <group ref={doorHinge} position={[-0.78, 0.15, 0.05]}>
        <mesh position={[0.78, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.12, 28]} />
          <meshStandardMaterial color="#2f6b53" roughness={0.7} />
        </mesh>
        <mesh position={[0.78, 0, 0.07]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#d8b25a" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>

      {/* Grass tufts along the base */}
      {[-1.8, -1.3, 1.3, 1.8, 2.1].map((x, i) => (
        <mesh key={x} position={[x, -0.85, 0.3 + (i % 2) * 0.2]} rotation={[0, 0, (i % 2 ? 1 : -1) * 0.15]}>
          <coneGeometry args={[0.08, 0.35, 6]} />
          <meshStandardMaterial color="#4a7a3f" roughness={1} />
        </mesh>
      ))}

      {/* The traveler approaching the door */}
      <group ref={traveler} position={[-1.1, -0.53, 1.6]} scale={0.6}>
        <GandalfMesh idle={false} />
      </group>
    </group>
  );
}

export function ShireDoorScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setEntered(true);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="mx-auto mb-4 h-56 w-full max-w-md sm:h-64">
      <Canvas
        camera={{ position: [0, 0.3, 4.2], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[2, 3, 3]} intensity={1.3} />
        <directionalLight position={[-2, 1, 2]} intensity={0.4} />
        <DoorScene entered={entered} />
      </Canvas>
    </div>
  );
}
