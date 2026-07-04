import * as THREE from "three";

let cached: THREE.DataTexture | null = null;

/** A small 1D step texture for meshToonMaterial's gradientMap, producing the
 * flat, banded cel-shaded look. Cached so every toon-shaded mesh shares one
 * texture instead of allocating its own. */
export function getToonGradient(): THREE.DataTexture {
  if (cached) return cached;
  const steps = 4;
  const data = new Uint8Array(steps);
  for (let i = 0; i < steps; i++) {
    data[i] = Math.round((i / (steps - 1)) * 255);
  }
  const tex = new THREE.DataTexture(data, steps, 1, THREE.RedFormat);
  tex.needsUpdate = true;
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  cached = tex;
  return tex;
}
