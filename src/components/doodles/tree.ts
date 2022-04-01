import {
  CylinderGeometry,
  Vector2
} from 'three';
import { mergeBufferGeometries } from 'three-stdlib';

/**
 * Tree doodle logic is coupled with grass hexagonGeometry (based on texture asset)
 * @param height (z) coordinate of bottom tree Pyramid center
 * @param position (x,y) cartesian coordinates of bottom tree Pyramid center
 * @returns a BufferGeometry that can be merged with another BufferGeometry with mergeBufferGeometries
 */
export function treePyramids(height: number, position: Vector2): CylinderGeometry {
  const treeHeight = Math.random() * 1 + 1.25;

  // args (top radius, bottom radius, height, sides bounding the circles)
  const geo1 = new CylinderGeometry(0, 1.5, treeHeight, 3);
  geo1.translate(position.x, height + treeHeight * 0 + 0.75, position.y);
  
  const geo2 = new CylinderGeometry(0, 1.15, treeHeight, 3);
  geo2.translate(position.x, height + treeHeight * 0.6 + 1, position.y);

  const geo3 = new CylinderGeometry(0, 0.8, treeHeight, 3);
  geo3.translate(position.x, height + treeHeight * 1.25 + 1, position.y);

  return mergeBufferGeometries([geo1, geo2, geo3]) as CylinderGeometry;
}
