"use client";

/** A pale moon hanging in the purple night sky, with a soft halo for the
 * bloom pass to catch. */
export function Moon() {
  return (
    <group position={[-9, 13, -14]}>
      <mesh>
        <sphereGeometry args={[1.4, 24, 24]} />
        <meshBasicMaterial color="#f2ecff" toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.9, 20, 20]} />
        <meshBasicMaterial color="#c9b6ff" transparent opacity={0.25} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}
