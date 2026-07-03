"use client";

import {
  BASE_HEIGHT,
  EYE_Y,
  FLOOR_HEIGHT,
  FOCUS_RADIUS,
  MARKER_ANGLE,
  STUDY_FIGURE_Z,
  TOWER_TOP_Y,
} from "@/lib/towerGeometry";
import {
  EYE_END_FRACTION,
  FLOORS_END_FRACTION,
  INTRO_FRACTION,
  LEVEL_LAYOUT,
  OUTRO_CAMERA_DONE_FRACTION,
} from "@/lib/towerLayout";
import { LevelId } from "@/lib/types";
import { useFrame, useThree } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0 || 1), 0, 1);
  return t * t * (3 - 2 * t);
}

const orbitPos = new THREE.Vector3();
const orbitTarget = new THREE.Vector3();
const studyPos = new THREE.Vector3();
const studyTarget = new THREE.Vector3(0, 2.6, -1);
const scrollPos = new THREE.Vector3();
const scrollTarget = new THREE.Vector3();
const focusPos = new THREE.Vector3();
const focusTarget = new THREE.Vector3();
const finalPos = new THREE.Vector3();
const finalTarget = new THREE.Vector3();

/** Drives the camera through every act — intro dolly, orbiting build, eye reveal, the outro pull-back to the study, and a zoomed-in focus shot when a year marker is clicked. */
export function CameraRig({
  progress,
  focusedLevelId,
}: {
  progress: MotionValue<number>;
  focusedLevelId: LevelId | null;
}) {
  const { camera, size } = useThree();
  const focusBlend = useRef(0);

  useFrame((state, delta) => {
    const p = progress.get();

    // Narrow (portrait/mobile) viewports see less horizontally at a given
    // distance, so pull the camera back proportionally to keep the same
    // framing instead of cropping in tight.
    const aspect = size.width / size.height;
    const aspectBoost = aspect < 1 ? Math.min(2, 1 / aspect) : 1;

    const orbitP = THREE.MathUtils.clamp(p / EYE_END_FRACTION, 0, 1);
    const angle = 0.4 + orbitP * Math.PI * 2.4;
    const buildP = smoothstep(INTRO_FRACTION, FLOORS_END_FRACTION, p);
    const builtHeight = 0.5 + buildP * (TOWER_TOP_Y - 0.5);
    const eyePhase = smoothstep(FLOORS_END_FRACTION, EYE_END_FRACTION, p);
    const radius = (THREE.MathUtils.lerp(7, 13, buildP) + eyePhase * 1) * aspectBoost;
    const camHeightDuringBuild = builtHeight * 0.45 + 1.4;
    const camHeight = THREE.MathUtils.lerp(camHeightDuringBuild, EYE_Y - 0.6, eyePhase);

    orbitPos.set(Math.cos(angle) * radius, camHeight, Math.sin(angle) * radius);
    orbitTarget.set(0, THREE.MathUtils.lerp(builtHeight * 0.5, EYE_Y, eyePhase), 0);

    studyPos.set(0, 2.0, STUDY_FIGURE_Z + 3 * aspectBoost);

    const outroP = smoothstep(EYE_END_FRACTION, OUTRO_CAMERA_DONE_FRACTION, p);
    scrollPos.lerpVectors(orbitPos, studyPos, outroP);
    scrollTarget.lerpVectors(orbitTarget, studyTarget, outroP);

    const targetBlend = focusedLevelId ? 1 : 0;
    focusBlend.current = THREE.MathUtils.damp(focusBlend.current, targetBlend, 3.5, delta);

    if (focusedLevelId) {
      const layout = LEVEL_LAYOUT.find((l) => l.id === focusedLevelId);
      if (layout) {
        const midFloor = (layout.floorStart + layout.floorEnd) / 2;
        const midY = BASE_HEIGHT + midFloor * FLOOR_HEIGHT;
        const focusRadius = FOCUS_RADIUS * aspectBoost;
        focusPos.set(Math.cos(MARKER_ANGLE) * focusRadius, midY + 0.3, Math.sin(MARKER_ANGLE) * focusRadius);
        focusTarget.set(0, midY, 0);
      }
    }

    finalPos.lerpVectors(scrollPos, focusPos, focusBlend.current);
    finalTarget.lerpVectors(scrollTarget, focusTarget, focusBlend.current);

    camera.position.copy(finalPos);
    camera.lookAt(finalTarget);
  });

  return null;
}
