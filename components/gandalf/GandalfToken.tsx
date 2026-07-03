"use client";

import { GandalfMesh } from "@/components/three/GandalfMesh";
import { Canvas } from "@react-three/fiber";

export function GandalfToken({
  className = "",
  walking = false,
}: {
  className?: string;
  walking?: boolean;
}) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.35, 2.6], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} />
        <GandalfMesh scale={0.85} walking={walking} idle={!walking} />
      </Canvas>
    </div>
  );
}
