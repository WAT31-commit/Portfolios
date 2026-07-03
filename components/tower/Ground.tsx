"use client";

export function Ground() {
  return (
    <group>
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.4, 40]} />
        <meshStandardMaterial color="#9a8f74" roughness={0.95} />
      </mesh>
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[40, 48]} />
        <meshStandardMaterial color="#3d5c3a" roughness={1} />
      </mesh>
    </group>
  );
}
