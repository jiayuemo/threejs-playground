import {
  SphereGeometry,
  Vector2
} from 'three';
import { mergeBufferGeometries } from 'three-stdlib';

/**
 * Snowman doodle logic is coupled with snow hexagonGeometry (based on texture asset)
 * @param height (z) coordinate of bottom snowman sphere center
 * @param position (x,y) cartesian coordinates of bottom snowman sphere center
 * @returns a BufferGeometry that can be merged with another BufferGeometry with mergeBufferGeometries
 */
export function snowmanSpheres(height: number, position: Vector2): SphereGeometry {
  const snowmanHeight = Math.random() * 0.5 + 1.25;

  const bottom = new SphereGeometry(0.7, 8, 8);
  bottom.translate(position.x, height + snowmanHeight * 0, position.y);
  const middle = new SphereGeometry(0.5, 8, 8);
  middle.translate(position.x, height + snowmanHeight * 0.6, position.y);
  const top = new SphereGeometry(0.3, 7, 7);
  top.translate(position.x, height + snowmanHeight * 1, position.y);

  return mergeBufferGeometries([bottom, middle, top]) as SphereGeometry;
}
