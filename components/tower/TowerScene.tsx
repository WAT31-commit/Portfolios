"use client";

import { Canvas } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { CameraRig } from "./CameraRig";
import { Clouds } from "./Clouds";
import { Eye } from "./Eye";
import { Ground } from "./Ground";
import { StudyRoom } from "./StudyRoom";
import { Tower } from "./Tower";

const TOWER_CLOUD_HEIGHT = 6.5;

export function TowerScene({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas shadows camera={{ fov: 45, near: 0.1, far: 100 }} dpr={[1, 1.6]}>
        <color attach="background" args={["#1c2536"]} />
        <fog attach="fog" args={["#1c2536", 10, 34]} />
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[5, 8, 4]}
          intensity={1.3}
          color="#fff2da"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-6, 3, -4]} intensity={0.25} color="#8fb3ff" />

        <Ground />
        <Tower progress={progress} />
        <Eye progress={progress} />
        <StudyRoom progress={progress} />
        <Clouds heightY={TOWER_CLOUD_HEIGHT} />
        <CameraRig progress={progress} />
      </Canvas>
    </div>
  );
}
