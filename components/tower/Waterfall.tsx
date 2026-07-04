"use client";

import { PATH_ANGLE } from "@/lib/towerGeometry";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

const ROCK = "#7d766a";
const ROCK_DARK = "#6a6357";

/** Vertical white streaks on a translucent base; scrolling its offset makes
 * the sheet of water appear to fall. */
function makeWaterTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(190, 220, 240, 0.45)";
  ctx.fillRect(0, 0, 64, 256);
  for (let i = 0; i < 26; i++) {
    const x = ((i * 37) % 64) + Math.sin(i * 12.9898) * 4;
    const w = 1 + ((i * 13) % 3);
    const grd = ctx.createLinearGradient(0, 0, 0, 256);
    grd.addColorStop(0, "rgba(255,255,255,0)");
    grd.addColorStop(0.5, "rgba(255,255,255,0.85)");
    grd.addColorStop(1, "rgba(255,255,255,0.15)");
    ctx.fillStyle = grd;
    ctx.fillRect(x, 0, w, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1.4);
  return tex;
}

/** A rocky cliff with a falling sheet of water and a pool, set behind the
 * tower opposite the garden path. */
export function Waterfall() {
  const angle = PATH_ANGLE + Math.PI;
  const dist = 10;
  const px = Math.cos(angle) * dist;
  const pz = Math.sin(angle) * dist;
  // Face the cliff's local +Z back toward the tower at the origin.
  const rotY = Math.atan2(-Math.cos(angle), -Math.sin(angle));

  const [waterTex] = useState(() => makeWaterTexture());
  const waterMat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    const map = waterMat.current?.map;
    if (map) map.offset.y += delta * 0.55;
  });

  return (
    <group position={[px, 0, pz]} rotation={[0, rotY, 0]}>
      {/* Cliff wall and flanking boulders */}
      <mesh position={[0, 2.1, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[4.6, 4.4, 1.2]} />
        <meshStandardMaterial color={ROCK} roughness={0.95} />
      </mesh>
      <mesh position={[-2.4, 1.2, -0.5]} rotation={[0, 0.4, 0.1]} castShadow>
        <boxGeometry args={[1.6, 2.6, 1.4]} />
        <meshStandardMaterial color={ROCK_DARK} roughness={0.95} />
      </mesh>
      <mesh position={[2.4, 1.4, -0.5]} rotation={[0, -0.35, -0.08]} castShadow>
        <boxGeometry args={[1.7, 3, 1.4]} />
        <meshStandardMaterial color={ROCK_DARK} roughness={0.95} />
      </mesh>
      {/* Lip the water spills over */}
      <mesh position={[0, 4.28, -0.35]}>
        <boxGeometry args={[2, 0.24, 0.7]} />
        <meshStandardMaterial color={ROCK_DARK} roughness={0.95} />
      </mesh>

      {/* The falling sheet */}
      <mesh position={[0, 2.15, -0.14]}>
        <planeGeometry args={[1.7, 4.1]} />
        <meshBasicMaterial ref={waterMat} map={waterTex} transparent depthWrite={false} color="#e8f5ff" />
      </mesh>

      {/* Pool and foam at the base */}
      <mesh position={[0, 0.04, 0.9]}>
        <cylinderGeometry args={[1.6, 1.7, 0.08, 28]} />
        <meshStandardMaterial color="#66a8d8" roughness={0.25} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.09, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 20]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.55} depthWrite={false} />
      </mesh>
      {/* Mist puffs */}
      {[[-0.5, 0.35, 0.3], [0.45, 0.5, 0.25], [0, 0.7, 0.15]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <sphereGeometry args={[0.3 + i * 0.08, 10, 10]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.22} roughness={1} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}
