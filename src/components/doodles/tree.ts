import {
  CylinderGeometry
} from 'three';
import { mergeBufferGeometries } from 'three-stdlib';

// Will be Closely associated with grass hexagon geometry (texture)
export function treePyramids(height, position): CylinderGeometry {
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
