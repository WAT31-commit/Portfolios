"use client";

import { LevelId } from "@/lib/types";
import { Canvas } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { CameraRig } from "./CameraRig";
import { Clouds } from "./Clouds";
import { Eye } from "./Eye";
import { Ground } from "./Ground";
import { StudyRoom } from "./StudyRoom";
import { Tower } from "./Tower";
import { TowerMarkers } from "./TowerMarkers";

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
        <color attach="background" args={["#10121a"]} />
        <fog attach="fog" args={["#14151f", 11, 36]} />
        <ambientLight intensity={0.45} color="#c9d4ff" />
        <directionalLight
          position={[6, 9, 3]}
          intensity={1.6}
          color="#ffdfb0"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-7, 4, -5]} intensity={0.3} color="#6f8fd9" />

        <Ground />
        <Tower progress={progress} />
        <TowerMarkers progress={progress} selectedLevelId={selectedLevelId} onSelectLevel={onSelectLevel} />
        <Eye progress={progress} />
        <StudyRoom progress={progress} />
        <Clouds heightY={TOWER_CLOUD_HEIGHT} />
        <CameraRig progress={progress} focusedLevelId={selectedLevelId} />
      </Canvas>
    </div>
  );
}
