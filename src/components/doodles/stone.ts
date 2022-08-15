import { 
  SphereGeometry, 
  Vector3
} from "three";

/**
 * Stone doodle logic is coupled with stone/sand/dirt hexagonGeometry (based on texture asset)
 * @param position (x,y,z) cartesian coordinates of stone center
 * @returns a BufferGeometry that can be merged with another BufferGeometry with mergeBufferGeometries
 */
export function stoneSphere(position: Vector3): SphereGeometry {
  // random small offsets for rock displacement
  const px = Math.random() * 0.4;
  const py = Math.random() * 0.4;

  // create a radius between 0.1 and 0.4
  const geo = new SphereGeometry(Math.random() * 0.3 + 0.1, 7, 7);
  geo.translate(position.x + px, position.z, position.y + py);

  return geo;
}
