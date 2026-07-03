"use client";

import { LevelId } from "@/lib/types";
import { Canvas } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { CameraRig } from "./CameraRig";
import { Clouds } from "./Clouds";
import { Ground } from "./Ground";
import { StudyRoom } from "./StudyRoom";
import { Tower } from "./Tower";
import { TowerMarkers } from "./TowerMarkers";
import { Tree } from "./Tree";

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
        <color attach="background" args={["#161a26"]} />
        <fog attach="fog" args={["#1b2030", 12, 40]} />
        <ambientLight intensity={0.75} color="#eef2ff" />
        <hemisphereLight args={["#eaf0ff", "#3a3324", 0.7]} />
        <directionalLight
          position={[6, 9, 3]}
          intensity={1.7}
          color="#fff2df"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-7, 4, -5]} intensity={0.45} color="#9fb4e6" />

        <Ground />
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
