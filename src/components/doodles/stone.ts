import { 
  SphereGeometry, 
  Vector2 
} from "three";

/**
 * Stone doodle logic is coupled with stone/sand/dirt hexagonGeometry (based on texture asset)
 * @param height (z) coordinate of stone center
 * @param position (x,y) cartesian coordinates of stone center
 * @returns a BufferGeometry that can be merged with another BufferGeometry with mergeBufferGeometries
 */
export function stoneSphere(height: number, position: Vector2): SphereGeometry {
  // random small offsets for rock displacement
  const px = Math.random() * 0.4;
  const py = Math.random() * 0.4;

  // create a radius between 0.1 and 0.4
  const geo = new SphereGeometry(Math.random() * 0.3 + 0.1, 7, 7);
  geo.translate(position.x + px, height, position.y + py);

  return geo;
}
