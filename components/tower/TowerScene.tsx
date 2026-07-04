"use client";

import { LevelId } from "@/lib/types";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { MotionValue } from "framer-motion";
import { CameraRig } from "./CameraRig";
import { Clouds } from "./Clouds";
import { Garden } from "./Garden";
import { Ground } from "./Ground";
import { Moon } from "./Moon";
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
        {/* Anime night: deep purple sky, cool moonlight, glowing accents */}
        <color attach="background" args={["#1c1233"]} />
        <fog attach="fog" args={["#251a3d", 13, 44]} />
        <ambientLight intensity={0.55} color="#a996e8" />
        <hemisphereLight args={["#4b3f8a", "#241a3a", 0.6]} />
        <directionalLight
          position={[-9, 13, -10]}
          intensity={0.9}
          color="#cfc2ff"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[6, 5, 6]} intensity={0.4} color="#ff8ad1" />

        <Moon />
        <Ground />
        <Garden />
        <Tower progress={progress} />
        <TowerMarkers progress={progress} selectedLevelId={selectedLevelId} onSelectLevel={onSelectLevel} />
        <Tree progress={progress} />
        <StudyRoom progress={progress} />
        <Clouds heightY={TOWER_CLOUD_HEIGHT} />
        <CameraRig progress={progress} focusedLevelId={selectedLevelId} />

        <EffectComposer>
          <Bloom luminanceThreshold={0.35} luminanceSmoothing={0.3} intensity={0.7} mipmapBlur radius={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
