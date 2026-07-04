"use client";

import { LevelId } from "@/lib/types";
import { Canvas } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { CameraRig } from "./CameraRig";
import { Clouds } from "./Clouds";
import { Garden } from "./Garden";
import { Ground } from "./Ground";
import { StudyRoom } from "./StudyRoom";
import { Tower } from "./Tower";
import { TowerMarkers } from "./TowerMarkers";
import { Tree } from "./Tree";
import { Waterfall } from "./Waterfall";

const TOWER_CLOUD_HEIGHT = 6.5;

export function TowerScene({
  progress,
  selectedLevelId,
  onSelectLevel,
}: {
  progress: MotionValue<number>;
  selectedLevelId: LevelId | null;
  onSelectLevel: (id: LevelId) => void;
}) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas shadows camera={{ fov: 45, near: 0.1, far: 100 }} dpr={[1, 1.6]}>
        {/* Sunny day: blue sky, warm sun, soft sky fill */}
        <color attach="background" args={["#a2c8ec"]} />
        <fog attach="fog" args={["#b4d2ec", 14, 46]} />
        <ambientLight intensity={0.85} color="#ffffff" />
        <hemisphereLight args={["#dff0ff", "#6b8f4e", 0.8]} />
        <directionalLight
          position={[8, 12, 5]}
          intensity={2}
          color="#fff3d6"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-7, 4, -5]} intensity={0.35} color="#bcd4f0" />

        <Ground />
        <Garden />
        <Waterfall />
        <Tower progress={progress} />
        <TowerMarkers progress={progress} selectedLevelId={selectedLevelId} onSelectLevel={onSelectLevel} />
        <Tree progress={progress} />
        <StudyRoom progress={progress} />
        <Clouds heightY={TOWER_CLOUD_HEIGHT} />
        <CameraRig progress={progress} focusedLevelId={selectedLevelId} />
      </Canvas>
    </div>
  );
}
