import {
  SphereGeometry,
  Vector3
} from 'three';
import { mergeBufferGeometries } from 'three-stdlib';

/**
 * Snowman doodle logic is coupled with snow hexagonGeometry (based on texture asset)
 * @param position (x,y,z) cartesian coordinates of bottom snowman sphere center
 * @returns a BufferGeometry that can be merged with another BufferGeometry with mergeBufferGeometries
 */
export function snowmanSpheres(position: Vector3): SphereGeometry {
  const snowmanHeight = Math.random() * 0.5 + 1.25;

  const bottom = new SphereGeometry(0.7, 8, 8);
  bottom.translate(position.x, position.z + snowmanHeight * 0, position.y);
  const middle = new SphereGeometry(0.5, 8, 8);
  middle.translate(position.x, position.z + snowmanHeight * 0.6, position.y);
  const top = new SphereGeometry(0.3, 7, 7);
  top.translate(position.x, position.z + snowmanHeight * 1, position.y);

  return mergeBufferGeometries([bottom, middle, top]) as SphereGeometry;
}
