"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function generateBasePositions(count: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 10;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }
  return arr;
}

function generateSpeeds(count: number) {
  const arr = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    arr[i] = 0.1 + Math.random() * 0.25;
  }
  return arr;
}

function Particles({ color, count }: { color: string; count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Lazy useState initializers run exactly once per mount, which is the
  // correct place for one-time randomness (unlike useMemo, which React may
  // discard and recompute even when deps are unchanged — and which ESLint's
  // react-hooks/purity rule flags as an impure render).
  const [basePositions] = useState(() => generateBasePositions(count));
  const [livePositions] = useState(() => basePositions.slice());
  const [speeds] = useState(() => generateSpeeds(count));

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      // Offsets are derived from elapsed time relative to each particle's
      // fixed base position (not accumulated per-frame), so the motion looks
      // identical regardless of the display's refresh rate.
      posAttr.array[i * 3 + 1] = basePositions[i * 3 + 1] + Math.sin(t * speeds[i] + i) * 0.15;
      posAttr.array[i * 3] = basePositions[i * 3] + Math.cos(t * speeds[i] * 0.5 + i) * 0.06;
    }
    posAttr.needsUpdate = true;
    points.rotation.y = t * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[livePositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

export function Embers({
  color = "#f5c168",
  count = 220,
  className = "",
}: {
  color?: string;
  count?: number;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Particles color={color} count={count} />
      </Canvas>
    </div>
  );
}
