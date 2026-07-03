"use client";

/** A seated figure, rendered as a pure-black unlit silhouette — writing at a desk, facing away toward the tower. */
export function SilhouetteFigure({ position = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position}>
      {/* Torso */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <capsuleGeometry args={[0.26, 0.55, 6, 12]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.12, 0]} castShadow>
        <sphereGeometry args={[0.17, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Writing arm, reaching forward to the desk */}
      <mesh position={[0.2, 0.65, 0.28]} rotation={[0.9, 0, -0.15]}>
        <capsuleGeometry args={[0.06, 0.4, 4, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Resting arm */}
      <mesh position={[-0.26, 0.5, 0.05]} rotation={[0.3, 0, 0.25]}>
        <capsuleGeometry args={[0.06, 0.35, 4, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Legs, seated */}
      <mesh position={[-0.13, 0.15, 0.2]} rotation={[1.2, 0, 0]}>
        <capsuleGeometry args={[0.09, 0.45, 4, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.13, 0.15, 0.2]} rotation={[1.2, 0, 0]}>
        <capsuleGeometry args={[0.09, 0.45, 4, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}
