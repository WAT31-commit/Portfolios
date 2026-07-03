"use client";

import { EYE_Y, STUDY_FIGURE_Z, TOWER_TOP_Y } from "@/lib/towerGeometry";
import {
  EYE_END_FRACTION,
  FLOORS_END_FRACTION,
  INTRO_FRACTION,
  OUTRO_CAMERA_DONE_FRACTION,
} from "@/lib/towerLayout";
import { useFrame, useThree } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import * as THREE from "three";

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0 || 1), 0, 1);
  return t * t * (3 - 2 * t);
}

const orbitPos = new THREE.Vector3();
const orbitTarget = new THREE.Vector3();
const studyPos = new THREE.Vector3(0, 2.0, STUDY_FIGURE_Z + 3);
const studyTarget = new THREE.Vector3(0, 2.6, -1);
const finalPos = new THREE.Vector3();
const finalTarget = new THREE.Vector3();

/** Drives the camera through every act — intro dolly, orbiting build, eye reveal, and the outro pull-back to the study. */
export function CameraRig({ progress }: { progress: MotionValue<number> }) {
  const { camera } = useThree();

  useFrame(() => {
    const p = progress.get();

    // Orbit phase spans intro through the eye opening: angle keeps turning,
    // height/radius track how much of the tower is built so far, staying
    // well back so the whole cylindrical silhouette reads as a tower.
    const orbitP = THREE.MathUtils.clamp(p / EYE_END_FRACTION, 0, 1);
    const angle = 0.4 + orbitP * Math.PI * 2.4;
    const buildP = smoothstep(INTRO_FRACTION, FLOORS_END_FRACTION, p);
    const builtHeight = 0.5 + buildP * (TOWER_TOP_Y - 0.5);
    const eyePhase = smoothstep(FLOORS_END_FRACTION, EYE_END_FRACTION, p);
    // Capped well inside the study room's back wall (see towerGeometry.ts)
    // so no orbit angle can ever place the camera past/inside that geometry.
    const radius = THREE.MathUtils.lerp(7, 13, buildP) + eyePhase * 1;
    const camHeightDuringBuild = builtHeight * 0.45 + 1.4;
    const camHeight = THREE.MathUtils.lerp(camHeightDuringBuild, EYE_Y - 0.6, eyePhase);

    orbitPos.set(Math.cos(angle) * radius, camHeight, Math.sin(angle) * radius);
    orbitTarget.set(0, THREE.MathUtils.lerp(builtHeight * 0.5, EYE_Y, eyePhase), 0);

    const outroP = smoothstep(EYE_END_FRACTION, OUTRO_CAMERA_DONE_FRACTION, p);

    finalPos.lerpVectors(orbitPos, studyPos, outroP);
    finalTarget.lerpVectors(orbitTarget, studyTarget, outroP);

    camera.position.copy(finalPos);
    camera.lookAt(finalTarget);
  });

  return null;
}
