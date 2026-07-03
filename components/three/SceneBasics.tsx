"use client";

/** Shared ground plane + lighting rig reused across the Shire milestone scenes. */
export function SceneLighting({ warm = false }: { warm?: boolean }) {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={warm ? 1.3 : 1.1}
        color={warm ? "#ffd9a0" : "#fff6e0"}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#a8c8ff" />
    </>
  );
}

export function Ground({ color = "#4a7a3a", z = 0 }: { color?: string; z?: number }) {
  return (
    <mesh position={[0, -0.85, z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[14, 8]} />
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
  );
}
