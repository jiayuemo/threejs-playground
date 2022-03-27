import {
  Mesh,
  CylinderGeometry,
  MeshPhysicalMaterial,
  DoubleSide
} from 'three';

import { MAX_HEIGHT } from '../../consts';

export function generateFloorMesh(texture, envMap) {
  const mapFloor = new Mesh(
    new CylinderGeometry(18.5, 18.5, MAX_HEIGHT * 0.1, 50),
    new MeshPhysicalMaterial({
      envMap: envMap,
      map: texture,
      envMapIntensity: 0.1,
      side: DoubleSide
    })
  );
  mapFloor.receiveShadow = true;
  mapFloor.position.set(0, -MAX_HEIGHT * 0.05, 0);
  return mapFloor;
}