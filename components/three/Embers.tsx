"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles({ color, count }: { color: string; count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [count]);

  const speeds = useMemo(
    () => new Float32Array(Array.from({ length: count }, () => 0.1 + Math.random() * 0.25)),
    [count]
  );

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const baseY = posAttr.array[i * 3 + 1] as number;
      posAttr.array[i * 3 + 1] = baseY + Math.sin(t * speeds[i] + i) * 0.0015;
      posAttr.array[i * 3] += Math.cos(t * speeds[i] * 0.5 + i) * 0.0006;
    }
    posAttr.needsUpdate = true;
    points.rotation.y = t * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
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
