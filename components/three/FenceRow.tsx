"use client";

/** A simple post-and-rail wooden fence, repeated along the x-axis. */
export function FenceRow({
  count = 5,
  spacing = 0.6,
  z = 0,
  startX = -1.2,
}: {
  count?: number;
  spacing?: number;
  z?: number;
  startX?: number;
}) {
  const posts = Array.from({ length: count }, (_, i) => startX + i * spacing);
  const railLength = (count - 1) * spacing + 0.3;
  const railCenterX = startX + ((count - 1) * spacing) / 2;

  return (
    <group>
      {posts.map((x, i) => (
        <mesh key={i} position={[x, -0.55, z]} castShadow>
          <boxGeometry args={[0.06, 0.6, 0.06]} />
          <meshStandardMaterial color="#8a6a45" roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[railCenterX, -0.4, z]} rotation={[0, 0, 0]}>
        <boxGeometry args={[railLength, 0.05, 0.04]} />
        <meshStandardMaterial color="#9c7a52" roughness={0.9} />
      </mesh>
      <mesh position={[railCenterX, -0.65, z]} rotation={[0, 0, 0]}>
        <boxGeometry args={[railLength, 0.05, 0.04]} />
        <meshStandardMaterial color="#9c7a52" roughness={0.9} />
      </mesh>
    </group>
  );
}
